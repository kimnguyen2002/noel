import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function LEDLights() {
  const lightsRef = useRef()

  // Generate positions for lights wrapped around the tree
  const lightPositions = useMemo(() => {
    const positions = []
    const colors = []
    const spirals = 8 // Number of spiral wraps
    const pointsPerSpiral = 15

    for (let i = 0; i < spirals; i++) {
      const heightRatio = i / spirals
      const height = 0.5 + heightRatio * 3.5
      const radius = 2 - heightRatio * 1.5

      for (let j = 0; j < pointsPerSpiral; j++) {
        const angle = (j / pointsPerSpiral) * Math.PI * 2 + (i * Math.PI / 4)
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        positions.push(x, height, z)

        // Alternate between different light colors
        const colorIndex = (i + j) % 4
        switch (colorIndex) {
          case 0:
            colors.push(1, 0.2, 0.2) // Red
            break
          case 1:
            colors.push(0.2, 1, 0.2) // Green
            break
          case 2:
            colors.push(0.2, 0.2, 1) // Blue
            break
          case 3:
            colors.push(1, 1, 0.2) // Yellow
            break
        }
      }
    }

    return { positions, colors }
  }, [])

  // Animate the lights (blinking effect)
  useFrame((state) => {
    if (lightsRef.current) {
      const time = state.clock.getElapsedTime()
      const colors = lightsRef.current.geometry.attributes.color.array

      for (let i = 0; i < colors.length; i += 3) {
        const index = i / 3
        // Create a wave effect with different phases for each light
        const phase = index * 0.5
        const brightness = 0.3 + Math.sin(time * 2 + phase) * 0.7

        // Apply brightness while maintaining color
        colors[i] *= brightness / (colors[i] + 0.01)
        colors[i + 1] *= brightness / (colors[i + 1] + 0.01)
        colors[i + 2] *= brightness / (colors[i + 2] + 0.01)
      }

      lightsRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={lightsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lightPositions.positions.length / 3}
          array={new Float32Array(lightPositions.positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={lightPositions.colors.length / 3}
          array={new Float32Array(lightPositions.colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default LEDLights
