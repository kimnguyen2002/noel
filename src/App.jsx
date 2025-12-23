import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import ChristmasTree from './components/ChristmasTree'
import CozyRoom from './components/CozyRoom'
import SnowEffect from './components/SnowEffect'
import LetterModal from './components/LetterModal'
import MusicPlayerModal from './components/MusicPlayerModal'
import CDCaseDisplay from './components/CDCaseDisplay'
import GiftBox from './components/GiftBox'
import Couple from './components/Couple'
import './App.css'

function App() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [clickedLetters, setClickedLetters] = useState(new Set())
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Gift box states
  const [isGiftBoxLidOpen, setIsGiftBoxLidOpen] = useState(false)
  const [isCDCaseDisplayOpen, setIsCDCaseDisplayOpen] = useState(false)
  const [cdCases, setCdCases] = useState([])
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)

  // Define the songs list
  const songs = [
    {
      id: 1,
      title: 'Daylight',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-daylight.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/daylight.mp3`
    },
    {
      id: 2,
      title: 'Lover',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/lover.mp3`
    },
    {
      id: 3,
      title: 'All I Want for Christmas Is You',
      artist: 'Mariah Carey',
      albumArt: `${import.meta.env.BASE_URL}album-christmas.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/all-i-want-for-christmas.mp3`
    }
  ]

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter)
    setClickedLetters(prev => new Set([...prev, letter.id]))
  }

  const handleOpenMusicPlayer = () => {
    setIsMusicPlayerOpen(true)
  }

  const handleCloseMusicPlayer = () => {
    setIsMusicPlayerOpen(false)
  }

  const handleSongSelect = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  // Auto-play and shuffle when song ends
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      // Shuffle to next random song
      const currentIndex = songs.findIndex(s => s.id === currentSong?.id)
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * songs.length)
      } while (nextIndex === currentIndex && songs.length > 1)

      setCurrentSong(songs[nextIndex])
      setIsPlaying(true)
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentSong, songs])

  // Load and play song when changed
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    audio.src = currentSong.audioPath
    audio.load()

    if (isPlaying) {
      audio.play().catch(err => console.log('Playback prevented:', err))
    }
  }, [currentSong, isPlaying])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(err => console.log('Playback prevented:', err))
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  // Gift box handlers
  const handleGiftBoxCameraMove = () => {
    if (cameraRef.current && controlsRef.current) {
      // Smoothly animate camera to move above gift box and look down
      const startPos = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()
      const endPos = { x: 1.5, y: 3, z: 3.8 }
      const endTarget = { x: 1.5, y: -0.3, z: 1.8 }

      let progress = 0
      const animationDuration = 1500 // 1.5 seconds
      const startTime = Date.now()

      const animate = () => {
        const currentTime = Date.now()
        progress = Math.min((currentTime - startTime) / animationDuration, 1)

        // Ease-in-out function for smooth animation
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        // Interpolate camera position
        cameraRef.current.position.x = startPos.x + (endPos.x - startPos.x) * eased
        cameraRef.current.position.y = startPos.y + (endPos.y - startPos.y) * eased
        cameraRef.current.position.z = startPos.z + (endPos.z - startPos.z) * eased

        // Interpolate target position
        controlsRef.current.target.x = startTarget.x + (endTarget.x - startTarget.x) * eased
        controlsRef.current.target.y = startTarget.y + (endTarget.y - startTarget.y) * eased
        controlsRef.current.target.z = startTarget.z + (endTarget.z - startTarget.z) * eased

        controlsRef.current.update()

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }

  const handleGiftBoxLidOpen = () => {
    setIsGiftBoxLidOpen(true)
  }

  const handleCDClick = (cases) => {
    setCdCases(cases)
    setIsCDCaseDisplayOpen(true)
  }

  const handleCloseCDDisplay = () => {
    setIsCDCaseDisplayOpen(false)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} ref={cameraRef} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.3} color="#ffa500" />

        {/* Cozy Room Background */}
        <CozyRoom onOpenMusicPlayer={handleOpenMusicPlayer} isMusicPlaying={isPlaying} />

        {/* Snow Effect */}
        <SnowEffect />

        {/* Christmas Tree */}
        <ChristmasTree
          onLetterClick={handleLetterClick}
          clickedLetters={clickedLetters}
        />

        {/* Couple standing near the tree */}
        <Couple />

        {/* Gift Box under the tree */}
        <GiftBox
          position={[1.5, -0.5, 1.8]}
          onCameraMove={handleGiftBoxCameraMove}
          onLidOpen={handleGiftBoxLidOpen}
          onCDClick={handleCDClick}
          isLidOpen={isGiftBoxLidOpen}
        />

        {/* Controls - limit rotation to Y-axis for tree spinning */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Letter Modal */}
      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      )}

      {/* Music Player Modal */}
      <MusicPlayerModal
        isOpen={isMusicPlayerOpen}
        onClose={handleCloseMusicPlayer}
        currentSong={currentSong}
        onSongSelect={handleSongSelect}
        songs={songs}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
      />

      {/* CD Case Display Modal */}
      <CDCaseDisplay
        isOpen={isCDCaseDisplayOpen}
        onClose={handleCloseCDDisplay}
        cdCases={cdCases}
        displayMode="horizontal"
      />

      {/* Global Audio Element (persists when modal closes) */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
}

export default App
