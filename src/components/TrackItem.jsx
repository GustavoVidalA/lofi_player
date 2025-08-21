// src/components/TrackItem.jsx
function TrackItem({ title, artist }) {
  return (
    <li className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
      <div className="flex gap-2">
        <button className="hover:text-purple-400 transition">♥</button>
        <button className="hover:text-purple-400 transition">⋮</button>
      </div>
    </li>
  )
}

export default TrackItem
