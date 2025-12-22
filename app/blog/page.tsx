import React from 'react';
import { Metadata } from 'next';
import { getBlogs } from '@/lib/actions';
import BlogCard from '@/components/ui/BlogCard';

export const metadata: Metadata = {
    title: 'Blog | ABS Jewellery - Collection Stories & Tips',
    description: 'Explore the latest stories, craftsmanship insights, and jewellery care tips from ABS Jewellery.',
};

export default async function BlogPage() {
    const posts = await getBlogs();

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                        Our <span className="text-primary italic">Journal</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Discover the stories behind our collections, craftsmanship secrets, and the art of fine jewellery.
                    </p>
                    <div className="w-24 h-px bg-primary/50 mx-auto mt-8" />
                </div>

                {/* Blog Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
                        <p className="text-gray-500 text-xl font-serif">Our journal is being prepared.</p>
                        <p className="text-gray-600 mt-2 text-sm">Check back soon for inspiring stories.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
