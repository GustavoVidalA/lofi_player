import { useEffect, useRef, useState } from 'react'
import './index.css'
import Header from './components/Header'
import TrackList from './components/TrackList'
import PlayerControls from './components/PlayerControls'
import { tracks } from './data/tracks'


function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const currentTrack = tracks[currentIndex]

  const play = () => {
    if (!audioRef.current) return
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const toggle = () => (isPlaying ? pause() : play())

  const next = () => {
    setCurrentIndex((i) => (i + 1) % tracks.length)
  }

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length)
  }

  const selectTrack = (index) => {
    setCurrentIndex(index)
  }

  // When track changes, load new src and optionally auto-play if was playing
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.load()
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans flex items-start justify-center px-4 py-8">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onEnded={next}
      />

      <div className="w-full max-w-4xl">
        <Header
          // 👇 Use the CURRENT SONG TITLE in the big heading
          title={currentTrack.title}
          // Show artist smaller (optional)
          artist={currentTrack.artist}
          cover={currentTrack.cover}
        />

        <PlayerControls
          isPlaying={isPlaying}
          onToggle={toggle}
          onNext={next}
          onPrev={prev}
        />

        <TrackList
          tracks={tracks}
          currentIndex={currentIndex}
          onSelect={selectTrack}
        />

        
      </div>
    </div>
  )

  
}

export default App
