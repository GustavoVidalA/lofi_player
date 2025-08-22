import { useRef, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";


const tracks = [
  {
    id: 1,
    title: "Lofi Rain",
    artist: "Yarin",
    src: "/tracks/lofi-rain.mp3",
    cover: "/covers/yarin.png",
  },
  {
    id: 2,
    title: "Captured",
    artist: "feinsmecker",
    src: "/tracks/Captured.mp3",
    cover: "/covers/captured.png",
  },
  {
    id: 3,
    title: "Colors",
    artist: "Black Pumas",
    src: "/tracks/Colors.mp3",
    cover: "/covers/colors.png",
  },
];

export default function App() {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(tracks[0]);   // pista actual
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);        // 0..100
  const [duration, setDuration] = useState(0);        // seg
  const [currentTime, setCurrentTime] = useState(0);  // seg

  // Reproducir/pausar
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Al cambiar de pista: cargar y reproducir
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = current.src;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [current]);

  // Listeners de progreso y duración
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime || 0);
      setProgress(((audio.currentTime || 0) / (audio.duration || 1)) * 100);
    };
    const onLoaded = () => {
      setDuration(audio.duration || 0);
    };
    const onEnded = () => {
      // siguiente pista simple (loop)
      const idx = tracks.findIndex(t => t.id === current.id);
      const next = tracks[(idx + 1) % tracks.length];
      setCurrent(next);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [current]);

  // Click en barra de progreso para “scrub”
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * (audio.duration || 0);
  };

  const fmt = (s) => {
    if (!isFinite(s)) return "--:--";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
    };

  return (
    <div className="w-full h-screen grid grid-cols-[min-content_auto] grid-rows-[1fr_auto] bg-black text-white font-sans">
      {/* Sidebar redimensionable */}
      <Sidebar />

      {/* Main content */}
      <main className="bg-gradient-to-b from-neutral-900 to-black p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">Bienvenido a tu musica</h1>
        <p className="text-zinc-400">Explora playlists, artistas, y albums aqui.</p>

        <div className="grid gap-6 mt-6 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrent(t)}
              className="text-left bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-700 mb-3">
                {/* imagen de portada */}
                <img
                  src={t.cover}
                  alt={t.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs text-zinc-400">{t.artist}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Audio oculto */}
      <audio ref={audioRef} preload="metadata" />

      {/* Player */}
      <footer className="col-span-2 bg-zinc-950 border-t border-zinc-800 h-20 flex items-center justify-between px-6">
        {/* info canción */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-zinc-700 rounded overflow-hidden">
            <img
              src={current.cover}
              alt={current.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{current.title}</p>
            <p className="text-xs text-zinc-400 truncate">{current.artist}</p>
          </div>
        </div>

        {/* controles */}
<div className="flex items-center gap-6">
  <button
    className="hover:text-green-400"
    onClick={() => {
      const idx = tracks.findIndex(t => t.id === current.id);
      const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
      setCurrent(prev);
    }}
    aria-label="Previous"
  >
    <SkipBack size={24} />
  </button>

  <button
    onClick={togglePlay}
    className="hover:text-green-400 p-2 rounded-full border border-zinc-700 hover:border-green-400 transition"
    aria-label={isPlaying ? "Pause" : "Play"}
  >
    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
  </button>

  <button
    className="hover:text-green-400"
    onClick={() => {
      const idx = tracks.findIndex(t => t.id === current.id);
      const next = tracks[(idx + 1) % tracks.length];
      setCurrent(next);
    }}
    aria-label="Next"
  >
    <SkipForward size={24} />
  </button>
</div>


        {/* progreso */}
        <div className="flex items-center gap-3 w-64">
          <span className="text-xs text-zinc-400 w-10 text-right">{fmt(currentTime)}</span>
          <div
            className="h-2 bg-zinc-800 rounded-full overflow-hidden flex-1 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-green-500 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 w-10">{fmt(duration)}</span>
        </div>
      </footer>
    </div>
  );
}