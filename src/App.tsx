import { Player } from './components/Player';
import { NowPlaying } from './components/NowPlaying';
import { useNowPlaying } from './hooks/useNowPlaying';
import { useTheme } from './hooks/useTheme';

function App() {
  const { status, current_track, isLoading } = useNowPlaying();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-mono transition-colors duration-300 noise-overlay ${
      isDark
        ? 'bg-black text-white selection:bg-red-500 selection:text-black'
        : 'bg-white text-black selection:bg-red-500 selection:text-white'
    }`}>
      {/* Top bar */}
      <header className={`border-b p-4 flex justify-between items-center ${
        isDark ? 'border-white/20' : 'border-black/20'
      }`}>
        <span className={`text-xs tracking-widest uppercase ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          {status === 'online' ? (
            <><span className="inline-block animate-pulse text-red-500">●</span> EN VIVO</>
          ) : (
            '○ FUERA DE LÍNEA'
          )}
        </span>
        <button
          onClick={toggleTheme}
          className={`text-xs tracking-widest uppercase hover:text-red-500 transition-colors ${
            isDark ? 'text-white/50' : 'text-black/50'
          }`}
        >
          {isDark ? '◐ LUZ' : '◑ OSCURO'}
        </button>
      </header>

      {/* Main content */}
      <main className="p-4 md:p-8">
        {/* Giant title */}
        <div className="flex items-end justify-between">
          <h1 className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter uppercase">
            CHUNK
            <span className="text-red-500">ING</span>
          </h1>
          <img
            src="/frutilla.gif"
            alt="frutilla"
            className={`h-[18vw] md:h-[15vw] w-auto border-2 ${isDark ? 'border-white' : 'border-black'}`}
          />
        </div>

        {/* Subtitle line */}
        <div className={`flex items-center gap-4 mt-4 border-t pt-4 ${
          isDark ? 'border-white/20' : 'border-black/20'
        }`}>
          <span className={`text-xs tracking-[0.3em] uppercase ${isDark ? 'text-white/50' : 'text-black/50'}`}>
            Radio por Internet
          </span>
          <div className={`flex-1 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
          <span className={`text-xs tracking-widest uppercase ${isDark ? 'text-white/50' : 'text-black/50'}`}>
            24/7
          </span>
        </div>

        {/* Two column layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left: Now playing */}
          <div className={`border p-6 relative ${isDark ? 'border-white/20' : 'border-black/20'}`}>
            {/* Corner brackets */}
            <span className={`absolute top-0 left-0 text-lg ${isDark ? 'text-white/40' : 'text-black/40'}`}>[</span>
            <span className={`absolute top-0 right-0 text-lg ${isDark ? 'text-white/40' : 'text-black/40'}`}>]</span>
            <span className={`absolute bottom-0 left-0 text-lg ${isDark ? 'text-white/40' : 'text-black/40'}`}>[</span>
            <span className={`absolute bottom-0 right-0 text-lg ${isDark ? 'text-white/40' : 'text-black/40'}`}>]</span>

            <span className="text-[10px] tracking-[0.3em] uppercase text-red-500 block mb-6">
              ESCUCHANDO
            </span>
            <NowPlaying track={current_track} isLoading={isLoading} theme={theme} />
          </div>

          {/* Right: Player controls */}
          <div className="flex flex-col justify-between">
            <div>
              <span className={`text-[10px] tracking-[0.3em] uppercase block mb-6 ${
                isDark ? 'text-white/50' : 'text-black/50'
              }`}>
                CONTROLES
              </span>
              <Player stationStatus={status} theme={theme} />
            </div>

            {/* Info block */}
            <div className={`mt-12 pt-6 border-t ${isDark ? 'border-white/20' : 'border-black/20'}`}>
              <p className={`text-xs leading-relaxed max-w-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                Chunking—el proceso de dividir información en fragmentos más
                pequeños y digeribles. Como los pensamientos. Como la música.
              </p>
              <p className={`text-[10px] tracking-[0.2em] uppercase mt-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                Creado desde Turdera ↔ Salta
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 border-t p-4 ${
        isDark ? 'border-white/20 bg-black' : 'border-black/20 bg-white'
      }`}>
        <div className={`flex justify-between items-center text-[10px] tracking-widest uppercase ${
          isDark ? 'text-white/30' : 'text-black/30'
        }`}>
          <span>EST. 2026</span>
          <span className="text-red-500/50">■</span>
          <span>TRANSMISIÓN</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
