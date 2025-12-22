import { useRef, useState } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Letter({ position, onClick, isClicked, number }) {
  const letterRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Gentle swaying animation
  useFrame((state) => {
    if (letterRef.current) {
      const time = state.clock.getElapsedTime()
      letterRef.current.rotation.z = Math.sin(time + position[0]) * 0.1
      letterRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.05
    }
  })

  // Colors based on clicked state
  const envelopeColor = isClicked ? "#999999" : (hovered ? "#ffffff" : "#f5e6d3")
  const flapColor = isClicked ? "#888888" : (hovered ? "#ffebe6" : "#e6d4c1")
  const labelColor = isClicked ? "#666666" : "#c41e3a"

  return (
    <group
      ref={letterRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
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
    >
      {/* Subtle number above the letter */}
      {number && (
        <Text
          position={[0.13, 0.11, 0.012]}
          fontSize={0.055}
          color="#c41e3a"
          anchorX="right"
          anchorY="top"
          outlineWidth={0.007}
          outlineColor="#fffef9"
          fontWeight="bold"
          fillOpacity={0.7}
        >
          {number}
        </Text>
      )}
      {/* String/Thread attaching to tree */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Envelope body */}
      <mesh castShadow receiveShadow scale={hovered ? 1.2 : 1}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial
          color={envelopeColor}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Envelope flap (top triangle) */}
      <mesh position={[0, 0.1, 0.01]} rotation={[0, 0, 0]} castShadow scale={hovered ? 1.2 : 1}>
        <coneGeometry args={[0.15, 0.1, 3]} />
        <meshStandardMaterial
          color={flapColor}
          roughness={0.6}
        />
      </mesh>

      {/* Letter number label */}
      <mesh position={[0, 0, 0.015]} scale={hovered ? 1.2 : 1}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshStandardMaterial
          color={labelColor}
          emissive={hovered && !isClicked ? "#ff0000" : "#000000"}
          emissiveIntensity={hovered && !isClicked ? 0.3 : 0}
        />
      </mesh>

      {/* Add a subtle glow when hovered (not when clicked) */}
      {hovered && !isClicked && (
        <pointLight
          position={[0, 0, 0.1]}
          intensity={0.5}
          distance={1}
          color="#ffd700"
        />
      )}
    </group>
  )
}

export default Letter
