import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import RecordPlayer from './RecordPlayer'

// Simple Fire component (animated cones + flickering light)
function Fire({ position = [0, 0, 0] }) {
  const fireRef = useRef()
  const lightRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (fireRef.current) {
      // animate child scales/positions for a flicker
      fireRef.current.children.forEach((c, i) => {
        const flick = 0.9 + Math.abs(Math.sin(t * (3 + i) + i)) * 0.6
        c.scale.y = flick
        c.position.y = 0.1 + flick * 0.14
      })
    }

    if (lightRef.current) {
      // flicker light intensity and slight color shift
      lightRef.current.intensity = 1.2 + Math.sin(t * 18) * 0.6
      const c = 0.5 + Math.sin(t * 6) * 0.5
      // small color variation between orange and yellow
      lightRef.current.color.setRGB(1, 0.6 + c * 0.2, 0.12)
    }
  })

  return (
    <group ref={fireRef} position={position}>
      <mesh position={[0, 0.4, 0.5]} castShadow>
        <coneGeometry args={[0.45, 0.9, 16]} />
        <meshStandardMaterial color="#ff8c00" emissive="#ff4500" emissiveIntensity={2} transparent opacity={0.95} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.22, 0.45]} castShadow>
        <coneGeometry args={[0.28, 0.5, 12]} />
        <meshStandardMaterial color="#ffd54f" emissive="#ffb84d" emissiveIntensity={2.2} transparent opacity={0.98} roughness={0.1} />
      </mesh>

      {/* subtle additive glow plane to make fire visible against dark recess */}
      <mesh position={[0, 0.42, 0.55]} rotation={[0, 0, 0]}> 
        <planeGeometry args={[1.4, 0.9]} />
        <meshBasicMaterial color="#ffae42" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <pointLight ref={lightRef} position={[0, 0.6, 0.5]} color="#ffae42" intensity={1.8} distance={6} decay={2} />
    </group>
  )
}

// Simple Dog component with walking animation
function Dog({ position }) {
  const dogRef = useRef()

  useFrame((state) => {
    if (dogRef.current) {
      const time = state.clock.getElapsedTime()

      // Walking back and forth animation
      const walkCycle = (Math.sin(time * 0.5) + 1) / 2 // 0 to 1
      dogRef.current.position.x = position[0] + (walkCycle - 0.5) * 3 // walk 3 units total
      dogRef.current.position.z = position[2]

      // Face direction of movement
      const direction = Math.cos(time * 0.5)
      dogRef.current.rotation.y = direction > 0 ? 0 : Math.PI

      // Tail wagging
      if (dogRef.current.children[5]) {
        dogRef.current.children[5].rotation.z = Math.sin(time * 4) * 0.3
      }
    }
  })

  return (
    <group ref={dogRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.7]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.3, 0.5]} castShadow>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.25, 0.7]} castShadow>
        <boxGeometry args={[0.15, 0.12, 0.15]} />
        <meshStandardMaterial color="#c49565" roughness={0.8} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.12, 0.4, 0.5]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.05]} />
        <meshStandardMaterial color="#b58555" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 0.4, 0.5]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.05]} />
        <meshStandardMaterial color="#b58555" roughness={0.8} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.25, -0.35]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -0.05, 0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.05, 0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      <mesh position={[-0.15, -0.05, -0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.05, -0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.08, 0.32, 0.62]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.08, 0.32, 0.62]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* small eye highlights for dog */}
      <mesh position={[-0.075, 0.325, 0.635]}> 
        <sphereGeometry args={[0.007, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.085, 0.325, 0.635]}> 
        <sphereGeometry args={[0.007, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.22, 0.77]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

// Simple Cat component
function Cat({ position }) {
  const catRef = useRef()

  useFrame((state) => {
    if (catRef.current) {
      const time = state.clock.getElapsedTime()
      // Gentle breathing
      const breathe = Math.sin(time * 1.5) * 0.015
      catRef.current.scale.y = 1 + breathe
    }
  })

  return (
    <group ref={catRef} position={position}>
      {/* Body - curled up sleeping position */}
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#f4a460" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0.15, 0.25, 0.15]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f4a460" roughness={0.8} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.1, 0.38, 0.2]} rotation={[0, -0.3, 0.2]} castShadow>
        <coneGeometry args={[0.05, 0.08, 8]} />
        <meshStandardMaterial color="#f4a460" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.38, 0.2]} rotation={[0, 0.3, -0.2]} castShadow>
        <coneGeometry args={[0.05, 0.08, 8]} />
        <meshStandardMaterial color="#f4a460" roughness={0.8} />
      </mesh>

      {/* Eyes - open */}
      <mesh position={[0.12, 0.27, 0.27]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ffffffff" />
      </mesh>
      <mesh position={[0.2, 0.27, 0.24]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* small eye highlights for cat */}
      <mesh position={[0.13, 0.285, 0.285]}>
        <sphereGeometry args={[0.005, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.205, 0.285, 0.255]}>
        <sphereGeometry args={[0.005, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>

      {/* Pink nose */}
      <mesh position={[0.22, 0.23, 0.23]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>

      {/* Tail wrapped around */}
      <mesh position={[-0.15, 0.12, -0.1]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI * 1.5]} />
        <meshStandardMaterial color="#f4a460" roughness={0.8} />
      </mesh>

      {/* Stripes (darker sandy brown) */}
      <mesh position={[0.08, 0.18, 0.1]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.35]} />
        <meshStandardMaterial color="#daa06d" roughness={0.8} />
      </mesh>
    </group>
  )
}

function CozyRoom({ onOpenMusicPlayer, isMusicPlaying }) {
  // load wall frame textures from public/ (add your second image as `wall-photo-2.jpg`)
  const frameTex = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}wall-photo.jpg`)
  const frameTex2 = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}wall-photo-2.jpg`)
  const frameTex3 = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}wall-photo-3.jpg`)
  const frameTex4 = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}wall-photo-4.jpg`)
  const frameTex5 = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}wall-photo-5.jpg`)

  // Simplified texture configuration to prevent jittering
  useEffect(() => {
    if (!frameTex) return
    try {
      frameTex.wrapS = THREE.ClampToEdgeWrapping
      frameTex.wrapT = THREE.ClampToEdgeWrapping
      frameTex.minFilter = THREE.LinearFilter
      frameTex.magFilter = THREE.LinearFilter
      frameTex.colorSpace = THREE.SRGBColorSpace
      frameTex.generateMipmaps = false
      frameTex.anisotropy = 1
      frameTex.needsUpdate = true
    } catch (e) {
      // ignore
    }
  }, [frameTex])

  // Simplified texture configuration for second frame
  useEffect(() => {
    if (!frameTex2) return
    try {
      frameTex2.wrapS = THREE.ClampToEdgeWrapping
      frameTex2.wrapT = THREE.ClampToEdgeWrapping
      frameTex2.minFilter = THREE.LinearFilter
      frameTex2.magFilter = THREE.LinearFilter
      frameTex2.colorSpace = THREE.SRGBColorSpace
      frameTex2.generateMipmaps = false
      frameTex2.anisotropy = 1
      frameTex2.needsUpdate = true
    } catch (e) {
      // ignore
    }
  }, [frameTex2])

  // Texture configuration for third frame
  useEffect(() => {
    if (!frameTex3) return
    try {
      frameTex3.wrapS = THREE.ClampToEdgeWrapping
      frameTex3.wrapT = THREE.ClampToEdgeWrapping
      frameTex3.minFilter = THREE.LinearFilter
      frameTex3.magFilter = THREE.LinearFilter
      frameTex3.colorSpace = THREE.SRGBColorSpace
      frameTex3.generateMipmaps = false
      frameTex3.anisotropy = 1
      frameTex3.needsUpdate = true
    } catch (e) {
      // ignore
    }
  }, [frameTex3])

  // Texture configuration for fourth frame
  useEffect(() => {
    if (!frameTex4) return
    try {
      frameTex4.wrapS = THREE.ClampToEdgeWrapping
      frameTex4.wrapT = THREE.ClampToEdgeWrapping
      frameTex4.minFilter = THREE.LinearFilter
      frameTex4.magFilter = THREE.LinearFilter
      frameTex4.colorSpace = THREE.SRGBColorSpace
      frameTex4.generateMipmaps = false
      frameTex4.anisotropy = 1
      frameTex4.needsUpdate = true
    } catch (e) {
      // ignore
    }
  }, [frameTex4])

  // Texture configuration for fifth frame
  useEffect(() => {
    if (!frameTex5) return
    try {
      frameTex5.wrapS = THREE.ClampToEdgeWrapping
      frameTex5.wrapT = THREE.ClampToEdgeWrapping
      frameTex5.minFilter = THREE.LinearFilter
      frameTex5.magFilter = THREE.LinearFilter
      frameTex5.colorSpace = THREE.SRGBColorSpace
      frameTex5.generateMipmaps = false
      frameTex5.anisotropy = 1
      frameTex5.needsUpdate = true
    } catch (e) {
      // ignore
    }
  }, [frameTex5])

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#8b7355" roughness={0.8} />
      </mesh>

      {/* Back Wall with Window */}
      <group position={[0, 4, -10]}>
        {/* Wall */}
        <mesh receiveShadow>
          <planeGeometry args={[30, 12]} />
          <meshStandardMaterial color="#d4c4b0" roughness={0.9} />
        </mesh>

        {/* Window Frame */}
        <mesh position={[-5, 0, 0.1]}>
          <planeGeometry args={[4, 5]} />
          <meshStandardMaterial color="#87ceeb" emissive="#4a90c2" emissiveIntensity={0.3} transparent opacity={0.7} />
        </mesh>

        {/* Window Panes - Cross pattern */}
        <mesh position={[-5, 0, 0.15]}>
          <boxGeometry args={[0.1, 5, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-5, 0, 0.15]}>
          <boxGeometry args={[4, 0.1, 0.05]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Snow visible through window */}
        <mesh position={[-5, -1, -0.2]}>
          <planeGeometry args={[3.8, 2]} />
          <meshStandardMaterial color="#ffffff" emissive="#e6f7ff" emissiveIntensity={0.5} />
        </mesh>

        {/* Window sill */}
        <mesh position={[-5, -2.6, 0.2]}>
          <boxGeometry args={[4.2, 0.2, 0.3]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Picture frame 1 - fixed z-fighting */}
        <mesh position={[3, 1, 0.3]} castShadow>
          <boxGeometry args={[2.4, 3.0, 0.12]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[3, 1, 0.38]}>
          <planeGeometry args={[2.1, 2.7]} />
          <meshStandardMaterial
            map={frameTex}
            roughness={1}
            metalness={0}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Picture frame 2 - fixed z-fighting, portrait orientation */}
        <mesh position={[8, 1.2, 0.3]} castShadow>
          <boxGeometry args={[3, 4, 0.12]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[8, 1.2, 0.38]}>
          <planeGeometry args={[2.6, 3.6]} />
          <meshStandardMaterial
            map={frameTex2}
            roughness={1}
            metalness={0}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      </group>

      {/* Left Wall */}
      <group position={[-12, 4, 5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[30, 12]} />
          <meshStandardMaterial color="#c9b8a3" roughness={0.9} />
        </mesh>

        {/* Picture frame 4 - left wall top */}
        <mesh position={[10, 2, 0.3]} castShadow>
          <boxGeometry args={[2, 2.8, 0.12]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[10, 2, 0.38]}>
          <planeGeometry args={[1.7, 2.5]} />
          <meshStandardMaterial
            map={frameTex4}
            roughness={1}
            metalness={0}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Picture frame 5 - left wall bottom */}
        <mesh position={[10, -2, 0.3]} castShadow>
          <boxGeometry args={[2, 2.8, 0.12]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[10, -2, 0.38]}>
          <planeGeometry args={[1.7, 2.5]} />
          <meshStandardMaterial
            map={frameTex5}
            roughness={1}
            metalness={0}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      </group>

      {/* Right Wall */}
      <group position={[12, 4, 5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[30, 12]} />
          <meshStandardMaterial color="#c9b8a3" roughness={0.9} />
        </mesh>

        {/* Picture frame 3 - right wall large frame */}
        <mesh position={[-10, 0, 0.3]} castShadow>
          <boxGeometry args={[5, 3.5, 0.12]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[-10, 0, 0.38]}>
          <planeGeometry args={[4.7, 3.2]} />
          <meshStandardMaterial
            map={frameTex3}
            roughness={1}
            metalness={0}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      </group>

      {/* Fireplace - FIXED position */}
      <group position={[6, -0.5, -9.5]}>
        {/* Fireplace structure */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[3, 3, 0.8]} />
          <meshStandardMaterial color="#8b4513" roughness={0.7} />
        </mesh>

        

        {/* Fireplace opening */}
        <mesh position={[0, 1, 0.5]}>
          <boxGeometry args={[2, 1.5, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Fire glow */}
        <pointLight position={[0, 1, 0.5]} intensity={1.5} distance={5} color="#ff6600" />
        {/* Animated fire mesh inside fireplace */}
        <Fire position={[0, 0.6, 0.25]} />

        {/* Mantle */}
        <mesh position={[0, 3, 0.2]} castShadow>
          <boxGeometry args={[3.5, 0.3, 1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* Christmas stockings */}
        <mesh position={[-0.8, 2.6, 0.5]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color="#c41e3a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.6, 0.5]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color="#0d5c0d" roughness={0.7} />
        </mesh>
        <mesh position={[0.8, 2.6, 0.5]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>

        {/* Candles on mantle */}
        <mesh position={[-1.3, 3.3, 0.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
          <meshStandardMaterial color="#fff8dc" />
        </mesh>
        <pointLight position={[-1.3, 3.5, 0.5]} intensity={0.3} distance={2} color="#ffa500" />

        <mesh position={[1.3, 3.3, 0.5]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
          <meshStandardMaterial color="#fff8dc" />
        </mesh>
        <pointLight position={[1.3, 3.5, 0.5]} intensity={0.3} distance={2} color="#ffa500" />
      </group>

      {/* Cozy Armchair */}
      <group position={[-4, -0.35, 2]} rotation={[0, Math.PI / 6, 0]}>
        {/* Chair seat */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.3, 1.5]} />
          <meshStandardMaterial color="#8b0000" roughness={0.6} />
        </mesh>

        {/* Chair back */}
        <mesh position={[0, 0.8, -0.6]} castShadow>
          <boxGeometry args={[1.5, 1.5, 0.3]} />
          <meshStandardMaterial color="#8b0000" roughness={0.6} />
        </mesh>

        {/* Armrests */}
        <mesh position={[-0.7, 0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#8b0000" roughness={0.6} />
        </mesh>
        <mesh position={[0.7, 0.3, 0]} castShadow>
          <boxGeometry args={[0.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#8b0000" roughness={0.6} />
        </mesh>

        {/* Cushion on chair */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#ffd700" roughness={0.7} />
        </mesh>
      </group>

      {/* Coffee Table - FIXED position */}
      <group position={[-1.5, -0.5, 4]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 1]} />
          <meshStandardMaterial color="#654321" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Table legs */}
        <mesh position={[-0.7, 0.2, -0.35]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.7, 0.2, -0.35]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[-0.7, 0.2, 0.35]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>
        <mesh position={[0.7, 0.2, 0.35]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>

        {/* Books on table */}
        <mesh position={[-0.3, 0.48, 0]} castShadow>
          <boxGeometry args={[0.3, 0.08, 0.4]} />
          <meshStandardMaterial color="#8b0000" roughness={0.7} />
        </mesh>
        <mesh position={[-0.3, 0.56, 0]} castShadow>
          <boxGeometry args={[0.3, 0.08, 0.4]} />
          <meshStandardMaterial color="#0d5c0d" roughness={0.7} />
        </mesh>

        {/* Mug on table */}
        <mesh position={[-0.6, 0.52, 0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Record Player on table - positioned clearly ON TOP of table */}
        <RecordPlayer position={[0.4, 0.48, 0]} onOpen={onOpenMusicPlayer} isPlaying={isMusicPlaying} />
      </group>

      {/* Side Table with Lamp - FIXED position */}
      <group position={[-5, -0.5, 2.6]}>
        {/* Table top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial color="#654321" roughness={0.5} />
        </mesh>

        {/* Table leg */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.6} />
        </mesh>

        {/* Lamp base */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 12]} />
          <meshStandardMaterial color="#c49565" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Lamp pole */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#c49565" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <coneGeometry args={[0.25, 0.35, 16]} />
          <meshStandardMaterial color="#fff8dc" emissive="#ffa500" emissiveIntensity={0.2} transparent opacity={0.9} />
        </mesh>

        {/* Lamp light */}
        <pointLight position={[0, 1.05, 0]} intensity={0.5} distance={4} color="#ffe5b4" />
      </group>

      {/* Bookshelf - FIXED position */}
      <group position={[-10.8, -0.7, -9.7]}>
        {/* Frame */}
        <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 3.5, 0.4]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>

        {/* Shelves */}
        <mesh position={[0, 1.05, 0.05]}>
          <boxGeometry args={[1.9, 0.05, 0.35]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.05, 0.05]}>
          <boxGeometry args={[1.9, 0.05, 0.35]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
        <mesh position={[0, 3.05, 0.05]}>
          <boxGeometry args={[1.9, 0.05, 0.35]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>

        {/* Books on shelves - various colors */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 1.45, 0.15]} castShadow>
            <boxGeometry args={[0.3, 0.7, 0.2]} />
            <meshStandardMaterial color={['#8b0000', '#0d5c0d', '#1e3a8a', '#854d0e'][i]} roughness={0.7} />
          </mesh>
        ))}
        {[-0.5, 0, 0.5].map((x, i) => (
          <mesh key={`shelf2-${i}`} position={[x, 2.45, 0.15]} castShadow>
            <boxGeometry args={[0.35, 0.8, 0.2]} />
            <meshStandardMaterial color={['#4a5568', '#7c2d12', '#065f46'][i]} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Plant 1 - in corner - FIXED position */}
      <group position={[-9, -0.5, -9.5]}>
        {/* Pot */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>

        {/* Plant leaves */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#0d5c0d" roughness={0.8} />
        </mesh>
        <mesh position={[-0.15, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#118c11" roughness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#118c11" roughness={0.8} />
        </mesh>
      </group>

      {/* Plant 2 - near window - FIXED position */}
      <group position={[-8, -0.5, -9.5]}>
        {/* Pot */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#c49565" roughness={0.8} />
        </mesh>

        {/* Palm-like leaves */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.5, 0.05, 0.1]} />
          <meshStandardMaterial color="#0f6b0f" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0.5, 0.3]} castShadow>
          <boxGeometry args={[0.5, 0.05, 0.1]} />
          <meshStandardMaterial color="#0f6b0f" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, -0.5, 0.3]} castShadow>
          <boxGeometry args={[0.5, 0.05, 0.1]} />
          <meshStandardMaterial color="#0f6b0f" roughness={0.8} />
        </mesh>
      </group>

      {/* Rug under tree */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]} receiveShadow>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.9} />
      </mesh>

      {/* Small rug near fireplace */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.49, -7]} receiveShadow>
        <planeGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#8b4513" roughness={0.95} />
      </mesh>

      {/* Dog - walking back and forth near fireplace */}
      <Dog position={[7, -0.3, -7]} />

      {/* Cat - sleeping on armchair - FIXED position */}
      <Cat position={[-4, -0.1, 2]} />

      {/* Ceiling light */}
      <pointLight position={[0, 8, 0]} intensity={0.4} distance={20} color="#ffe5b4" />

      {/* Ambient room lighting */}
      <pointLight position={[5, 3, 5]} intensity={0.3} distance={15} color="#ffa500" />
      <pointLight position={[-5, 3, 5]} intensity={0.3} distance={15} color="#ffa500" />
    </group>
  )
}

export default CozyRoom
