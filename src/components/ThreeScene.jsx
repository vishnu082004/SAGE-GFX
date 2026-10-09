import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Check if model exists
function checkModelExists(url) {
  return fetch(url, { method: 'HEAD' })
    .then((res) => res.ok)
    .catch(() => false)
}

// Fallback procedural architectural sculpture when main-model.glb is not yet placed
function ArchitecturalSculpture() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      {/* Base platform */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.1, 4.2]} />
        <meshStandardMaterial color="#1a1919" roughness={0.4} />
      </mesh>

      {/* Main architectural volumes */}
      <mesh position={[-0.8, 0.4, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.8, 1.8]} />
        <meshStandardMaterial color="#e8e5e0" roughness={0.2} metalness={0.1} />
      </mesh>

      <mesh position={[0.9, 0.8, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.2, 1.6]} />
        <meshStandardMaterial color="#D09E6B" roughness={0.3} metalness={0.4} />
      </mesh>

      <mesh position={[0.2, 1.6, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.6, 1.4]} />
        <meshStandardMaterial color="#2d2b2a" roughness={0.2} />
      </mesh>

      {/* Glass facade plane */}
      <mesh position={[-0.79, 0.4, 0.52]}>
        <boxGeometry args={[1.58, 1.76, 0.04]} />
        <meshPhysicalMaterial
          color="#a0c4ff"
          transparent
          opacity={0.45}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Slender architectural columns */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 1.8]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.3, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Cantilever roof slab */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[4.4, 0.08, 4.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
    </group>
  )
}

function Loader() {
  return (
    <div className="three-loading">
      <div className="three-spinner" />
      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem' }}>
        Loading 3D Architecture Scene...
      </p>
    </div>
  )
}

function ThreeScene({ modelPath = '/models/main-model.glb' }) {
  const [modelAvailable, setModelAvailable] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    checkModelExists(modelPath).then((exists) => {
      setModelAvailable(exists)
      setChecked(true)
    })
  }, [modelPath])

  return (
    <div className="three-scene-container" aria-label="3D Architectural Visualization">
      {!checked ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Canvas
            shadows
            camera={{ position: [5, 3.5, 6], fov: 42 }}
            className="three-canvas"
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          >
            {/* Ambient & Directional Lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[8, 12, 6]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.5}
              shadow-camera-far={30}
              shadow-camera-left={-6}
              shadow-camera-right={6}
              shadow-camera-top={6}
              shadow-camera-bottom={-6}
            />
            <pointLight position={[-6, 4, -4]} intensity={0.5} color="#D09E6B" />

            <Center>
              <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
                <ArchitecturalSculpture />
              </Float>
            </Center>

            <ContactShadows
              position={[0, -0.65, 0]}
              opacity={0.65}
              scale={10}
              blur={1.8}
              far={4}
            />

            <OrbitControls
              enableZoom={true}
              maxPolarAngle={Math.PI / 2.05}
              minDistance={3.5}
              maxDistance={12}
              autoRotate={false}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </Suspense>
      )}

      <div className="three-controls-hint">
        <span>Click & Drag to Rotate • Scroll to Zoom</span>
      </div>
    </div>
  )
}

export default ThreeScene
