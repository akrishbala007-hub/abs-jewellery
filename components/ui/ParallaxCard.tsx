"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxCardProps {
    imageSrc: string;
    title: string;
    subtitle?: string;
    content: string[];
    isReversed?: boolean; // Text on left or right
}

export default function ParallaxCard({ imageSrc, title, subtitle, content, isReversed = false }: ParallaxCardProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
            <div className={`max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}>

                {/* Image Side */}
                <div className="w-full md:w-1/2 relative h-[600px] overflow-hidden rounded-2xl">
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 w-full h-[120%] -top-[10%]"
                    >
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Text Side */}
                <motion.div
                    style={{ opacity }}
                    className="w-full md:w-1/2 space-y-6"
                >
                    {subtitle && <h3 className="text-primary tracking-widest uppercase text-sm font-bold">{subtitle}</h3>}
                    <h2 className="text-4xl md:text-5xl font-serif text-white">{title}</h2>
                    <div className="h-1 w-20 bg-primary/50" />
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                        {content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
