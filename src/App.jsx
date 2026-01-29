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

  // Playback mode: 'shuffle' | 'sequential' | 'repeat-one'
  const [playbackMode, setPlaybackMode] = useState('sequential')
  // Custom playlist
  const [myPlaylist, setMyPlaylist] = useState([])
  // Active view: 'all' | 'playlist'
  const [activeView, setActiveView] = useState('all')

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
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
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
      title: 'I Forgot That You Existed',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/i-forgot.mp3`
    },
    {
      id: 4,
      title: 'Cruel Summer',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/cruel-summer.mp3`
    },
    {
      id: 5,
      title: 'The Man',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/man.mp3`
    },
    {
      id: 6,
      title: 'The Archer',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/the-archer.mp3`
    },
    {
      id: 7,
      title: 'I Think He Knows',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/i-think.mp3`
    },
    {
      id: 8,
      title: 'Miss Americana & The Heartbreak Prince',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/miss-americana.mp3`
    },
    {
      id: 9,
      title: 'Paper Rings',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/paper-rings.mp3`
    },
    {
      id: 10,
      title: 'Cornelia Street',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/cornelia.mp3`
    },
    {
      id: 11,
      title: 'Death By A Thousand Cuts',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/death.mp3`
    },
    {
      id: 12,
      title: 'London Boy',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/london-boy.mp3`
    },
    {
      id: 13,
      title: 'Soon You’ll Get Better',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/soon.mp3`
    },
    {
      id: 14,
      title: 'False God',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/false.mp3`
    },
    {
      id: 15,
      title: 'You Need To Calm Down',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/calm-down.mp3`
    },
    {
      id: 16,
      title: 'Afterglow',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/afterglow.mp3`
    },
    {
      id: 17,
      title: 'ME! (feat. Brendon Urie of Panic! At The Disco)',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/me.mp3`
    },
    {
      id: 18,
      title: 'It’s Nice To Have A Friend',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-lover.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/friend.mp3`
    },
    {
      id: 19,
      title: 'You Are In Love',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-1989.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/love.mp3`
    },
    {
      id: 20,
      title: 'Love Story',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-fearless.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/love-story.mp3`
    },
    {
      id: 21,
      title: 'You Belong With Me',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-fearless.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/you-belong.mp3`
    },
    {
      id: 22,
      title: 'Enchanted',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-speak-now.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/enchanted.mp3`
    },
    {
      id: 23,
      title: '...ready for it?',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/mine.mp3`
    },
    {
      id: 24,
      title: 'End Game',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/end-game.mp3`
    },
    {
      id: 25,
      title: 'I Did Something Bad',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/i-did.mp3`
    },
    {
      id: 26,
      title: 'Don\'t Blame Me',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/dont-blame.mp3`
    },
    {
      id: 27,
      title: 'Delicate',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/delicate.mp3`
    },
    {
      id: 28,
      title: 'Look What You Made Me Do',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/look-what-you.mp3`
    },
    {
      id: 29,
      title: 'So It Goes...',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/so-it-goes.mp3`
    },
    {
      id: 30,
      title: 'Gorgeous',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/gorgeous.mp3`
    },
    {
      id: 31,
      title: 'Getaway Car',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/getaway.mp3`
    },
    {
      id: 32,
      title: 'King of My Heart',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/king.mp3`
    },
    {
      id: 33,
      title: 'Dancing With Our Hands Tied',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/dancing.mp3`
    },
    {
      id: 34,
      title: 'Dress',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/dress.mp3`
    },
    {
      id: 35,
      title: 'This Is Why We Can\'t Have Nice Things',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/this-is.mp3`
    },
    {
      id: 36,
      title: 'Call It What You Want',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/call-it.mp3`
    },
    {
      id: 37,
      title: 'New Year\'s Day',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-reputation.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/new-year.mp3`
    },
    {
      id: 38,
      title: 'Lavender Haze',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/lavender.mp3`
    },
    {
      id: 39,
      title: 'Maroon',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/maroon.mp3`
    },
    {
      id: 40,
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/anti.mp3`
    },
    {
      id: 41,
      title: 'Snow on the Beach',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/snow.mp3`
    },
    {
      id: 42,
      title: 'You\'re On Your Own, Kid',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/kid.mp3`
    },
    {
      id: 43,
      title: 'Midnight Rain',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/midnight.mp3`
    },
    {
      id: 44,
      title: 'Question...?',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/question.mp3`
    },
    {
      id: 45,
      title: 'Vigilante Shit',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/vigilante.mp3`
    },
    {
      id: 46,
      title: 'Bejeweled',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/bejeweled.mp3`
    },
    {
      id: 47,
      title: 'Labyrinth',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/labyrinth.mp3`
    },
    {
      id: 48,
      title: 'Karma',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/karma.mp3`
    },
    {
      id: 49,
      title: 'Sweet Nothing',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/sweet.mp3`
    },
    {
      id: 50,
      title: 'Mastermind',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-midnights.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/mastermind.mp3`
    },
    {
      id: 51,
      title: 'The Fate of Ophelia',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/ophelia.mp3`
    },
    {
      id: 52,
      title: 'Elizabeth Taylor',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/elizabeth.mp3`
    },
    {
      id: 53,
      title: 'Opalite',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/opalite.mp3`
    },
    {
      id: 54,
      title: 'Father Figure',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/father.mp3`
    },
    {
      id: 55,
      title: 'Eldest Daughter',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/eldest-daughter.mp3`
    },
    {
      id: 56,
      title: 'Ruin The Friendship',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/ruin-friendship.mp3`
    },
    {
      id: 57,
      title: 'Actually Romantic',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/romantic.mp3`
    },
    {
      id: 58,
      title: 'Wi$h Li$t',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/wish.mp3`
    },
    {
      id: 59,
      title: 'Wood',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/wood.mp3`
    },
    {
      id: 60,
      title: 'CANCELLED!',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/cancelled.mp3`
    },
    {
      id: 61,
      title: 'Honey',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/honey.mp3`
    },
    {
      id: 62,
      title: 'The Life of a Showgirl',
      artist: 'Taylor Swift',
      albumArt: `${import.meta.env.BASE_URL}album-showgirl.jpg`,
      audioPath: `${import.meta.env.BASE_URL}music/showgirl.mp3`
    },
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

  // Add song to playlist
  const handleAddToPlaylist = (song) => {
    if (!myPlaylist.find(s => s.id === song.id)) {
      setMyPlaylist(prev => [...prev, song])
    }
  }

  // Remove song from playlist
  const handleRemoveFromPlaylist = (song) => {
    setMyPlaylist(prev => prev.filter(s => s.id !== song.id))
  }

  // Reorder playlist (drag and drop)
  const handleReorderPlaylist = (fromIndex, toIndex) => {
    setMyPlaylist(prev => {
      const newPlaylist = [...prev]
      const [movedItem] = newPlaylist.splice(fromIndex, 1)
      newPlaylist.splice(toIndex, 0, movedItem)
      return newPlaylist
    })
  }

  // Toggle playback mode
  const handlePlaybackModeChange = (mode) => {
    setPlaybackMode(mode)
  }

  // Switch view between all songs and playlist
  const handleViewChange = (view) => {
    setActiveView(view)
  }

  // Play next song
  const handleNextSong = () => {
    const activeSongs = getActiveSongList()
    const currentIndex = activeSongs.findIndex(s => s.id === currentSong?.id)

    if (playbackMode === 'shuffle') {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * activeSongs.length)
      } while (nextIndex === currentIndex && activeSongs.length > 1)
      setCurrentSong(activeSongs[nextIndex])
    } else {
      const nextIndex = (currentIndex + 1) % activeSongs.length
      setCurrentSong(activeSongs[nextIndex])
    }
    setIsPlaying(true)
  }

  // Play previous song
  const handlePrevSong = () => {
    const activeSongs = getActiveSongList()
    const currentIndex = activeSongs.findIndex(s => s.id === currentSong?.id)
    const prevIndex = currentIndex <= 0 ? activeSongs.length - 1 : currentIndex - 1
    setCurrentSong(activeSongs[prevIndex])
    setIsPlaying(true)
  }

  // Get the active song list based on current view
  const getActiveSongList = () => {
    return activeView === 'playlist' && myPlaylist.length > 0 ? myPlaylist : songs
  }

  // Auto-play when song ends based on playback mode
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      const activeSongs = getActiveSongList()
      const currentIndex = activeSongs.findIndex(s => s.id === currentSong?.id)

      if (playbackMode === 'repeat-one') {
        // Repeat current song
        audio.currentTime = 0
        audio.play().catch(err => console.log('Playback prevented:', err))
        return
      }

      if (playbackMode === 'sequential') {
        // Play next song in order
        const nextIndex = (currentIndex + 1) % activeSongs.length
        setCurrentSong(activeSongs[nextIndex])
        setIsPlaying(true)
      } else {
        // Shuffle mode - random song
        let nextIndex
        do {
          nextIndex = Math.floor(Math.random() * activeSongs.length)
        } while (nextIndex === currentIndex && activeSongs.length > 1)
        setCurrentSong(activeSongs[nextIndex])
        setIsPlaying(true)
      }
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentSong, songs, playbackMode, activeView, myPlaylist])

  // Load and play song when changed
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    audio.src = currentSong.audioPath
    audio.load()

    if (isPlaying) {
      audio.play().catch(err => console.log('Playback prevented:', err))
    }
  }, [currentSong])

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
        playbackMode={playbackMode}
        onPlaybackModeChange={handlePlaybackModeChange}
        myPlaylist={myPlaylist}
        onAddToPlaylist={handleAddToPlaylist}
        onRemoveFromPlaylist={handleRemoveFromPlaylist}
        activeView={activeView}
        onViewChange={handleViewChange}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        onReorderPlaylist={handleReorderPlaylist}
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
