"use client";
import React, { useState, useEffect } from 'react';
import { createProduct, getProducts, deleteProduct, updateProduct } from '@/lib/actions';
import { supabase } from '@/lib/supabase';
import { Trash2, Lock, Plus, Pencil, X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Minimal security for demonstration
const ADMIN_PIN = "1234";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Form states
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Store the uploaded/existing URL

    useEffect(() => {
        if (isAuthenticated) {
            loadProducts();
        }
    }, [isAuthenticated]);

    async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
    }

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setIsAuthenticated(true);
        } else {
            alert("Invalid PIN");
        }
    }

    function startEdit(product: any) {
        setEditingProduct(product);
        setImageUrl(product.image_url); // Pre-fill existing image
        setMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        setEditingProduct(null);
        setImageUrl('');
        setMessage('');
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);
        setMessage('');

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setImageUrl(data.publicUrl);
        } catch (error: any) {
            setMessage(`Upload Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        // Ensure the correct image URL is sent
        formData.set('image_url', imageUrl);

        let result;
        if (editingProduct) {
            result = await updateProduct(editingProduct.id, formData);
        } else {
            result = await createProduct(formData);
        }

        if (result.success) {
            setMessage(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
            (event.target as HTMLFormElement).reset();
            setEditingProduct(null);
            setImageUrl('');
            loadProducts();
        } else {
            setMessage(`Error: ${result.error}`);
        }
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const result = await deleteProduct(id);
            if (result.success) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert(`Failed to delete: ${result.error}`);
            }
        } catch (err) {
            alert("An unexpected error occurred during delete.");
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <form onSubmit={handleLogin} className="w-full max-w-sm bg-zinc-900 p-8 rounded-xl border border-white/10 text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-serif text-white">Admin Access</h1>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-center text-white text-xl tracking-widest focus:border-primary outline-none transition-colors"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                        Unlock
                    </button>
                    <p className="text-gray-500 text-xs mt-4">Hint: Use 1234</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Add/Edit Product Form */}
                <div className="space-y-8">
                    <div className={`p-8 rounded-2xl border sticky top-24 transition-colors ${editingProduct ? 'bg-primary/10 border-primary' : 'bg-zinc-900/50 border-white/10'}`}>
                        <h2 className="text-2xl font-serif text-primary mb-6 flex items-center gap-2">
                            {editingProduct ? <Pencil size={24} /> : <Plus size={24} />}
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Product Title</label>
                                <input
                                    name="title"
                                    defaultValue={editingProduct?.title || ''}
                                    key={`title-${editingProduct?.id}`}
                                    required
                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    placeholder="e.g. Diamond Necklace"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                                    <input
                                        name="price"
                                        defaultValue={editingProduct?.price || ''}
                                        key={`price-${editingProduct?.id}`}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                        placeholder="₹50,000"
                                    />
                                </div>

                                {/* Image Upload Component */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Product Image</label>
                                    <div className="flex items-center gap-2">
                                        <label className="flex-1 cursor-pointer bg-black border border-white/10 hover:border-primary text-white rounded-lg p-3 flex items-center justify-center gap-2 transition-colors">
                                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                            <span className="text-sm truncate">{uploading ? 'Uploading...' : 'Choose File'}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                    <input type="hidden" name="image_url" value={imageUrl} />
                                </div>
                            </div>

                            {/* Image Preview */}
                            <AnimatePresence>
                                {imageUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative bg-black rounded-lg overflow-hidden border border-white/10 aspect-video flex items-center justify-center"
                                    >
                                        <img src={imageUrl} alt="Preview" className="h-full object-contain" />
                                        <div className="absolute top-2 right-2 bg-black/50 p-1 rounded backdrop-blur-sm text-xs text-white">Preview</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingProduct?.description || ''}
                                    key={`desc-${editingProduct?.id}`}
                                    rows={3}
                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    placeholder="Product details..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || uploading || !imageUrl}
                                    className="flex-1 bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                                </button>

                                {editingProduct && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="px-4 py-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                        title="Cancel Edit"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            {message && (
                                <p className={`text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-serif text-white mb-6">Existing Collection ({products.length})</h2>

                    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence mode='popLayout'>
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`flex gap-4 p-4 rounded-xl border transition-colors group relative ${editingProduct?.id === product.id ? 'bg-primary/5 border-primary' : 'bg-zinc-900 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                                        <ImageWithFallback
                                            src={product.image_url}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-white truncate">{product.title}</h3>
                                        <p className="text-primary text-sm mb-1">{product.price}</p>
                                        <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => startEdit(product)}
                                            className="text-gray-500 hover:text-primary transition-colors p-2"
                                            title="Edit Product"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {products.length === 0 && (
                            <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-xl">
                                <p>No products found in database.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
