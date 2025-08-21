function TrackList({ tracks, currentIndex, onSelect }) {
  return (
    <section className="max-w-2xl mx-auto mt-2">
      <h2 className="text-lg font-semibold mb-4">Popular</h2>
      <ul className="space-y-3 list-none">
        {tracks.map((t, i) => {
          const isActive = i === currentIndex
          return (
            <li
              key={t.title + i}
              className={`flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer transition
                ${isActive ? 'bg-white/15' : 'bg-white/5 hover:bg-white/10'}`}
              onClick={() => onSelect(i)}
            >
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-gray-400">{t.artist}</p>
              </div>
              <div className="text-sm text-white/70">{isActive ? 'Now playing' : ''}</div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TrackList
