import { useEffect, useRef } from 'react'
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
  onSeek
}) {
  const modalRef = useRef(null)

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

  if (!isOpen) return null

  return (
    <div className="music-modal-overlay" onClick={onClose}>
      <div className="music-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="music-modal-close" onClick={onClose}>×</button>

        <h2 className="music-modal-title">🎵 Music Player</h2>

        {/* Song List */}
        <div className="music-song-list">
          {songs.map((song) => (
            <div
              key={song.id}
              className={`music-song-item ${currentSong?.id === song.id ? 'active' : ''}`}
              onClick={() => handleSongClick(song)}
            >
              <img src={song.albumArt} alt={song.title} className="music-album-art" />
              <div className="music-song-info">
                <div className="music-song-title">{song.title}</div>
                <div className="music-song-artist">{song.artist}</div>
              </div>
              {currentSong?.id === song.id && isPlaying && (
                <div className="music-playing-indicator">♪</div>
              )}
            </div>
          ))}
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

            {/* Play/Pause Button */}
            <button className="music-play-button" onClick={onPlayPause}>
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MusicPlayerModal
