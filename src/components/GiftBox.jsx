import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import CDDisc from './CDDisc'

function GiftBox({ position, onCameraMove, onLidOpen, onCDClick, isLidOpen }) {
  const lidRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [lidRotation, setLidRotation] = useState(0)
  const [cameraMovedToBox, setCameraMovedToBox] = useState(false)

  useFrame(() => {
    // Animate lid opening
    if (isLidOpen && lidRotation < Math.PI / 2) {
      setLidRotation(prev => Math.min(prev + 0.05, Math.PI / 2))
    }

    if (lidRef.current) {
      lidRef.current.rotation.x = -lidRotation
    }
  })

  const [cdAnimation, setCdAnimation] = useState(0)

  // Smooth animation for CDs appearing
  useFrame(() => {
    if (isLidOpen && cdAnimation < 1) {
      setCdAnimation(prev => Math.min(prev + 0.03, 1))
    }
  })

  const cdCases = [
    { id: 1, position: [-0.2, 0.5, 0], image: '/cd-case-1.jpg' },
    { id: 2, position: [-0.1, 0.5, 0], image: '/cd-case-2.jpg' },
    { id: 3, position: [0, 0.5, 0], image: '/cd-case-3.jpg' },
    { id: 4, position: [0.1, 0.5, 0], image: '/cd-case-4.jpg' },
    { id: 5, position: [0.2, 0.5, 0], image: '/cd-case-5.jpg' }
  ]

  return (
    <group position={position} ref={groupRef}>
      {/* Gift Box Base - Red with gold ribbon */}
      <mesh
        position={[0, 0.2, 0]}
        onClick={(e) => {
          e.stopPropagation()
          if (!cameraMovedToBox) {
            // First click: Move camera
            onCameraMove()
            setCameraMovedToBox(true)
          } else if (!isLidOpen) {
            // Second click: Open lid
            onLidOpen()
          }
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
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial
          color={hovered ? '#e74c3c' : '#c0392b'}
          roughness={0.4}
          metalness={0.1}
          emissive={hovered ? '#e74c3c' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Gold Ribbon - Vertical */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.08, 0.42, 0.52]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Gold Ribbon - Horizontal */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.52, 0.08, 0.42]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Gift Box Lid */}
      <group
        ref={lidRef}
        position={[0, 0.4, -0.25]}
      >
        <mesh position={[0, 0.025, 0.25]} castShadow>
          <boxGeometry args={[0.52, 0.05, 0.52]} />
          <meshStandardMaterial color="#c0392b" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Lid Ribbon - Vertical */}
        <mesh position={[0, 0.025, 0.25]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.54]} />
          <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Lid Ribbon - Horizontal */}
        <mesh position={[0, 0.025, 0.25]} castShadow>
          <boxGeometry args={[0.54, 0.06, 0.08]} />
          <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Gold Bow on Top */}
        <group position={[0, 0.08, 0.25]}>
          {/* Center knot */}
          <mesh castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Bow loops */}
          <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <torusGeometry args={[0.04, 0.015, 8, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <torusGeometry args={[0.04, 0.015, 8, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      </group>

      {/* CD Discs inside the box - only visible when lid is open */}
      {isLidOpen && cdCases.map((cdCase) => (
        <group key={cdCase.id} position={cdCase.position}>
          <CDDisc
            rotation={[0, 0, 0]}
            imagePath={cdCase.image}
            scale={cdAnimation}
            opacity={cdAnimation}
            onClick={(e) => {
              e.stopPropagation()
              onCDClick(cdCases)
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'auto'
            }}
          />
        </group>
      ))}

      {/* Hover glow effect */}
      {hovered && !isLidOpen && (
        <pointLight position={[0, 0.5, 0]} intensity={0.5} distance={2} color="#ffd700" />
      )}

      {/* Light for CD cases when lid is open */}
      {isLidOpen && (
        <pointLight position={[0, 0.5, 0]} intensity={1.5} distance={3} color="#ffeb3b" />
      )}
    </group>
  )
}

export default GiftBox
