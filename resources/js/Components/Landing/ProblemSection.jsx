import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertTriangle, CreditCard, Clock, Bug } from 'lucide-react';
import CostCalculator from './ui/CostCalculator';
import FlipCard from './ui/FlipCard';

export default function ProblemSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const painPoints = [
        {
            icon: CreditCard,
            title: 'Shopify',
            subtitle: 'Monthly fees that never end',
            frontColor: 'from-orange-500 to-red-500',
            backDetails: [
                '₹2,499+ monthly subscription',
                '2% transaction fees eating your profits',
                '₹5,000+/month in essential apps',
                'You never truly own your store',
            ],
        },
        {
            icon: Clock,
            title: 'Traditional Agencies',
            subtitle: '₹3 Lakhs upfront, then wait 3 months',
            frontColor: 'from-purple-500 to-pink-500',
            backDetails: [
                '₹3-5 Lakhs upfront investment',
                '8-12 weeks delivery time',
                '₹5,000/month AMC fees',
                'Scope creep = more costs',
            ],
        },
        {
            icon: Bug,
            title: 'WooCommerce/DIY',
            subtitle: 'Plugins breaking every update',
            frontColor: 'from-blue-500 to-cyan-500',
            backDetails: [
                'Constant plugin conflicts',
                'Security vulnerabilities',
                'Slow loading times',
                'Hours wasted on maintenance',
            ],
        },
    ];

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
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="problem-section" className="relative py-24 bg-dark overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 mb-6">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">The Hidden Tax</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        The Hidden Tax on{' '}
                        <span className="text-red-400">Your Business</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Every month, Indian SMBs lose lakhs to platform fees, agencies, and broken plugins.
                        It's time to break free.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Cost Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <CostCalculator />
                    </motion.div>

                    {/* Pain Point Flip Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="space-y-6"
                    >
                        {painPoints.map((point, index) => {
                            const Icon = point.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="h-48"
                                >
                                    <FlipCard
                                        frontContent={
                                            <div className="text-center">
                                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${point.frontColor} mb-4`}>
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                                                <p className="text-gray-400">{point.subtitle}</p>
                                                <p className="text-xs text-primary mt-3">Hover to see the full picture →</p>
                                            </div>
                                        }
                                        backContent={
                                            <div className="text-left">
                                                <h4 className="text-lg font-bold text-white mb-4">The Reality:</h4>
                                                <ul className="space-y-2">
                                                    {point.backDetails.map((detail, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                            <span className="text-red-400">✗</span>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
