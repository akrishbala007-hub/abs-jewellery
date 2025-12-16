"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We would love to hear from you. Visit our store or reach out to us for custom orders.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <MapPin size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Visit Us</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        ABSJewellery<br />
                                        94, Bharathipuram Near Cottolengo Convent 2nd Gate,<br />
                                        Sowripalayam<br />
                                        Coimbatore - 641028<br />
                                        Tamil Nadu, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <Phone size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Call Us</h3>
                                    <p className="text-gray-300 text-lg">
                                        <a href="tel:9597016643" className="hover:text-primary transition-colors">
                                            +91 95970 16643
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <Clock size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Opening Hours</h3>
                                    <p className="text-gray-300 text-lg">
                                        Monday - Saturday<br />
                                        9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <Mail size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">Email Us</h3>
                                    <p className="text-gray-300 text-lg">
                                        contact@absjewellery.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="h-[500px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.275033877053!2d77.00067307584108!3d10.998492254714478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859a6c7155555%3A0x0!2zMTDCsDU5JzU0LjYiTiA3N8KwMDAnMDkuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
