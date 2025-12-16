import React from 'react';
import { getProducts } from '@/lib/actions';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
// import Image from 'next/image'; 

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Our Collection</h1>

            {products.length === 0 ? (
                <div className="text-center text-gray-500 space-y-2">
                    <p>No products found. Please add some via the Admin Panel.</p>
                    <div className="text-xs p-4 bg-zinc-900/50 rounded inline-block">
                        <p>Status Check:</p>
                        <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Connected' : '❌ Missing'}</p>
                        <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
                        <p>Timestamp: {new Date().toISOString()}</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product: any) => (
                        <div key={product.id} className="bg-zinc-900 border border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                            <div className="aspect-square relative overflow-hidden bg-zinc-800">
                                <ImageWithFallback
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl text-white font-serif">{product.title}</h2>
                                    <span className="text-primary font-bold">{product.price}</span>
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>

                                <a
                                    href={`https://wa.me/919597016643?text=Hello, I am interested in buying ${encodeURIComponent(product.title)} - ${encodeURIComponent(product.price)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Buy on WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
