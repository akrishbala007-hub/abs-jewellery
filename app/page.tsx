"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroImageSlider from '@/components/HeroImageSlider';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden pt-20 pb-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 via-black to-black z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Text Content */}
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight">
                TIMELESS <br />
                <span className="text-primary italic">ELEGANCE</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-lg font-light leading-relaxed"
            >
              "Every piece is crafted with love, precision, and a touch of magic."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300 rounded-sm"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* GSAP Image Slider */}
          <div className="relative flex justify-center lg:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-lg"
            >
              <HeroImageSlider />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Invisible Chain Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Invisible <span className="text-primary">Chain</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p><strong className="text-white block mb-2">✨ What it is:</strong> A delicate, premium chain designed to look almost invisible on the skin, giving the pendant or charm the spotlight.</p>
              <p><strong className="text-white block mb-2">👗 Style advantage:</strong> Perfect for minimalists who love subtle elegance. It blends seamlessly with any outfit, from casual wear to party attire.</p>
              <p><strong className="text-white block mb-2">☁️ Comfort:</strong> Lightweight and smooth, making it ideal for all‑day wear without irritation.</p>
              <p><strong className="text-white block mb-2">🛡️ Durability:</strong> Crafted with strong yet fine material, ensuring long‑lasting use while maintaining its delicate look.</p>
            </div>
          </div>
          <div className="order-1 md:order-2 h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img src="/invisible_chain.png" alt="Invisible Chain" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Earrings Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img src="/premium_earrings.png" alt="Premium Earrings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Earrings <span className="text-primary">& Studs</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p><strong className="text-white block mb-2">🌸 What they are:</strong> Handmade premium studs and earrings designed with precision, offering both traditional charm and modern appeal.</p>
              <p><strong className="text-white block mb-2">👗 Style advantage:</strong> Versatile pieces that complement both ethnic and western outfits.</p>
              <p><strong className="text-white block mb-2">☁️ Comfort:</strong> Easy to wear, non‑bulky, and suitable for sensitive ears.</p>
              <p><strong className="text-white block mb-2">🎨 Craftsmanship:</strong> Each piece is carefully handcrafted, ensuring uniqueness and premium finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/gift_packaging.png')] bg-cover opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">WHY CHOOSE US?</h2>
            <div className="w-32 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Elegant Look", desc: "Enhances beauty with a subtle yet classy appearance." },
              { title: "Handmade Quality", desc: "Every piece is crafted with care, unique vs mass-produced." },
              { title: "Customer Trust", desc: "Loved by 500+ satisfied customers with excellent feedback." },
              { title: "Affordable Luxury", desc: "Premium feel without the heavy price tag." },
              { title: "Perfect Gift", desc: "Ideal for birthdays, anniversaries, or special occasions." },
              { title: "Durability & Comfort", desc: "Designed for everyday wear while maintaining elegance." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/50 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 rounded-xl">
                <h3 className="text-xl text-primary font-serif font-bold mb-3">💎 {item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Slogan */}
      <section className="py-20 bg-primary text-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">"Crafted with love, worn with pride."</h2>
          <p className="text-xl md:text-2xl font-light tracking-widest opacity-80 uppercase">- Sofiya Joice Collections</p>
        </div>
      </section>

      {/* Meet the Founder Parallax Preview */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/sofiya/img3.jpg" className="w-full h-full object-cover opacity-30 blur-sm scale-110" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center max-w-2xl px-6">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Meet The Visionary</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            "I believe in creating jewelry that tells a story—your story. Every piece is crafted with love, precision, and a touch of magic."
          </p>
          <p className="text-primary font-bold text-xl mb-10">- Sofiya Joice</p>
          <Link
            href="/about"
            className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Read Her Story
          </Link>
        </div>
      </section>
    </div>
  );
}
