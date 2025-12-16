import React from 'react';
import { getProducts } from '@/lib/actions';
// import Image from 'next/image'; 

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 text-center">Our Collection</h1>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found. Please add some via the Admin Panel.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product: any) => (
                        <div key={product.id} className="bg-zinc-900 border border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                            <div className="aspect-square relative overflow-hidden bg-zinc-800">
                                <img
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
                                <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
