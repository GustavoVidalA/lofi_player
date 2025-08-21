import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'

function PlayerControls({ isPlaying, onToggle, onNext, onPrev }) {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      <button
        className="text-xl text-white/80 hover:text-white transition"
        onClick={onPrev}
        aria-label="Previous"
      >
        <FaBackward />
      </button>

      <button
        onClick={onToggle}
        className="bg-purple-500 w-14 h-14 rounded-full text-white text-2xl flex items-center justify-center hover:scale-105 transition"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button
        className="text-xl text-white/80 hover:text-white transition"
        onClick={onNext}
        aria-label="Next"
      >
        <FaForward />
      </button>
    </div>
  )
}

export default PlayerControls
