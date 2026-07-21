import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/3d-orbit-gallery";

export default function OrbitGallerySection() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "650px",
        background: "#000000",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--border-color)",
        marginTop: "2rem",
        marginBottom: "2rem"
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--accent-cyan)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem"
            }}
          >
            &gt; INITIALIZING 3D ORBIT SYSTEM...
          </div>
        }
      >
        <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleSphere />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </Suspense>

      {/* Interactive overlay instructions */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid var(--border-color)",
          padding: "0.6rem 1.2rem",
          borderRadius: "30px",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          pointerEvents: "none",
          textAlign: "center",
          letterSpacing: "0.08em"
        }}
      >
        <span style={{ color: "var(--accent-cyan)" }}>[3D ORBIT CONTROLS]</span> DRAG TO ROTATE // SCROLL TO ZOOM
      </div>
    </div>
  );
}
