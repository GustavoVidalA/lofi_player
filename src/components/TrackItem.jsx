// src/components/TrackItem.jsx

function TrackItem({
  index,
  title,
  artist,
  cover,
  isActive,
  onSelect,
  onLike,
}) {
  return (
    <li
      className={`flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer transition ${
        isActive ? 'bg-white/15' : 'bg-white/5 hover:bg-white/10'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <span className="w-5 text-sm text-gray-400">{index}</span>
        {cover && (
          <img
            src={cover}
            alt={`${title} cover`}
            className="w-8 h-8 object-cover rounded-md"
          />
        )}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-400">{artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isActive && (
          <span className="text-sm text-white/70 mr-2">Now playing</span>
        )}
        <button
          className="hover:text-purple-400 transition"
          onClick={(e) => {
            e.stopPropagation()
            onLike && onLike()
          }}
        >
          ♥
        </button>
        <button
          className="hover:text-purple-400 transition"
          onClick={(e) => e.stopPropagation()}
        >
          ⋮
        </button>
      </div>
    </li>
  )
}

export default TrackItem
