import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Home, Wallet, Zap, CheckCircle, X } from 'lucide-react';
import ComparisonSlider from './ui/ComparisonSlider';

export default function SolutionSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const benefits = [
        {
            icon: Home,
            title: 'OWN IT FOREVER',
            subtitle: 'No monthly fees. Ever.',
            description: 'Your website is 100% yours. Host it anywhere. No subscriptions, no surprises.',
            color: 'from-primary to-primary-light',
        },
        {
            icon: Wallet,
            title: 'SAVE 70% INSTANTLY',
            subtitle: 'AI efficiency = Your savings',
            description: 'We use AI to work 10x faster, and we pass those savings directly to you.',
            color: 'from-green-500 to-emerald-400',
        },
        {
            icon: Zap,
            title: 'LIVE IN 7 DAYS',
            subtitle: 'Not months. Days.',
            description: 'While others take 3 months, you\'ll be live and generating revenue in just a week.',
            color: 'from-accent-cyan to-accent-teal',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        },
    };

    return (
        <section className="relative py-24 bg-dark-lighter overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-6">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">The Smart Way</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        There's a{' '}
                        <span className="text-gradient">Smarter Way</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        EnvoKlear combines AI efficiency with human creativity to deliver 
                        enterprise-quality websites at startup prices.
                    </p>
                </motion.div>

                {/* Before/After Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <ComparisonSlider
                        beforeLabel="Old Way"
                        afterLabel="EnvoKlear Way"
                        beforeContent={
                            <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-8 h-64 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-red-400 mb-6">The Old Way</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <X className="w-5 h-5 text-red-400" />
                                        <span className="text-white">₹3,50,000 total cost</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <X className="w-5 h-5 text-red-400" />
                                        <span className="text-white">12 weeks delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <X className="w-5 h-5 text-red-400" />
                                        <span className="text-white">₹5,000/month forever</span>
                                    </div>
                                </div>
                            </div>
                        }
                        afterContent={
                            <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-8 h-64 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-green-400 mb-6">The EnvoKlear Way</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span className="text-white">₹75,000 one-time</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span className="text-white">7 days delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span className="text-white">₹0/month - Own it forever</span>
                                    </div>
                                </div>
                            </div>
                        }
                        className="max-w-4xl mx-auto"
                    />
                </motion.div>

                {/* Benefit Pillars */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                            >
                                <div className="bg-dark rounded-2xl p-8 border border-white/10 h-full hover:border-primary/50 transition-colors duration-300">
                                    {/* Animated Icon */}
                                    <motion.div
                                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-primary font-semibold mb-3">
                                        {benefit.subtitle}
                                    </p>
                                    <p className="text-gray-400">
                                        {benefit.description}
                                    </p>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
