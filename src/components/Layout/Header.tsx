interface HeaderProps {
  stationName: string;
  tagline?: string;
  logoUrl?: string;
}

export function Header({ stationName, tagline, logoUrl }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={stationName}
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 3c1.93 0 3.5 1.57 3.5 3.5S13.93 14 12 14s-3.5-1.57-3.5-3.5S10.07 7 12 7zm7 13H5v-1.5c0-2.33 4.67-3.5 7-3.5s7 1.17 7 3.5V20z" />
          </svg>
        </div>
      )}
      <h1 className="text-2xl font-bold text-white">{stationName}</h1>
      {tagline && (
        <p className="text-white/60 text-sm mt-1">{tagline}</p>
      )}
    </header>
  );
}
