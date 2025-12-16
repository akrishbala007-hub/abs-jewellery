"use client";
import React, { useState } from 'react';
import { createProduct } from '@/lib/actions';
import { motion } from 'framer-motion';

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const result = await createProduct(formData);

        if (result.success) {
            setMessage('Product created successfully!');
            (event.target as HTMLFormElement).reset();
        } else {
            setMessage(`Error: ${result.error}`);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-lg border border-white/10">
                <h1 className="text-3xl font-serif text-primary mb-8 text-center">Admin Panel</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Product Title</label>
                        <input
                            name="title"
                            required
                            className="w-full bg-zinc-800 border-none rounded p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. Diamond Necklace"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                        <input
                            name="price"
                            required
                            className="w-full bg-zinc-800 border-none rounded p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. ₹50,000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                        <input
                            name="image_url"
                            required
                            className="w-full bg-zinc-800 border-none rounded p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload image to Supabase Storage and paste URL here.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="w-full bg-zinc-800 border-none rounded p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Product details..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>

                    {message && (
                        <p className={`text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
