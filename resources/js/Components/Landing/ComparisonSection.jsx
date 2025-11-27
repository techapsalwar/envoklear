import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Sparkles, PartyPopper } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedCounter from './ui/AnimatedCounter';

export default function ComparisonSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setShowConfetti(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    const comparisonData = [
        {
            feature: '3-Year Cost',
            shopify: { value: '₹3,50,000', isGood: false },
            agency: { value: '₹4,00,000', isGood: false },
            envoklear: { value: '₹75,000', isGood: true, highlight: true },
        },
        {
            feature: 'You Own It',
            shopify: { value: false, isGood: false },
            agency: { value: true, isGood: true },
            envoklear: { value: true, isGood: true },
        },
        {
            feature: 'Delivery Time',
            shopify: { value: '2-4 weeks', isGood: false },
            agency: { value: '8-12 weeks', isGood: false },
            envoklear: { value: '7-14 days', isGood: true, highlight: true },
        },
        {
            feature: 'Monthly Fee',
            shopify: { value: '₹2,499+/mo', isGood: false },
            agency: { value: '₹5,000 AMC', isGood: false },
            envoklear: { value: '₹0', isGood: true, highlight: true },
        },
        {
            feature: 'Hidden Costs',
            shopify: { value: 'Apps, Fees', isGood: false },
            agency: { value: 'Scope Creep', isGood: false },
            envoklear: { value: 'NONE', isGood: true },
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    const renderValue = (data) => {
        if (typeof data.value === 'boolean') {
            return data.value ? (
                <Check className="w-6 h-6 text-green-400 mx-auto" />
            ) : (
                <X className="w-6 h-6 text-red-400 mx-auto" />
            );
        }
        return (
            <span className={`font-semibold ${data.isGood ? 'text-green-400' : 'text-red-400'}`}>
                {data.value}
                {data.highlight && <span className="ml-1">🎉</span>}
            </span>
        );
    };

    return (
        <section className="relative py-24 bg-dark overflow-hidden">
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="confetti absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti-piece w-3 h-3 rounded-sm"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)],
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        The <span className="text-gradient">Clear Winner</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        See how EnvoKlear stacks up against the alternatives
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="overflow-x-auto"
                >
                    <table className="w-full">
                        {/* Header */}
                        <thead>
                            <tr>
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                                <th className="text-center py-4 px-4 text-gray-400 font-medium">Shopify</th>
                                <th className="text-center py-4 px-4 text-gray-400 font-medium">Agency</th>
                                <th className="text-center py-4 px-4 relative">
                                    <div className="absolute inset-0 glow-border rounded-t-xl" />
                                    <div className="relative flex items-center justify-center gap-2 text-white font-bold">
                                        EnvoKlear <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        
                        {/* Body */}
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    variants={rowVariants}
                                    className="border-t border-white/10"
                                >
                                    <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                                    <td className="py-4 px-4 text-center">{renderValue(row.shopify)}</td>
                                    <td className="py-4 px-4 text-center">{renderValue(row.agency)}</td>
                                    <td className="py-4 px-4 text-center relative">
                                        <div className="absolute inset-0 bg-primary/5 border-x border-primary/20" />
                                        <div className="relative">{renderValue(row.envoklear)}</div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Savings Counter */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl px-8 py-6">
                        <PartyPopper className="w-8 h-8 text-green-400" />
                        <div className="text-left">
                            <p className="text-gray-400 text-sm">By choosing EnvoKlear, you save:</p>
                            <p className="text-3xl font-bold text-green-400">
                                <AnimatedCounter value={275000} prefix="₹" />
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
