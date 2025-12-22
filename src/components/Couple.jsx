import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

// Person component with customizable features
function Person({
  height = 1.6,
  position = [0, 0, 0],
  rotation = 0,
  hairStyle = 'bob', // 'bob', 'ponytail', or 'long'
  shirtColor = '#87CEEB',
  pantsColor = '#4a5568',
  name = '',
  leftArmPose = 'normal' // 'normal' or 'embrace'
}) {
  const personRef = useRef()
  const scale = height / 1.6

  const skinColor = "#f5d0a9"
  const hairColor = "#1a1a1a"

  return (
    <group ref={personRef} position={position} rotation={[0, rotation, 0]}>
      {/* Head */}
      <mesh position={[0, height - 0.15, 0]} castShadow>
        <sphereGeometry args={[0.13 * scale, 20, 20]} />
        <meshStandardMaterial color={skinColor} roughness={0.4} />
      </mesh>

      {/* Hair - positioned to not cover face */}
      {hairStyle === 'ponytail' ? (
        // Ponytail hairstyle - sleek and long
        <group position={[0, height - 0.15, 0]}>
          {/* Main hair volume on top of head */}
          <mesh position={[0, 0.1, -0.04]} castShadow>
            <sphereGeometry args={[0.135 * scale, 24, 24]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Hair sides - higher up */}
          <mesh position={[-0.09, 0.05, -0.02]} scale={[0.9, 1.1, 1]} castShadow>
            <sphereGeometry args={[0.07 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0.09, 0.05, -0.02]} scale={[0.9, 1.1, 1]} castShadow>
            <sphereGeometry args={[0.07 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Back of hair leading to ponytail */}
          <mesh position={[0, 0.04, -0.12]} castShadow>
            <sphereGeometry args={[0.09 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Ponytail tie/base */}
          <mesh position={[0, 0.02, -0.145]} castShadow>
            <sphereGeometry args={[0.055 * scale, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Ponytail - smooth and flowing */}
          <mesh position={[0, -0.04, -0.16]} rotation={[0.25, 0, 0]} castShadow>
            <cylinderGeometry args={[0.048 * scale, 0.036 * scale, 0.35 * scale, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.5} metalness={0.15} />
          </mesh>

          {/* Ponytail end - tapered */}
          <mesh position={[0, -0.24, -0.2]} castShadow>
            <sphereGeometry args={[0.04 * scale, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.5} metalness={0.1} />
          </mesh>

          {/* Light bangs - don't cover eyes */}
          <mesh position={[0, 0.1, 0.105]} rotation={[0.2, 0, 0]} castShadow>
            <sphereGeometry args={[0.1 * scale, 20, 20, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
        </group>
      ) : hairStyle === 'long' ? (
        // Long wavy hairstyle - flowing and voluminous
        <group position={[0, height - 0.15, 0]}>
          {/* Main hair volume on top */}
          <mesh position={[0, 0.1, -0.02]} castShadow>
1            <sphereGeometry args={[0.14 * scale, 24, 24]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Crown volume */}
          <mesh position={[0, 0.12, 0]} scale={[0.95, 1.1, 0.9]} castShadow>
            <sphereGeometry args={[0.13 * scale, 24, 24]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Upper side volume - left */}
          <mesh position={[-0.11, 0.05, 0]} scale={[1.1, 1.2, 1]} castShadow>
            <sphereGeometry args={[0.09 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
          {/* Upper side volume - right */}
          <mesh position={[0.11, 0.05, 0]} scale={[1.1, 1.2, 1]} castShadow>
            <sphereGeometry args={[0.09 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Long flowing left side */}
          <mesh position={[-0.13, -0.08, -0.02]} scale={[0.85, 1.5, 0.8]} castShadow>
            <sphereGeometry args={[0.11 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
          {/* Long flowing right side */}
          <mesh position={[0.13, -0.08, -0.02]} scale={[0.85, 1.5, 0.8]} castShadow>
            <sphereGeometry args={[0.11 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Back hair volume - upper */}
          <mesh position={[0, 0.06, -0.11]} scale={[1.15, 1.1, 1]} castShadow>
            <sphereGeometry args={[0.12 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Back hair volume - middle */}
          <mesh position={[0, -0.02, -0.12]} scale={[1.1, 1.3, 1]} castShadow>
            <sphereGeometry args={[0.11 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Back hair volume - lower */}
          <mesh position={[0, -0.12, -0.11]} scale={[1, 1.4, 0.9]} castShadow>
            <sphereGeometry args={[0.1 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Light side-swept bangs */}
          <mesh position={[0.03, 0.11, 0.105]} rotation={[0.2, 0.15, 0]} castShadow>
            <sphereGeometry args={[0.08 * scale, 20, 20, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
        </group>
      ) : (
        // Bob cut hairstyle - rounded and full
        <group position={[0, height - 0.15, 0]}>
          {/* Main bob volume - top of head */}
          <mesh position={[0, 0.1, -0.03]} castShadow>
            <sphereGeometry args={[0.135 * scale, 24, 24]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Bob rounded sides - higher position */}
          <mesh position={[0, 0.04, -0.01]} scale={[1.15, 0.9, 1]} castShadow>
            <sphereGeometry args={[0.125 * scale, 24, 24]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Bob lower volume */}
          <mesh position={[0, -0.01, -0.02]} scale={[1.1, 0.7, 0.95]} castShadow>
            <sphereGeometry args={[0.12 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Bob back */}
          <mesh position={[0, 0.04, -0.09]} scale={[1, 1, 1.1]} castShadow>
            <sphereGeometry args={[0.12 * scale, 20, 20]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Light bob bangs - don't cover eyes */}
          <mesh position={[0, 0.11, 0.105]} rotation={[0.25, 0, 0]} castShadow>
            <sphereGeometry args={[0.095 * scale, 20, 20, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Bob side layers - higher up */}
          <mesh position={[-0.1, 0.03, 0]} scale={[0.7, 1, 0.9]} castShadow>
            <sphereGeometry args={[0.07 * scale, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh position={[0.1, 0.03, 0]} scale={[0.7, 1, 0.9]} castShadow>
            <sphereGeometry args={[0.07 * scale, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} metalness={0.1} />
          </mesh>
        </group>
      )}

      {/* Name label above head */}
      {name && (
        <Text
          position={[0, height + 0.25, 0]}
          fontSize={0.18}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
          fontWeight="bold"
        >
          {name}
        </Text>
      )}

      {/* Glasses */}
      <group position={[0, height - 0.15, 0.12]}>
        <mesh position={[-0.05, 0.02, 0]}>
          <torusGeometry args={[0.04 * scale, 0.005 * scale, 8, 20]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0.05, 0.02, 0]}>
          <torusGeometry args={[0.04 * scale, 0.005 * scale, 8, 20]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.004 * scale, 0.004 * scale, 0.04 * scale, 8]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[-0.05, 0.02, 0.003]}>
          <circleGeometry args={[0.037 * scale, 20]} />
          <meshStandardMaterial color="#e6f4ff" transparent opacity={0.25} roughness={0.1} />
        </mesh>
        <mesh position={[0.05, 0.02, 0.003]}>
          <circleGeometry args={[0.037 * scale, 20]} />
          <meshStandardMaterial color="#e6f4ff" transparent opacity={0.25} roughness={0.1} />
        </mesh>
      </group>

      {/* Happy smiling mouth - curved upward */}
      <mesh position={[0, height - 0.19, 0.128]} rotation={[0, 0, 0]} scale={[1, -1, 1]}>
        <torusGeometry args={[0.035 * scale, 0.01 * scale, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b8a" roughness={0.4} />
      </mesh>

      {/* Friendly eyes - slightly squinted from smiling */}
      <group>
        {/* Left eye */}
        <mesh position={[-0.04, height - 0.145, 0.115]}>
          <sphereGeometry args={[0.012 * scale, 10, 10]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
        {/* Left eye highlight */}
        <mesh position={[-0.035, height - 0.14, 0.12]}>
          <sphereGeometry args={[0.004 * scale, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
        </mesh>

        {/* Right eye */}
        <mesh position={[0.04, height - 0.145, 0.115]}>
          <sphereGeometry args={[0.012 * scale, 10, 10]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
        {/* Right eye highlight */}
        <mesh position={[0.045, height - 0.14, 0.12]}>
          <sphereGeometry args={[0.004 * scale, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Rosy cheeks for happy expression */}
      <mesh position={[-0.07, height - 0.17, 0.11]}>
        <sphereGeometry args={[0.025 * scale, 12, 12]} />
        <meshStandardMaterial color="#ffb3ba" transparent opacity={0.6} roughness={0.8} />
      </mesh>
      <mesh position={[0.07, height - 0.17, 0.11]}>
        <sphereGeometry args={[0.025 * scale, 12, 12]} />
        <meshStandardMaterial color="#ffb3ba" transparent opacity={0.6} roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, height - 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.04 * scale, 0.045 * scale, 0.08 * scale, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.4} />
      </mesh>

      {/* Torso/Shirt */}
      <mesh position={[0, height - 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16 * scale, 0.14 * scale, 0.65 * scale, 20]} />
        <meshStandardMaterial color={shirtColor} roughness={0.6} />
      </mesh>

      {/* Left Arm */}
      <group>
        {leftArmPose === 'embrace' ? (
          // Embracing pose - arm wraps around partner
          <>
            {/* Upper arm - reaching across */}
            <mesh position={[0.1, height - 0.5, 0.1]} rotation={[0, -Math.PI / 6, -Math.PI / 4]} castShadow>
              <cylinderGeometry args={[0.04 * scale, 0.035 * scale, 0.3 * scale, 12]} />
              <meshStandardMaterial color={shirtColor} roughness={0.6} />
            </mesh>
            {/* Lower arm - wrapping around */}
            <mesh position={[0.32, height - 0.65, 0.18]} rotation={[Math.PI / 4, -Math.PI / 6, -Math.PI / 3]} castShadow>
              <cylinderGeometry args={[0.035 * scale, 0.03 * scale, 0.26 * scale, 12]} />
              <meshStandardMaterial color={skinColor} roughness={0.4} />
            </mesh>
            {/* Hand */}
            <mesh position={[0.48, height - 0.72, 0.25]} castShadow>
              <sphereGeometry args={[0.045 * scale, 12, 12]} />
              <meshStandardMaterial color={skinColor} roughness={0.4} />
            </mesh>
          </>
        ) : (
          // Normal pose - arms hanging straight down naturally
          <>
            {/* Upper arm - straight down */}
            <mesh position={[-0.18, height - 0.5, 0]} rotation={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.04 * scale, 0.035 * scale, 0.3 * scale, 12]} />
              <meshStandardMaterial color={shirtColor} roughness={0.6} />
            </mesh>
            {/* Lower arm - straight down */}
            <mesh position={[-0.18, height - 0.78, 0]} rotation={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.035 * scale, 0.03 * scale, 0.26 * scale, 12]} />
              <meshStandardMaterial color={skinColor} roughness={0.4} />
            </mesh>
            {/* Hand */}
            <mesh position={[-0.18, height - 0.96, 0]} castShadow>
              <sphereGeometry args={[0.045 * scale, 12, 12]} />
              <meshStandardMaterial color={skinColor} roughness={0.4} />
            </mesh>
          </>
        )}
      </group>

      {/* Right Arm - straight down naturally */}
      <group>
        {/* Upper arm - straight down */}
        <mesh position={[0.18, height - 0.5, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04 * scale, 0.035 * scale, 0.3 * scale, 12]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>
        {/* Lower arm - straight down */}
        <mesh position={[0.18, height - 0.78, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035 * scale, 0.03 * scale, 0.26 * scale, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.18, height - 0.96, 0]} castShadow>
          <sphereGeometry args={[0.045 * scale, 12, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Hips/Belt area */}
      <mesh position={[0, height - 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.14 * scale, 0.14 * scale, 0.12 * scale, 20]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>

      {/* Pants */}
      <mesh position={[0, height - 1.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14 * scale, 0.1 * scale, 0.5 * scale, 20]} />
        <meshStandardMaterial color={pantsColor} roughness={0.7} />
      </mesh>

      {/* Left Leg */}
      <group position={[-0.06, height - 1.53, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.055 * scale, 0.048 * scale, 0.35 * scale, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.35, 0.02]} castShadow>
          <boxGeometry args={[0.1 * scale, 0.07 * scale, 0.14 * scale]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.06, height - 1.53, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.055 * scale, 0.048 * scale, 0.35 * scale, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.35, 0.02]} castShadow>
          <boxGeometry args={[0.1 * scale, 0.07 * scale, 0.14 * scale]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

function Couple() {
  const coupleRef = useRef()

  useFrame((state) => {
    if (coupleRef.current) {
      const time = state.clock.getElapsedTime()
      coupleRef.current.position.y = -0.5 + Math.sin(time * 0.5) * 0.015
    }
  })

  return (
    <group ref={coupleRef} position={[2.8, 0, 0.5]} rotation={[0, -Math.PI / 3, 0]}>
      {/* Shorter person with ponytail - yellow shirt, gray pants - Kim */}
      <Person
        height={1.50}
        position={[-0.2, 0, 0]}
        rotation={-Math.PI / 12}
        hairStyle="ponytail"
        shirtColor="#F4D03F"
        pantsColor="#95A5A6"
        name="Kim"
      />

      {/* Taller person with long hair - light blue shirt, darker pants - Hang */}
      <Person
        height={1.60}
        position={[0.25, 0, 0.08]}
        rotation={Math.PI / 10}
        hairStyle="long"
        shirtColor="#85C1E9"
        pantsColor="#5D6D7E"
        name="Hằng"
      />
    </group>
  )
}

export default Couple
