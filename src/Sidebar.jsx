import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const minWidth = 200;
  const maxWidth = 500;
  const defaultWidth = 350;

  const isResizing = useRef(false);
  const [width, setWidth] = useState(() => {
    // Cargar el ancho guardado en localStorage o usar valor por defecto
    const stored = localStorage.getItem("sidebar-width");
    return stored ? parseInt(stored, 10) : defaultWidth;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      setWidth((prev) => {
        const newWidth = Math.min(
          Math.max(prev + e.movementX, minWidth),
          maxWidth
        );
        localStorage.setItem("sidebar-width", newWidth);
        return newWidth;
      });
    };

    const stopResizing = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div style={{ width }} className="bg-zinc-900 text-white p-4 select-none">
        <p className="text-lg font-semibold">Menu</p>
      </div>

      {/* Handle */}
      <div
        onMouseDown={() => (isResizing.current = true)}
        className="w-1 bg-zinc-700 cursor-col-resize hover:bg-zinc-500 transition"
      />
    </div>
  );
}
