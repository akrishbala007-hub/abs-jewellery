# ABS Jewellery - Project Documentation & Build Tutorial

**Version:** 1.0
**Date:** December 16, 2025
**Author:** Antigravity (Google DeepMind) for ABS Jewellery

---

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Folder Structure](#architecture--folder-structure)
4. [How It Works: Key Features Explained](#how-it-works-key-features-explained)
5. [Step-by-Step Build Tutorial (Manual Recreation)](#step-by-step-build-tutorial-manual-recreation)
6. [Deployment Guide](#deployment-guide)

---

## 1. Project Overview
**ABS Jewellery** is a high-performance, premium portfolio website designed to showcase handcrafted jewellery. It features a modern, cinematic "dark mode" aesthetic, a dynamic product catalog managed via a custom Admin Panel, and seamless integration with WhatsApp for sales.

### Core Features:
-   **Dynamic Product Catalog**: Products are fetched in real-time from a database.
-   **Admin Dashboard**: A secure (PIN-protected) area to Add, Edit, and Delete products.
-   **Image Management**: Direct image uploads to cloud storage.
-   **SEO Optimized**: Fully configured for Google Search visibility.
-   **WhatsApp Integration**: "Click-to-Buy" functionality directly links to the owner's chat.

---

## 2. Technology Stack
We used the most modern, scalable web technologies available in 2025.

| Category | Technology | Reason for Choice |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Best for SEO, speed, and scalable routing. |
| **Language** | **TypeScript** | Ensures code reliability and fewer bugs. |
| **Styling** | **Tailwind CSS** | Rapid UI development with utility-first classes. |
| **Animations** | **Framer Motion** | Smooth, cinematic entrance animations (Hero, Scroll). |
| **Icons** | **Lucide React** | Clean, modern SVG icons. |
| **Database** | **Supabase (PostgreSQL)** | Powerful relational database for storing product info. |
| **Storage** | **Supabase Storage** | Hosting for product images. |
| **Deployment** | **Netlify** | Fast, free, and secure global hosting. |

---

## 3. Architecture & Folder Structure
The project follows the standard **Next.js App Router** structure.

```text
abs-jewellery/
├── app/                        # Main application routes
│   ├── admin/page.tsx          # The Admin Dashboard (Protected)
│   ├── products/page.tsx       # Public Product Gallery
│   ├── layout.tsx              # Global Layout (Navbar, Footer, SEO)
│   ├── page.tsx                # Home Page (Hero, Sections)
│   ├── sitemap.ts              # SEO Sitemap generator
│   └── robots.ts               # SEO Crawler instructions
├── components/                 # Reusable UI Blocks
│   ├── Navbar.tsx              # Top Navigation
│   ├── Footer.tsx              # Site Footer
│   ├── WhatsAppFloat.tsx       # Global Floating Button
│   ├── HeroImageSlider.tsx     # Homepage Animation
│   └── ui/                     # Small atoms (Buttons, ImageFallback)
├── lib/                        # Backend Logic
│   ├── supabase.ts             # Database Connection Client
│   └── actions.ts              # Server Functions (Create/Read/Update/Delete)
└── public/                     # Static Assets (Images, Icons)
```

---

## 4. How It Works: Key Features Explained

### A. The Admin Panel (`app/admin/page.tsx`)
*   **Authentication**: Uses a simple Client-Side PIN (`1234`) check. This is not "bank-grade" security but suffices for a portfolio site.
*   **State Management**: Uses `useState` to toggle between Login View and Dashboard View.
*   **Image Upload**:
    1.  User selects a file.
    2.  `supabase.storage.upload()` sends the file to the `product-images` bucket.
    3.  `supabase.storage.getPublicUrl()` retrieves the viewable link.
    4.  This link is saved in the database row.

### B. Product Fetching (`lib/actions.ts`)
*   We use **Server Actions**. These are special functions that run only on the server, not the user's browser.
*   `getProducts()`: Connects to Supabase -> Selects `*` from `products` table -> Returns array.
*   This ensures sensitive database logic stays hidden.

### C. WhatsApp Integration (`components/WhatsAppFloat.tsx`)
*   Uses a simple HTML link with a clean URL scheme:
    `https://wa.me/[NUMBER]?text=[MESSAGE]`
*   We use `encodeURIComponent` to dynamic insert the Product Name and Price into the message automatically.

---

## 5. Step-by-Step Build Tutorial (Manual Recreation)
Follow these steps to rebuild this project from scratch.

### Phase 1: Setup
1.  **Initialize Project**:
    ```bash
    npx create-next-app@latest abs-jewellery
    # Select: TypeScript, Tailwind, App Router
    cd abs-jewellery
    ```
2.  **Install Libraries**:
    ```bash
    npm install @supabase/supabase-js framer-motion lucide-react
    ```

### Phase 2: Database (Supabase)
1.  Create a project at [supabase.com](https://supabase.com).
2.  **SQL Editor**: Run this query to create the table:
    ```sql
    create table products (
      id bigint generated by default as identity primary key,
      title text not null,
      description text,
      price text,
      image_url text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );
    alter table products enable row level security;
    create policy "Public Read" on products for select using (true);
    ```
3.  **Storage**: Create a public bucket named `product-images`.
    *   Add Policy: "Allow Public Uploads" (INSERT/SELECT/UPDATE for `anon` role).

### Phase 3: Connection
1.  Create `.env.local` file in your project root:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```
2.  Create `lib/supabase.ts` to initialize the client.

### Phase 4: Coding
*(Refer to the source code for exact file contents)*
1.  **Layout**: Add `Navbar` and `Footer` to `app/layout.tsx`.
2.  **Home**: Build the Hero section in `app/page.tsx`.
3.  **Admin**: Create the form and list view in `app/admin/page.tsx`.
4.  **Backend**: Write the CRUD functions in `lib/actions.ts`.

---

## 6. Deployment Guide
1.  Push code to **GitHub**.
2.  Log in to **Netlify** -> "Import from Git".
3.  **Environment Variables**: Go to Site Settings -> Environment Variables.
    *   Add `NEXT_PUBLIC_SUPABASE_URL`
    *   Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  **Domain**: Go to Domain Management -> Add Custom Domain (`absjewellery.online`).
    *   Update DNS records at your registrar (A Record & CNAME).

---
*Created by Google DeepMind's Antigravity Agent for ABS Jewellery.*
