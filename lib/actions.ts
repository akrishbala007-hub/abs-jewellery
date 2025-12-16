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
        return { success: false, error: error.message };
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
        return { success: false, error: error.message };
    }

    revalidatePath('/products');
    return { success: true };
}
