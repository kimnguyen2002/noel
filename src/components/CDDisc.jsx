import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function CDDisc({ rotation, imagePath, scale = 1, opacity = 1, onClick, onPointerOver, onPointerOut }) {
  // Try to load texture, fallback to colored disc if image doesn't exist
  let texture = null
  try {
    texture = useLoader(THREE.TextureLoader, imagePath)
  } catch (error) {
    console.log(`Could not load texture: ${imagePath}`)
  }

  return (
    <group
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* CD Disc base - shiny silver/white */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.005, 32]} />
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.2}
          metalness={0.8}
          emissive="#ffffff"
          emissiveIntensity={0.2}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>

      {/* Album art ring - with texture or fallback color */}
      <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.025, 0.11, 32]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.4}
            metalness={0.3}
            side={THREE.DoubleSide}
            transparent={opacity < 1}
            opacity={opacity}
          />
        ) : (
          <meshStandardMaterial
            color="#4ecdc4"
            roughness={0.4}
            metalness={0.3}
            emissive="#4ecdc4"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
            transparent={opacity < 1}
            opacity={opacity}
          />
        )}
      </mesh>

      {/* CD Center hole - dark metallic */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.006, 16]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.2}
          metalness={0.9}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>

      {/* Holographic effect ring - outer edge */}
      <mesh position={[0, 0.0025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.12, 32]} />
        <meshStandardMaterial
          color="#88ccff"
          roughness={0.1}
          metalness={0.9}
          emissive="#88ccff"
          emissiveIntensity={0.4}
          side={THREE.DoubleSide}
          transparent
          opacity={0.6 * opacity}
        />
      </mesh>
    </group>
  )
}

export default CDDisc
