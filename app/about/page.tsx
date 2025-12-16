"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ParallaxCard from '@/components/ui/ParallaxCard';

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/sofiya/img2.jpg')] bg-cover bg-center opacity-40 fixed top-0 w-full h-full -z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-8xl font-serif font-bold text-white mb-6"
                    >
                        Sofiya Joice
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-primary font-light tracking-wide"
                    >
                        Resilience. Discipline. Compassion.
                    </motion.p>
                </div>
            </section>

            {/* Content Cards */}
            <div className="bg-black relative z-20 pb-20">

                <ParallaxCard
                    imageSrc="/sofiya/img2.jpg"
                    title="Professional Background"
                    subtitle="A JOURNEY OF EXCELLENCE"
                    content={[
                        "Hailing from Coimbatore, Tamil Nadu, Sofiya holds a Bachelor’s degree in Economics (B.A.) and has built a formidable career in the IT sector.",
                        "Through sheer hard work and dedication, she rose to the position of Group Lead in a top IT company, demonstrating exceptional leadership and technical acumen."
                    ]}
                />

                <ParallaxCard
                    imageSrc="/sofiya/img1.jpg"
                    title="Personal Journey"
                    subtitle="MOTHERHOOD & BALANCE"
                    isReversed
                    content={[
                        "Sofiya is the proud mother of Adelyn, her 18‑month‑old daughter. She balances her demanding professional responsibilities with motherhood gracefully.",
                        "Her life embodies resilience, discipline, and compassion, serving as an inspiration for women striving to excel in both their personal and professional spheres."
                    ]}
                />

                <ParallaxCard
                    imageSrc="/sofiya/img3.jpg"
                    title="Entrepreneurial Venture"
                    subtitle="FOUNDER OF ABS JEWELLERY"
                    content={[
                        "Driven by creativity, Sofiya founded a new business specializing in handmade premium jewelry. Her collection includes exquisite invisible chains, bangles, and studs.",
                        "She has achieved remarkable success with over 500 satisfied customers, earning excellent feedback for the quality, craftsmanship, and uniqueness of her products."
                    ]}
                />

                <ParallaxCard
                    imageSrc="/sofiya/img4.jpg"
                    title="Our Vision"
                    subtitle="ELEGANCE WITH AUTHENTICITY"
                    isReversed
                    content={[
                        "Sofiya’s journey reflects her rare ability to harmonize career, family, and entrepreneurship.",
                        "With her dedication and creativity, she is shaping a brand that blends elegance with authenticity, aiming to make premium handmade jewelry accessible and cherished by all."
                    ]}
                />

            </div>
        </div>
    );
}
