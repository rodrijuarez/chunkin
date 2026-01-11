interface AlbumArtProps {
  url?: string;
  alt: string;
}

export function AlbumArt({ url, alt }: AlbumArtProps) {
  if (!url) {
    return (
      <div className="w-32 h-32 border border-white/10 flex items-center justify-center">
        <div className="w-8 h-8 border border-white/20 rotate-45" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className="w-32 h-32 object-cover grayscale opacity-80"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
