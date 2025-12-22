import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SnowEffect() {
  const snowRef = useRef()

  // Generate random snowflake positions
  const snowflakes = useMemo(() => {
    const positions = []
    const velocities = []
    const count = 200

    for (let i = 0; i < count; i++) {
      // Spread snow mostly outside the window area
      positions.push(
        (Math.random() - 0.5) * 20, // x
        Math.random() * 15 - 2,      // y
        -12 + Math.random() * 3      // z (behind window)
      )

      // Random fall speeds
      velocities.push(
        (Math.random() - 0.5) * 0.02, // x drift
        -Math.random() * 0.05 - 0.01,  // y fall speed
        0                               // z
      )
    }

    return {
      positions: new Float32Array(positions),
      velocities: new Float32Array(velocities)
    }
  }, [])

  // Animate snowflakes falling
  useFrame(() => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array

      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3

        // Update position
        positions[i] += snowflakes.velocities[index * 3]     // x
        positions[i + 1] += snowflakes.velocities[index * 3 + 1] // y

        // Reset snowflake when it falls below view
        if (positions[i + 1] < -5) {
          positions[i + 1] = 10
          positions[i] = (Math.random() - 0.5) * 20
        }

        // Keep snow within bounds horizontally
        if (positions[i] < -10) positions[i] = 10
        if (positions[i] > 10) positions[i] = -10
      }

      snowRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={snowflakes.positions.length / 3}
          array={snowflakes.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default SnowEffect
