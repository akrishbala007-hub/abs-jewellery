"use client";
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
}

export default function ImageWithFallback({ src, alt, className, fallbackText, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`flex flex-col items-center justify-center bg-zinc-800 text-gray-500 ${className}`}>
                <ImageOff size={24} className="mb-2 opacity-50" />
                <span className="text-xs text-center px-2">{fallbackText || 'Invalid URL'}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
}
