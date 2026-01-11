import { Player } from './components/Player';
import { NowPlaying } from './components/NowPlaying';
import { useNowPlaying } from './hooks/useNowPlaying';

function App() {
  const { status, current_track, isLoading } = useNowPlaying();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-black font-mono">
      {/* Top bar */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center">
        <span className="text-xs tracking-widest uppercase text-white/50">
          {status === 'online' ? '● EN VIVO' : '○ FUERA DE LÍNEA'}
        </span>
        <span className="text-xs tracking-widest uppercase text-white/50">
          RADIO
        </span>
      </header>

      {/* Main content */}
      <main className="p-4 md:p-8">
        {/* Giant title */}
        <h1 className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter uppercase">
          CHUNK
          <span className="text-red-500">ING</span>
        </h1>

        {/* Subtitle line */}
        <div className="flex items-center gap-4 mt-4 border-t border-white/20 pt-4">
          <span className="text-xs tracking-[0.3em] uppercase text-white/50">
            Radio por Internet
          </span>
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-xs tracking-widest uppercase text-white/50">
            24/7
          </span>
        </div>

        {/* Two column layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left: Now playing */}
          <div className="border border-white/20 p-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-red-500 block mb-6">
              ESCUCHANDO
            </span>
            <NowPlaying track={current_track} isLoading={isLoading} />
          </div>

          {/* Right: Player controls */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 block mb-6">
                CONTROLES
              </span>
              <Player stationStatus={status} />
            </div>

            {/* Info block */}
            <div className="mt-12 pt-6 border-t border-white/20">
              <p className="text-xs leading-relaxed text-white/40 max-w-xs">
                Chunking—el proceso de dividir información en fragmentos más
                pequeños y digeribles. Como los pensamientos. Como la música.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/20 p-4 bg-black">
        <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-white/30">
          <span>EST. 2025</span>
          <span className="text-red-500/50">■</span>
          <span>TRANSMISIÓN</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
