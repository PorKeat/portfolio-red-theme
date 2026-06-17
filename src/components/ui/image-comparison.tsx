"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageSliderProps {
  children: React.ReactNode;
  className?: string;
  hoverControl?: boolean;
  defaultPosition?: number;
}

export const ImageSlider = ({ children, className = "", hoverControl = false, defaultPosition = 50 }: ImageSliderProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  const handleTouch = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  const events = hoverControl ? {
    onMouseMove: handleDrag,
    onTouchMove: handleTouch,
  } : {
    onMouseMove: (e: React.MouseEvent) => e.buttons === 1 && handleDrag(e),
    onMouseDown: handleDrag,
    onTouchMove: handleTouch,
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative select-none cursor-ew-resize touch-none ${className}`}
      {...events}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ position?: number }>, { position });
        }
        return child;
      })}
    </div>
  );
};

export const ImageLayer = ({ src, bgSrc, alt, layer, className = "", imageClassName = "", position = 50, dynamicBackground = false }: { src: string, bgSrc?: string, alt: string, layer: string, className?: string, imageClassName?: string, position?: number, dynamicBackground?: boolean }) => {
  const clipPath = layer === "first" 
    ? `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`
    : `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={{ clipPath }}>
      {bgSrc && (
        <div className="absolute inset-0 pointer-events-none">
          <Image src={bgSrc} alt={`${alt} background`} fill className="object-cover" />
          {dynamicBackground && (
            <div 
              className="absolute inset-0 transition-colors duration-500" 
              style={{ mixBlendMode: 'hue', backgroundColor: 'var(--theme-primary)' }} 
            />
          )}
        </div>
      )}
      {!bgSrc && dynamicBackground && (
        <div 
          className="absolute inset-0 pointer-events-none transition-colors duration-500" 
          style={{ backgroundColor: 'var(--theme-primary)' }}
        />
      )}
      <Image src={src} alt={alt} fill className={`object-cover pointer-events-none relative z-10 ${imageClassName}`} />
    </div>
  );
};

export const Divider = ({ width = 2, position = 50 }: { width?: number, position?: number }) => {
  return (
    <div 
      className="absolute top-0 bottom-0 bg-red-primary pointer-events-none flex items-center justify-center z-10" 
      style={{ left: `${position}%`, width: `${width}px`, transform: `translateX(-${width / 2}px)`, boxShadow: '0 0 15px color-mix(in srgb, var(--theme-primary) 80%, transparent)' }}
    >
      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-red-primary flex items-center justify-center" style={{ boxShadow: '0 0 15px color-mix(in srgb, var(--theme-primary) 80%, transparent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>
  );
};
