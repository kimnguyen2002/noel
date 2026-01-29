import { useEffect, useRef, useState } from 'react'
import './MusicPlayerModal.css'

function MusicPlayerModal({
  isOpen,
  onClose,
  currentSong,
  onSongSelect,
  songs,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  playbackMode,
  onPlaybackModeChange,
  myPlaylist,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  activeView,
  onViewChange,
  onNextSong,
  onPrevSong,
  onReorderPlaylist
}) {
  const modalRef = useRef(null)
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleSeekClick = (e) => {
    const progressBar = e.currentTarget
    const clickX = e.clientX - progressBar.getBoundingClientRect().left
    const width = progressBar.offsetWidth
    const seekTime = (clickX / width) * duration
    onSeek(seekTime)
  }

  const handleSongClick = (song) => {
    onSongSelect(song)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isInPlaylist = (song) => {
    return myPlaylist.some(s => s.id === song.id)
  }

  const handlePlaylistToggle = (e, song) => {
    e.stopPropagation()
    if (isInPlaylist(song)) {
      onRemoveFromPlaylist(song)
    } else {
      onAddToPlaylist(song)
    }
  }

  const getPlaybackModeIcon = () => {
    switch (playbackMode) {
      case 'sequential':
        return '↻'
      case 'repeat-one':
        return '🔂'
      case 'shuffle':
      default:
        return '🔀'
    }
  }

  const getPlaybackModeLabel = () => {
    switch (playbackMode) {
      case 'sequential':
        return 'In order'
      case 'repeat-one':
        return 'Repeat'
      case 'shuffle':
      default:
        return 'Shuffle'
    }
  }

  const cyclePlaybackMode = () => {
    const modes = ['shuffle', 'sequential', 'repeat-one']
    const currentIndex = modes.indexOf(playbackMode)
    const nextIndex = (currentIndex + 1) % modes.length
    onPlaybackModeChange(modes[nextIndex])
  }

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    if (activeView !== 'playlist') return
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (activeView !== 'playlist' || draggedIndex === null) return
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, toIndex) => {
    e.preventDefault()
    if (activeView !== 'playlist' || draggedIndex === null) return

    if (draggedIndex !== toIndex) {
      onReorderPlaylist(draggedIndex, toIndex)
    }

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // Get songs to display based on active view
  const displaySongs = activeView === 'playlist' ? myPlaylist : songs

  if (!isOpen) return null

  return (
    <div className="music-modal-overlay" onClick={onClose}>
      <div className="music-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="music-modal-close" onClick={onClose}>×</button>

        <h2 className="music-modal-title">🎵 Music Player</h2>

        {/* View Tabs */}
        <div className="music-tabs">
          <button
            className={`music-tab ${activeView === 'all' ? 'active' : ''}`}
            onClick={() => onViewChange('all')}
          >
            All ({songs.length})
          </button>
          <button
            className={`music-tab ${activeView === 'playlist' ? 'active' : ''}`}
            onClick={() => onViewChange('playlist')}
          >
            My Playlist ({myPlaylist.length})
          </button>
        </div>

        {/* Playback Mode Control */}
        <div className="music-playback-mode">
          <button
            className="music-mode-btn"
            onClick={cyclePlaybackMode}
            title={getPlaybackModeLabel()}
          >
            <span className="mode-icon">{getPlaybackModeIcon()}</span>
            <span className="mode-label">{getPlaybackModeLabel()}</span>
          </button>
        </div>

        {/* Song List */}
        <div className="music-song-list">
          {displaySongs.length === 0 ? (
            <div className="music-empty-playlist">
              <p>Empty Playlist</p>
              <p className="music-empty-hint">Press + to add songs to the playlist</p>
              <p className="music-empty-hint">Drag and drop to reorder songs in the playlist</p>
            </div>
          ) : (
            displaySongs.map((song, index) => (
              <div
                key={song.id}
                className={`music-song-item ${currentSong?.id === song.id ? 'active' : ''} ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                onClick={() => handleSongClick(song)}
                draggable={activeView === 'playlist'}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                {/* Order number for playlist */}
                {activeView === 'playlist' && (
                  <div className="music-order-number">{index + 1}</div>
                )}

                <img src={song.albumArt} alt={song.title} className="music-album-art" />
                <div className="music-song-info">
                  <div className="music-song-title">{song.title}</div>
                  <div className="music-song-artist">{song.artist}</div>
                </div>
                {currentSong?.id === song.id && isPlaying && (
                  <div className="music-playing-indicator">♪</div>
                )}
                <button
                  className={`music-playlist-toggle ${isInPlaylist(song) ? 'in-playlist' : ''}`}
                  onClick={(e) => handlePlaylistToggle(e, song)}
                  title={isInPlaylist(song) ? 'Remove from playlist' : 'Add to playlist'}
                >
                  {isInPlaylist(song) ? '✓' : '+'}
                </button>

                {/* Drag handle for playlist */}
                {activeView === 'playlist' && (
                  <div className="music-drag-handle" title="Drag to reorder">⋮⋮</div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Now Playing Section */}
        {currentSong && (
          <div className="music-now-playing">
            <div className="music-controls-info">
              <img src={currentSong.albumArt} alt={currentSong.title} className="music-current-album" />
              <div className="music-current-info">
                <div className="music-current-title">{currentSong.title}</div>
                <div className="music-current-artist">{currentSong.artist}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="music-progress-container">
              <span className="music-time">{formatTime(currentTime)}</span>
              <div className="music-progress-bar" onClick={handleSeekClick}>
                <div
                  className="music-progress-fill"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <span className="music-time">{formatTime(duration)}</span>
            </div>

            {/* Playback Controls */}
            <div className="music-controls">
              <button className="music-control-btn" onClick={onPrevSong} title="Previous">
                ⏮
              </button>
              <button className="music-play-button" onClick={onPlayPause}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="music-control-btn" onClick={onNextSong} title="Next">
                ⏭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MusicPlayerModal
