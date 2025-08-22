import { FaPlay } from 'react-icons/fa'
import FollowButton from './FollowButton'

function Header({ title, artist, cover }) {
  return (
    <header className="flex items-center gap-8 bg-gradient-to-r from-purple-600 to-purple-900 text-white rounded-xl p-6 sm:p-10 mb-10">
      <img
        src={cover}
        alt={title}
        className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-xl"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
        <p className="text-sm text-gray-300">{artist}</p>
        <p className="text-xs text-white/70">661,250 monthly listeners</p>
        <div className="flex items-center gap-4 mt-4">
          <FollowButton />
          <button
            className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
            aria-label="Play"
          >
            <FaPlay />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

