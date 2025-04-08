import React, { useRef, useEffect, useState } from 'react';
import { getImageUrl } from '../utils/cdn';

interface CDNImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const CDNImage: React.FC<CDNImageProps> = ({ src, alt, width, height, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const baseUrl = getImageUrl(src);
  const webpUrl = baseUrl.replace(/\.(jpg|jpeg|png)$/, '.webp');

  return (
    <picture ref={ref as any}>
      <source
        srcSet={isVisible ? `${webpUrl} 1x, ${webpUrl.replace('.', '@2x.')} 2x` : undefined}
        type="image/webp"
      />
      <source
        srcSet={isVisible ? `${baseUrl} 1x, ${baseUrl.replace('.', '@2x.')} 2x` : undefined}
        type="image/jpeg"
      />
      <img
        src={isVisible ? baseUrl : undefined}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
      />
    </picture>
  );
};

export default CDNImage;