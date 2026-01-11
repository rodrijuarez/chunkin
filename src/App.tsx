import { Player } from './components/Player';
import { NowPlaying } from './components/NowPlaying';
import { useNowPlaying } from './hooks/useNowPlaying';

function App() {
  const { status, current_track, isLoading } = useNowPlaying();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-white selection:text-black">
      <main className="w-full max-w-sm">
        {/* Esoteric symbol */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border border-white/20 rotate-45 flex items-center justify-center">
            <div className="w-8 h-8 border border-white/40 rotate-0" />
          </div>
        </div>

        {/* Station name */}
        <h1 className="text-center text-2xl tracking-[0.3em] uppercase font-light mb-12">
          chunking
        </h1>

        {/* Now playing */}
        <NowPlaying track={current_track} isLoading={isLoading} />

        {/* Player */}
        <div className="mt-12">
          <Player stationStatus={status} />
        </div>

        {/* Minimal footer */}
        <footer className="text-center mt-16 text-white/20 text-xs tracking-widest uppercase">
          <p>live radio</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
