"use client";
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const images = [
    '/sofiya/img1.jpg',
    '/sofiya/img2.jpg',
    '/sofiya/img3.jpg',
    '/sofiya/img4.jpg',
];

export default function HeroImageSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Duplicate images for seamless loop
        const totalWidth = sliderRef.current!.scrollWidth / 2;

        gsap.to(sliderRef.current, {
            x: -totalWidth,
            duration: 20,
            ease: "none",
            repeat: -1,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full h-[600px] overflow-hidden rounded-2xl relative border border-white/10 shadow-2xl">
            <div
                ref={sliderRef}
                className="flex h-full w-max"
            >
                {/* Render images twice for seamless loop */}
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="h-full w-[400px] flex-shrink-0 px-2">
                        <img
                            src={src}
                            alt={`Slide ${i}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                ))}
            </div>

            {/* Overlay Gradient for cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 z-20">
                <p className="text-white font-serif text-2xl">Sofiya Joice</p>
                <p className="text-primary text-sm uppercase tracking-widest">Founder & Designer</p>
            </div>
        </div>
    );
}
