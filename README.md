Lofi Player — React + Vite + Tailwind

A minimal Spotify-like music UI built with React (Vite), Tailwind CSS, and lucide-react.
It features a resizable sidebar with persisted width, an auto-resizing playlists grid, and a real audio player (play/pause, previous/next, seek/progress).

Demo (Vercel): add your deployment URL here

✨ Features

Resizable sidebar (drag handle) with min/max limits and persistent width via localStorage.

Auto-resizing grid for playlists using CSS Grid: repeat(auto-fill, minmax(...)).

Audio player with:

Play/Pause, Previous/Next

Progress bar with click-to-seek

Current time / duration

Cards with cover images; click a card to play that track.

Tailwind CSS styling + lucide-react icons.

Prettier for consistent formatting.

Codebase in English.

🧰 Tech Stack

React 18 + Vite

Tailwind CSS

lucide-react (icons)

Prettier

📁 Project Structure
.
├─ public/
│  ├─ tracks/           # MP3 files
│  │   ├─ Colors.mp3
│  │   ├─ Captured.mp3
│  │   └─ lo-fi-rain.mp3
│  └─ covers/           # Cover images
│      ├─ colors.png
│      ├─ captured.png
│      └─ yarin.png
├─ src/
│  ├─ data/
│  │   └─ bandBios.js
│  ├─ App.jsx
│  ├─ Sidebar.jsx
│  ├─ main.jsx
│  ├─ index.css
│  └─ ... (assets/components if needed)
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ README.md


Important: Audio and image assets must live under /public (e.g., /public/tracks/..., /public/covers/...) so they can be served by Vite/Vercel at /tracks/... and /covers/....

🚀 Getting Started
Prerequisites

Node.js v18+ (v20 recommended)

npm 8+

Install & Run
# install deps
npm install

# start dev server (http://localhost:5173)
npm run dev

Build
npm run build
npm run preview

🎛️ Configuration
Tailwind

tailwind.config.js should include:

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};


src/index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

html { color-scheme: dark; }

Prettier

Add a .prettierrc.json (already recommended for this project):

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}


Optional .prettierignore:

node_modules
dist


Format your code:

npm run format
# or
npx prettier --write .


VSCode settings (optional):

{
  "editor.formatOnSave": true,
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}

🧩 Using Your Own Tracks

Update the tracks array in src/App.jsx to match your files:

const tracks = [
  {
    id: 1,
    title: "Lofi Rain",
    artist: "Yarin",
    src: "/tracks/lofi-rain.mp3",
    cover: "/covers/yarin.png",
  },
  // ...
];


Place the corresponding files under:

/public/tracks/*.mp3

/public/covers/*.(png|jpg|jpeg|webp)

☁️ Deploy to Vercel

Push your repo to GitHub.

Go to https://vercel.com
 → New Project → Import your repo.

Vercel auto-detects Vite:

Build Command: vite build (default: npm run build)

Output dir: dist

Deploy. Copy the URL to the top of this README.

If you use environment variables later, add them in Vercel → Project → Settings → Environment Variables.

🧠 Sidebar Band Info

Band bios are defined in src/data/bandBios.js and displayed in the sidebar based on the current track’s artist.
Edit or add new entries as needed:

export const bandBios = {
  "Black Pumas": "…",
  "Yarin": "…",
  "feinsmecker": "…"
};

🛠️ Scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "format": "prettier --write ."
  }
}

🧪 Troubleshooting

Tailwind styles don’t apply

Ensure content in tailwind.config.js includes "./index.html" and "./src/**/*.{js,ts,jsx,tsx}".

Restart dev server. If needed, delete Vite cache: rm -rf node_modules/.vite.

Assets 404

Files must be under /public. Use paths like /tracks/name.mp3.

Audio doesn’t play automatically

Most browsers block autoplay with sound. Click the play button once to grant audio permission.

Import path case mismatch

On case-sensitive systems (Linux/CI), Sidebar.jsx ≠ sidebar.jsx. Fix the filename and imports.

🗺️ Roadmap / Ideas

Volume control & mute

Draggable progress thumb

Global state (Context/Zustand) for player

Keyboard shortcuts

Playlist details route (React Router)

Persist last played track

Basic tests (Vitest/RTL)
