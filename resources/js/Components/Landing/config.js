// Landing page configuration and constants
// Centralized configuration for contact info, pricing, and other settings

export const CONTACT = {
    whatsapp: '917615092749',
    whatsappUrl: 'https://wa.me/917615092749',
    whatsappMessage: 'Hi! I\'m interested in getting a website for my business.',
};

export const PRICING = {
    starter: {
        name: 'STARTER',
        price: 49999,
        originalPrice: 120000,
        description: 'Perfect for small businesses getting started online',
        features: [
            '5 Pages Website',
            'Mobile Responsive',
            'Basic SEO Setup',
            'Contact Form',
            'Social Media Links',
            '1 Month Support',
        ],
    },
    business: {
        name: 'BUSINESS',
        price: 89999,
        originalPrice: 250000,
        description: 'Best for growing businesses with e-commerce needs',
        features: [
            '10 Pages Website',
            'E-commerce Ready (50 products)',
            'Payment Gateway Integration',
            'Google Analytics',
            'WhatsApp Integration',
            'Blog/News Section',
            '3 Months Support',
        ],
        isPopular: true,
    },
    premium: {
        name: 'PREMIUM',
        price: 149999,
        originalPrice: 400000,
        description: 'For enterprises needing custom solutions',
        features: [
            'Unlimited Pages',
            'Custom Web Application',
            'Advanced E-commerce (Unlimited)',
            'Full SEO Optimization',
            'Custom Admin Panel',
            'API Integrations',
            'Priority Support (6 months)',
            'Monthly Performance Reports',
        ],
    },
};

export const STATS = {
    websitesDelivered: 50,
    avgDeliveryDays: 7,
    costSavedPercent: 70,
    clientSavingsLakhs: 3.5,
};

export const EMI_TENURES = [
    { months: 3, label: '3 months' },
    { months: 6, label: '6 months' },
    { months: 12, label: '12 months' },
];
