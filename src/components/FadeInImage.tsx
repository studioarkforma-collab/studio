import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { MapPin } from 'lucide-react';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallbackTitle?: string;
}

export function FadeInImage({
  src,
  alt,
  className = '',
  style,
  fallbackTitle = 'Architectural Site Graphic'
}: FadeInImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setHasError(false);

    let rafId = 0;
    const img = imgRef.current;

    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        rafId = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      } else {
        setHasError(true);
      }
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [src]);

  const handleLoad = () => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E7E7E4] text-[#52524E] p-6 border border-[#D4D4D0] ${className}`}
        style={style}
      >
        <MapPin className="w-6 h-6 mb-2 text-[#262624]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide uppercase text-center">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onLoad={handleLoad}
      onError={() => setHasError(true)}
      style={{
        ...style,
        transition: 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`${className} ${
        isVisible ? 'opacity-100 translate-y-0 animate-image-fade-in' : 'opacity-0 translate-y-1'
      }`}
    />
  );
}
