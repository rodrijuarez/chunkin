interface AlbumArtProps {
  url?: string;
  alt: string;
  theme: 'light' | 'dark';
}

const DEFAULT_ARTWORK = '/default-artwork.jpg';

export function AlbumArt({ url, alt, theme }: AlbumArtProps) {
  const imageUrl = url || DEFAULT_ARTWORK;
  const isDark = theme === 'dark';

  return (
    <div className={`aspect-square w-full max-w-[200px] border overflow-hidden ${
      isDark ? 'border-white/20' : 'border-black/20'
    }`}>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_ARTWORK;
        }}
      />
    </div>
  );
}
