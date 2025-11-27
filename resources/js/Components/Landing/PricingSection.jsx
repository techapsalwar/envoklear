import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, UserCheck, Ban } from 'lucide-react';
import PricingCard from './ui/PricingCard';

export default function PricingSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedTenure, setSelectedTenure] = useState(12);

    const plans = [
        {
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
            isPopular: false,
        },
        {
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
        {
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
            isPopular: false,
        },
    ];

    const trustBadges = [
        { icon: Shield, text: 'Secure Payment' },
        { icon: Lock, text: 'Money-Back Guarantee' },
        { icon: UserCheck, text: 'Direct Founder Access' },
        { icon: Ban, text: 'No Monthly Fees' },
    ];

    const emiTenures = [
        { months: 3, label: '3 months' },
        { months: 6, label: '6 months' },
        { months: 12, label: '12 months' },
    ];

    const calculateEMI = (price) => {
        // Simple EMI calculation (no interest for simplicity)
        return Math.round(price / selectedTenure);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative py-24 bg-dark-lighter overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Simple, <span className="text-gradient">Transparent Pricing</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        One-time payment. No hidden fees. No monthly subscriptions.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    {plans.map((plan, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <PricingCard
                                name={plan.name}
                                price={plan.price}
                                originalPrice={plan.originalPrice}
                                description={plan.description}
                                features={plan.features}
                                isPopular={plan.isPopular}
                                ctaText="Get Started"
                                onCtaClick={() => window.open('https://wa.me/919876543210', '_blank')}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* EMI Calculator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-dark rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto mb-16"
                >
                    <h3 className="text-xl font-bold text-white text-center mb-6">
                        💳 Easy EMI Options Available
                    </h3>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {emiTenures.map((tenure) => (
                            <button
                                key={tenure.months}
                                onClick={() => setSelectedTenure(tenure.months)}
                                className={`
                                    px-4 py-2 rounded-full text-sm font-medium transition-all
                                    ${selectedTenure === tenure.months
                                        ? 'bg-primary text-white'
                                        : 'bg-dark-lighter text-gray-400 hover:text-white'
                                    }
                                `}
                            >
                                {tenure.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        {plans.map((plan, index) => (
                            <div key={index} className="p-4 bg-dark-lighter rounded-xl">
                                <p className="text-gray-400 text-xs mb-1">{plan.name}</p>
                                <p className="text-white font-bold">
                                    ₹{calculateEMI(plan.price).toLocaleString('en-IN')}
                                    <span className="text-xs text-gray-400">/mo</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <p className="text-center text-gray-500 text-xs mt-4">
                        * EMI available through all major credit cards and Bajaj Finserv
                    </p>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div 
                                key={index}
                                className="flex items-center gap-2 text-gray-400"
                            >
                                <Icon className="w-5 h-5 text-green-400" />
                                <span className="text-sm">{badge.text}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
