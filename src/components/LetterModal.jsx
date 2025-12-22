import { useEffect, useRef } from 'react'
import './LetterModal.css'

function LetterModal({ letter, onClose }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Reset scroll position when a new letter opens so it doesn't jump
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [letter])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="letter-envelope">
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="letter-paper">
              <div className="letter-content-scroll" ref={scrollRef} tabIndex={0}>
                <h2 className="letter-title">{letter.title}</h2>
                <div className="letter-text">
                  {letter.content}
                </div>
              </div>
              <div className="letter-signature">
                <p>🎄 Merry Christmas 🎄</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetterModal
