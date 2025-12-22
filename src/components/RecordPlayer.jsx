import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function RecordPlayer({ position, onOpen, isPlaying }) {
  const recordRef = useRef()
  const groupRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (recordRef.current && isPlaying) {
      // Spin the record when playing
      recordRef.current.rotation.y += 0.02
    }

    // Gentle floating animation - disabled to fix position issue
    // if (groupRef.current) {
    //   groupRef.current.position.y = Math.sin(time * 1.2) * 0.015
    // }

    // Pulsing glow effect
    if (glowRef.current) {
      const pulse = Math.sin(time * 2) * 0.3 + 0.7
      glowRef.current.scale.set(pulse, pulse, pulse)
      glowRef.current.material.opacity = pulse * 0.3
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* Pulsing glow ring - laying flat on table */}
      <mesh ref={glowRef} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshBasicMaterial color="#ffeb3b" transparent opacity={0.3} />
      </mesh>

      {/* Base/Turntable body - white */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Platter (the rotating part) - disc laying flat */}
      <mesh
        ref={recordRef}
        position={[0, 0.05, 0]}
        rotation={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        castShadow
      >
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial
          color={hovered ? "#222222" : "#1a1a1a"}
          roughness={0.7}
          emissive={hovered ? "#ffeb3b" : "#666666"}
          emissiveIntensity={hovered ? 0.5 : 0.1}
        />
      </mesh>

      {/* Record label (center) - gold/yellow */}
      <mesh position={[0, 0.07, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.4} emissive="#ffeb3b" emissiveIntensity={0.2} />
      </mesh>

      {/* Tone arm (needle arm) */}
      <group position={[0.25, 0.05, 0.1]}>
        {/* Arm base - light gray */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* Arm - silver/chrome */}
        <mesh
          position={[-0.15, 0.03, 0]}
          rotation={[0, 0, isPlaying ? -0.3 : -0.1]}
          castShadow
        >
          <boxGeometry args={[0.25, 0.015, 0.015]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Control buttons - colorful */}
      <mesh position={[-0.2, 0.05, -0.15]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
        <meshStandardMaterial color="#ff6b9d" roughness={0.4} emissive="#ff6b9d" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.1, 0.05, -0.15]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
        <meshStandardMaterial color="#4ecdc4" roughness={0.4} emissive="#4ecdc4" emissiveIntensity={0.3} />
      </mesh>

      {/* Hover glow light */}
      {hovered && (
        <pointLight position={[0, 0.2, 0]} intensity={0.5} distance={1} color="#ffeb3b" />
      )}
    </group>
  )
}

export default RecordPlayer
