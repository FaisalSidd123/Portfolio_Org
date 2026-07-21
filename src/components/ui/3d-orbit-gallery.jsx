"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const DEFAULT_TEXTURES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60",
]

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function ParticleSphere() {
  const PARTICLE_COUNT = 1500
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.010
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0005
  const PARTICLE_OPACITY = 1

  const IMAGE_COUNT = 24
  const IMAGE_SIZE = 1.5

  const groupRef = useRef(null)

  const textures = useTexture(DEFAULT_TEXTURES)

  useMemo(() => {
    textures.forEach((texture) => {
      if (texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.flipY = false
      }
    })
  }, [textures])

  const particles = useMemo(() => {
    const particlesList = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi

      const rVal = pseudoRandom(i * 1.1 + 1)
      const sVal = pseudoRandom(i * 2.2 + 2)
      const cVal1 = pseudoRandom(i * 3.3 + 3)
      const cVal2 = pseudoRandom(i * 4.4 + 4)
      const rotVal = pseudoRandom(i * 5.5 + 5)

      const radiusVariation = SPHERE_RADIUS + (rVal - 0.5) * POSITION_RANDOMNESS

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      particlesList.push({
        position: [x, y, z],
        scale: sVal * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(
          cVal1 * 0.1 + 0.05,
          0.8,
          0.6 + cVal2 * 0.3,
        ),
        rotationSpeed: (rotVal - 0.5) * 0.01,
      })
    }

    return particlesList
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingImages = useMemo(() => {
    const images = []

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      euler.z += Math.PI

      const colVal = pseudoRandom(i * 9.9 + 9)

      images.push({
        position: [x, y, z],
        rotation: [euler.x, euler.y, euler.z],
        textureIndex: i % textures.length,
        color: new THREE.Color().setHSL(colVal, 0.7, 0.6),
      })
    }

    return images
  }, [IMAGE_COUNT, SPHERE_RADIUS, textures.length])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingImages.map((image, index) => (
        <mesh key={`image-${index}`} position={image.position} rotation={image.rotation}>
          <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
          <meshBasicMaterial map={textures[image.textureIndex]} opacity={1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
