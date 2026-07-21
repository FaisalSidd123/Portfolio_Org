"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_FRAG = `#version 300 es
precision highp float;
/*********
* made by Matthias Hurrle (@atzedent)
*/
out vec4 O;
uniform float time;
uniform vec2 resolution;

#define FC gl_FragCoord.xy
#define R  resolution
#define T  time
#define hue(a) (.6+.6*cos(6.3*(a)+vec3(0,83,21)))

float rnd(float a) {
  vec2 p = fract(a * vec2(12.9898, 78.233));
  p += dot(p, p*345.);
  return fract(p.x * p.y);
}
vec3 pattern(vec2 uv) {
  vec3 col = vec3(0.);
  for (float i=.0; i++<20.;) {
    float a = rnd(i);
    vec2 n = vec2(a, fract(a*34.56));
    vec2 p = sin(n*(T+7.) + T*.5);
    float d = dot(uv-p, uv-p);
    col += .00125/d * hue(dot(uv,uv) + i*.125 + T);
  }
  return col;
}
void main(void) {
  vec2 uv = (FC - .5 * R) / min(R.x, R.y);
  vec3 col = vec3(0.);
  float s = 2.4;
  float a = atan(uv.x, uv.y);
  float b = length(uv);
  uv = vec2(a * 5. / 6.28318, .05 / tan(b) + T);
  uv = fract(uv) - .5;
  col += pattern(uv * s);
  O = vec4(col, 1.);
}`;

/** Minimal passthrough vertex shader */
const DEFAULT_VERT = `#version 300 es
precision highp float;
in vec2 position;
void main(){
  gl_Position = vec4(position, 0.0, 1.0);
}`;

function LightSpeed({
  className = "",
  style = {},
  paused = false,
  speed = 1,
  fragmentSource = DEFAULT_FRAG,
  onShaderError,
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const buffersRef = useRef({ vbo: null });
  const uniformsRef = useRef({});
  const rafRef = useRef(0);

  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");

    if (!gl) {
      setTimeout(() => setWebglOk(false), 0);
      return;
    }
    glRef.current = gl;

    // --- helpers
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(sh) || "Shader compile error";
        gl.deleteShader(sh);
        throw new Error(info);
      }
      return sh;
    };

    const link = (vs, fs) => {
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(prog) || "Program link error";
        gl.deleteProgram(prog);
        throw new Error(info);
      }
      return prog;
    };

    // try compile
    let vs = null;
    let prog;

    try {
      vs = compile(gl.VERTEX_SHADER, DEFAULT_VERT);
      const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
      prog = link(vs, fs);
    } catch (err) {
      onShaderError?.(String(err?.message || err));
      // fallback to default fragment if custom failed
      if (fragmentSource !== DEFAULT_FRAG) {
        try {
          const defaultFs = compile(gl.FRAGMENT_SHADER, DEFAULT_FRAG);
          prog = link(vs, defaultFs);
        } catch (err2) {
          onShaderError?.(String(err2?.message || err2));
          setTimeout(() => setWebglOk(false), 0);
          return;
        }
      } else {
        setTimeout(() => setWebglOk(false), 0);
        return;
      }
    }

    programRef.current = prog;
    gl.useProgram(prog);

    // full-screen quad
    const vbo = gl.createBuffer();
    buffersRef.current.vbo = vbo;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const locPos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    uniformsRef.current.time = gl.getUniformLocation(prog, "time");
    uniformsRef.current.resolution = gl.getUniformLocation(prog, "resolution");

    // DPR-aware size
    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const cssW = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uniformsRef.current.resolution) {
        gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);
    resize();

    // render loop
    const start = performance.now();
    const loop = (t) => {
      rafRef.current = requestAnimationFrame(loop);
      if (paused) return;

      const now = (t - start) * 0.001 * (speed || 1);
      gl.useProgram(programRef.current);
      if (uniformsRef.current.time) {
        gl.uniform1f(uniformsRef.current.time, now);
      }
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafRef.current = requestAnimationFrame(loop);

    const currentBuffers = buffersRef.current;

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);

      if (gl && programRef.current) {
        const p = programRef.current;
        const attachedShaders = gl.getAttachedShaders(p) || [];
        attachedShaders.forEach((s) => gl.deleteShader(s));
        gl.deleteProgram(p);
      }
      if (gl && currentBuffers.vbo) {
        gl.deleteBuffer(currentBuffers.vbo);
      }
    };
  }, [fragmentSource, paused, speed, onShaderError]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
        ...style,
      }}
    >
      {!webglOk && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "#e5e5e5",
          }}
        >
          <div style={{ maxWidth: "28rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>WebGL not supported</h2>
            <p style={{ fontSize: "0.875rem", opacity: 0.8 }}>
              Your browser or device doesn’t support WebGL 2.0 or the shader failed to compile.
            </p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

export { LightSpeed };
