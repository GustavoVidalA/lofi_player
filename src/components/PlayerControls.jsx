import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'

export function PrevButton({ onPrev }) {
  return (
    <button
      className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
      onClick={onPrev}
      aria-label="Previous"
    >
      <FaBackward />
    </button>
  )
}

export function PlayPauseButton({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
  )
}

export function NextButton({ onNext }) {
  return (
    <button
      className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
      onClick={onNext}
      aria-label="Next"
    >
      <FaForward />
    </button>
  )
}
