import { useEffect } from 'react'
import './CDCaseDisplay.css'

function CDCaseDisplay({ isOpen, onClose, cdCases, displayMode = 'grid' }) {
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

  if (!isOpen) return null

  // Calculate positions based on display mode
  const getTransform = (index, total) => {
    if (displayMode === 'arc') {
      // Arc arrangement
      const angle = (Math.PI / (total + 1)) * (index + 1) - Math.PI / 2
      const radius = 200
      const x = Math.sin(angle) * radius
      const y = Math.cos(angle) * radius * 0.3
      const rotation = (angle * 180) / Math.PI + 90
      return `translate(${x}px, ${y}px) rotate(${rotation}deg)`
    } else {
      // Horizontal arrangement
      const spacing = 60
      const totalWidth = (total - 1) * spacing
      const x = index * spacing - totalWidth / 2
      return `translateX(${x}px)`
    }
  }

  return (
    <div className="cd-case-overlay" onClick={onClose}>
      <div className="cd-case-container" onClick={(e) => e.stopPropagation()}>
        <button className="cd-case-close" onClick={onClose}>×</button>

        <h2 className="cd-case-title">📀 Special Gifts 🎁</h2>

        <div className={`cd-case-display ${displayMode}`}>
          {cdCases.map((cdCase, index) => (
            <div
              key={cdCase.id}
              className="cd-case-item"
              style={displayMode === 'grid' ? {} : { transform: getTransform(index, cdCases.length) }}
            >
              <div className="cd-case-cover">
                <img
                  src={cdCase.image}
                  alt={`CD Case ${cdCase.id}`}
                  onError={(e) => {
                    // Fallback gradient if image doesn't exist
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = `linear-gradient(135deg,
                      hsl(${cdCase.id * 60}, 70%, 50%),
                      hsl(${cdCase.id * 60 + 40}, 70%, 60%))`
                  }}
                />
              </div>
              <div className="cd-case-label">Track {cdCase.id}</div>
            </div>
          ))}
        </div>

        <div className="cd-case-instructions">
          Click outside or press ESC to close
        </div>
      </div>
    </div>
  )
}

export default CDCaseDisplay
