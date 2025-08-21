function Header({ title, artist, cover }) {
  return (
    <header className="relative flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-purple-900 text-white rounded-xl p-6 sm:p-10 mb-10 text-center">
      <div className="flex flex-col items-center gap-6 w-full">
        <img
          src={cover}
          alt={title}
          className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-xl"
        />
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
          <p className="text-sm text-gray-300 mt-1">{artist}</p>
          <p className="text-xs text-white/70">661,250 monthly listeners</p>
        </div>
      </div>
    </header>
  )
}

export default Header