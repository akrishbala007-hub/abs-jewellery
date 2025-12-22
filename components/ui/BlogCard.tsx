"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface BlogCardProps {
    post: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        image_url: string;
        author: string;
        published_at: string;
    };
}

const BlogCard = ({ post }: BlogCardProps) => {
    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
        >
            <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/9] overflow-hidden relative">
                    <ImageWithFallback
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-primary" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <User size={14} className="text-primary" />
                            {post.author}
                        </span>
                    </div>

                    <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="pt-2 flex items-center text-primary text-sm font-medium tracking-wider uppercase gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={16} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default BlogCard;
