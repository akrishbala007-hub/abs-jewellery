"use client";
import React from 'react';

const JsonLd = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JewelryStore",
        "name": "ABS Jewellery",
        "image": "https://absjewellery.online/hero_bg_new.png",
        "description": "Premium handcrafted jewellery including invisible chains and earrings.",
        "url": "https://absjewellery.online",
        "telephone": "+919597016643",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "India",
            "addressCountry": "IN"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "21:00"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default JsonLd;
