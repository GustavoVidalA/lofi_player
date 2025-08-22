import TrackItem from './TrackItem'

function TrackList({ tracks, currentIndex, onSelect, onLike }) {
  return (
    <section className="max-w-2xl mx-auto mt-2">
      <h2 className="text-lg font-semibold mb-4">Popular</h2>
      <ul className="space-y-3 list-none">
        {tracks.map((t, i) => (
          <TrackItem
            key={t.title + i}
            index={i + 1}
            title={t.title}
            artist={t.artist}
            cover={t.cover}
            isActive={i === currentIndex}
            onSelect={() => onSelect(i)}
            onLike={() => onLike && onLike(i)}
          />
        ))}
      </ul>
    </section>
  )
}

export default TrackList
