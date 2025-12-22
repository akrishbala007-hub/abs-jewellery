"use client";
import React, { useState, useEffect } from 'react';
import {
    createProduct, getProducts, deleteProduct, updateProduct,
    createBlog, getBlogs, deleteBlog, updateBlog
} from '@/lib/actions';
import { supabase } from '@/lib/supabase';
import { Trash2, Lock, Plus, Pencil, X, Upload, Loader2, Package, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Minimal security for demonstration
const ADMIN_PIN = "1234";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState<'products' | 'blogs'>('products');
    const [items, setItems] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Form states
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            loadItems();
        }
    }, [isAuthenticated, activeTab]);

    async function loadItems() {
        setItems([]);
        const data = activeTab === 'products' ? await getProducts() : await getBlogs();
        setItems(data);
    }

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setIsAuthenticated(true);
        } else {
            alert("Invalid PIN");
        }
    }

    function startEdit(item: any) {
        setEditingItem(item);
        setImageUrl(item.image_url);
        setMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        setEditingItem(null);
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

            if (uploadError) throw uploadError;

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
        formData.set('image_url', imageUrl);

        let result;
        if (activeTab === 'products') {
            result = editingItem
                ? await updateProduct(editingItem.id, formData)
                : await createProduct(formData);
        } else {
            result = editingItem
                ? await updateBlog(editingItem.id, formData)
                : await createBlog(formData);
        }

        if (result.success) {
            setMessage(`${activeTab === 'products' ? 'Product' : 'Blog'} ${editingItem ? 'updated' : 'created'} successfully!`);
            (event.target as HTMLFormElement).reset();
            setEditingItem(null);
            setImageUrl('');
            loadItems();
        } else {
            setMessage(`Error: ${result.error}`);
        }
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm(`Are you sure you want to delete this ${activeTab === 'products' ? 'product' : 'blog'}?`)) return;

        try {
            const result = activeTab === 'products' ? await deleteProduct(id) : await deleteBlog(id);
            if (result.success) {
                setItems(items.filter(i => i.id !== id));
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
                    <h1 className="text-2xl font-serif text-white">Admin Access <span className="text-xs text-green-500 font-sans tracking-normal ml-2">v2.1</span></h1>
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
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Tab Switcher */}
                <div className="flex justify-center">
                    <div className="bg-zinc-900 p-1 rounded-xl border border-white/10 flex gap-1">
                        <button
                            onClick={() => { setActiveTab('products'); cancelEdit(); }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${activeTab === 'products' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Package size={18} /> Products
                        </button>
                        <button
                            onClick={() => { setActiveTab('blogs'); cancelEdit(); }}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${activeTab === 'blogs' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                        >
                            <FileText size={18} /> Blogs
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Add/Edit Form */}
                    <div className="space-y-8">
                        <div className={`p-8 rounded-2xl border sticky top-24 transition-colors ${editingItem ? 'bg-primary/10 border-primary' : 'bg-zinc-900/50 border-white/10'}`}>
                            <h2 className="text-2xl font-serif text-primary mb-6 flex items-center gap-2">
                                {editingItem ? <Pencil size={24} /> : <Plus size={24} />}
                                {editingItem ? `Edit ${activeTab === 'products' ? 'Product' : 'Blog'}` : `Add New ${activeTab === 'products' ? 'Product' : 'Blog'}`}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                                    <input
                                        name="title"
                                        defaultValue={editingItem?.title || ''}
                                        key={`title-${editingItem?.id}-${activeTab}`}
                                        required
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                        placeholder={activeTab === 'products' ? "e.g. Diamond Necklace" : "e.g. How to Care for Gold"}
                                    />
                                </div>

                                {activeTab === 'blogs' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Slug (URL identifier)</label>
                                        <input
                                            name="slug"
                                            defaultValue={editingItem?.slug || ''}
                                            key={`slug-${editingItem?.id}`}
                                            required
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                            placeholder="how-to-care-for-gold"
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    {activeTab === 'products' ? (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                                            <input
                                                name="price"
                                                defaultValue={editingItem?.price || ''}
                                                key={`price-${editingItem?.id}`}
                                                required
                                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                                placeholder="₹50,000"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
                                            <input
                                                name="author"
                                                defaultValue={editingItem?.author || 'ABS Jewellery'}
                                                key={`author-${editingItem?.id}`}
                                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Image</label>
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

                                {activeTab === 'blogs' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt (Short Summary)</label>
                                        <textarea
                                            name="excerpt"
                                            defaultValue={editingItem?.excerpt || ''}
                                            key={`excerpt-${editingItem?.id}`}
                                            rows={2}
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                            placeholder="A short introduction..."
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{activeTab === 'products' ? 'Description' : 'Full Content'}</label>
                                    <textarea
                                        name={activeTab === 'products' ? "description" : "content"}
                                        defaultValue={(activeTab === 'products' ? editingItem?.description : editingItem?.content) || ''}
                                        key={`content-${editingItem?.id}-${activeTab}`}
                                        rows={activeTab === 'products' ? 3 : 8}
                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                        placeholder={activeTab === 'products' ? "Product details..." : "Markdown or plain text content..."}
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading || uploading || !imageUrl}
                                        className="flex-1 bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Saving...' : (editingItem ? `Update ${activeTab === 'products' ? 'Product' : 'Blog'}` : `Add ${activeTab === 'products' ? 'Product' : 'Blog'}`)}
                                    </button>

                                    {editingItem && (
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

                    {/* List View */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-white mb-6">
                            Existing {activeTab === 'products' ? 'Collection' : 'Blogs'} ({items.length})
                        </h2>

                        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence mode='popLayout'>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`flex gap-4 p-4 rounded-xl border transition-colors group relative ${editingItem?.id === item.id ? 'bg-primary/5 border-primary' : 'bg-zinc-900 border-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                                            <ImageWithFallback
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg text-white truncate">{item.title}</h3>
                                            <p className="text-primary text-sm mb-1">{activeTab === 'products' ? item.price : item.author}</p>
                                            <p className="text-gray-500 text-xs line-clamp-2">
                                                {activeTab === 'products' ? item.description : item.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="text-gray-500 hover:text-primary transition-colors p-2"
                                                title={`Edit ${activeTab === 'products' ? 'Product' : 'Blog'}`}
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                                title={`Delete ${activeTab === 'products' ? 'Product' : 'Blog'}`}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {items.length === 0 && (
                                <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-xl">
                                    <p>No {activeTab} found in database.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

