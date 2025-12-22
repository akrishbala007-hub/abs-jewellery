'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
    // Prevent build failure/runtime errors if keys are missing or default
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || !url.startsWith('http') || url.includes('placeholder')) {
        console.warn('Supabase keys missing or invalid. Returning empty product list.');
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Exception fetching products:', e);
        return [];
    }
}

export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const image_url = formData.get('image_url') as string;

    const { error } = await supabase
        .from('products')
        .insert([{ title, description, price, image_url }]);

    if (error) {
        console.error('Error creating product:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/products');
    return { success: true };
}

export async function deleteProduct(id: number) {
    const { error } = await supabase
        .from('products')
        .delete()
        .match({ id });

    if (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/products');
    return { success: true };
}

export async function updateProduct(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const image_url = formData.get('image_url') as string;

    const { error } = await supabase
        .from('products')
        .update({ title, description, price, image_url })
        .match({ id });

    if (error) {
        console.error('Error updating product:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/products');
    return { success: true };
}

// Blog Actions
export async function getBlogs() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || !url.startsWith('http') || url.includes('placeholder')) {
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Exception fetching blogs:', e);
        return [];
    }
}

export async function getBlogBySlug(slug: string) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || !url.startsWith('http') || url.includes('placeholder')) {
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
        return data;
    } catch (e) {
        console.error('Exception fetching blog post:', e);
        return null;
    }
}

export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const image_url = formData.get('image_url') as string;
    const author = formData.get('author') || 'ABS Jewellery';

    const { error } = await supabase
        .from('blogs')
        .insert([{ title, slug, excerpt, content, image_url, author }]);

    if (error) {
        console.error('Error creating blog:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/blog');
    return { success: true };
}

export async function deleteBlog(id: number) {
    const { error } = await supabase
        .from('blogs')
        .delete()
        .match({ id });

    if (error) {
        console.error('Error deleting blog:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/blog');
    return { success: true };
}

export async function updateBlog(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const image_url = formData.get('image_url') as string;
    const author = formData.get('author') as string;

    const { error } = await supabase
        .from('blogs')
        .update({ title, slug, excerpt, content, image_url, author })
        .match({ id });

    if (error) {
        console.error('Error updating blog:', error);
        return { success: false, error: `${error.message} (Code: ${error.code})` };
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
}
