interface AlbumArtProps {
  url?: string;
  alt: string;
}

export function AlbumArt({ url, alt }: AlbumArtProps) {
  if (!url) {
    return (
      <div className="aspect-square w-full max-w-[200px] border border-white/20 flex items-center justify-center bg-white/5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
          NO IMAGE
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-square w-full max-w-[200px] border border-white/20 overflow-hidden">
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}
