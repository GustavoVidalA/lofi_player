import { useEffect, useRef, useState } from "react";

export default function Sidebar({ artist, bio }) {
  const minWidth = 220;
  const maxWidth = 460;
  const defaultWidth = 320;

  const isResizing = useRef(false);
  const [width, setWidth] = useState(() => {
    const stored = localStorage.getItem("sidebar-width");
    return stored ? parseInt(stored, 10) : defaultWidth;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      setWidth((prev) => {
        const next = Math.min(Math.max(prev + e.movementX, minWidth), maxWidth);
        localStorage.setItem("sidebar-width", next);
        return next;
      });
    };
    const stopResizing = () => (isResizing.current = false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <div className="flex h-full">
      {/* Panel */}
      <aside
        style={{ width }}
        className="bg-zinc-900 text-zinc-100 p-4 select-none border-r border-zinc-800 flex flex-col"
      >
        <h2 className="text-lg font-semibold mb-1">Historia</h2>

        {/* Sección: Band / Artist Info */}
        <div className="mt-4">
          <h3 className="text-sm uppercase tracking-wide text-zinc-400">Band Info</h3>
          <h4 className="text-xl font-bold mt-1">{artist || "Unknown Artist"}</h4>

          <div className="mt-3 text-sm text-zinc-300 leading-relaxed pr-1 overflow-y-auto"
               style={{ maxHeight: "calc(100vh - 180px)" }}>
            {bio || "No bio available for this artist yet."}
          </div>
        </div>
      </aside>

      {/* Handle de resize */}
      <div
        onMouseDown={() => (isResizing.current = true)}
        className="w-1 bg-zinc-700 cursor-col-resize hover:bg-zinc-400 transition"
        title="Resize"
      />
    </div>
  );
}
