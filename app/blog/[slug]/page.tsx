import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/actions';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getBlogBySlug(params.slug);
    if (!post) return { title: 'Post Not Found | ABS Jewellery' };

    return {
        title: `${post.title} | ABS Jewellery`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: Props) {
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="min-h-screen bg-black pt-32 pb-20">
            <article className="max-w-4xl mx-auto px-4">
                {/* Back to Blog */}
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                {/* Header Section */}
                <header className="space-y-8 mb-16">
                    <div className="flex items-center gap-6 text-xs text-primary uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={14} />
                            {post.author}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-400 italic font-light leading-relaxed border-l-2 border-primary/30 pl-6">
                        {post.excerpt}
                    </p>
                </header>

                {/* Featured Image */}
                <div className="aspect-video w-full rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-primary/5">
                    <ImageWithFallback
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-primary max-w-none">
                    <div
                        className="text-gray-300 leading-[1.8] text-lg space-y-8"
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                    />
                </div>

                {/* Footer / Share */}
                <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-gray-500 text-sm">
                        Thank you for reading the ABS Jewellery Journal.
                    </div>
                    <button className="flex items-center gap-2 text-white bg-zinc-900 border border-white/10 px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-all group">
                        <Share2 size={18} />
                        Share this Story
                    </button>
                </footer>
            </article>
        </main>
    );
}
