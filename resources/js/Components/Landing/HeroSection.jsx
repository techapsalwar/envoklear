import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Monitor, Tablet, Smartphone } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';
import MagneticButton from './ui/MagneticButton';
import { CONTACT, STATS } from './config';
import DotGrid from '../UI/DotGrid';
import QuoteModal from '@/Components/QuoteModal';

export default function HeroSection() {
    const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [showQuoteModal, setShowQuoteModal] = useState(false);

    const stats = [
        { value: STATS.websitesDelivered, suffix: '+', label: 'Websites Delivered' },
        { value: STATS.avgDeliveryDays, suffix: ' Days', label: 'Avg Delivery Time' },
        { value: STATS.costSavedPercent, suffix: '%', label: 'Cost Saved' },
        { value: STATS.clientSavingsLakhs, suffix: 'L+', label: 'Client Savings', prefix: '₹' },
    ];

    const scrollToSection = () => {
        const problemSection = document.getElementById('problem-section');
        if (problemSection) {
            problemSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 mesh-gradient" />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-dark/70" />

            {/* DotGrid Background Effect - placed above gradient but below content */}
            <div className="absolute inset-0 z-[5]">
                <DotGrid
                    dotSize={4}
                    gap={10}
                    baseColor="rgba(37, 68, 37, 0.36)"
                    activeColor="rgba(89, 245, 50, 0.34)"
                    proximity={100}
                    speedTrigger={80}
                    shockRadius={200}
                    shockStrength={3}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid lg:grid-cols-1 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
                        >
                            <span className="text-sm font-semibold text-white">🚀 AI Powered Web Development</span>
                        </motion.div>

                        {/* Main Heading with Typewriter */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
                        >
                            Stop Renting Your Website.
                            <br />
                            <span className="text-gradient">Start Owning Your Future.</span>
                        </motion.h1>

                        {/* Rotating Words */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl sm:text-2xl text-gray-300 mb-8"
                        >
                            We build{' '}
                            <span className="text-envoklear-green font-bold">
                                <TypeAnimation
                                    sequence={[
                                        'stunning',
                                        2000,
                                        'converting',
                                        2000,
                                        'blazing-fast',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </span>
                            {' '}websites
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        >
                            <MagneticButton onClick={() => setShowQuoteModal(true)}>
                                Get Free Consultation
                            </MagneticButton>
                            <MagneticButton variant="secondary" onClick={scrollToSection}>
                                See How We're Different
                            </MagneticButton>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            ref={statsRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={statsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-white">
                                        <AnimatedCounter
                                            value={stat.value}
                                            prefix={stat.prefix || ''}
                                            suffix={stat.suffix}
                                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>


                </div>
            </div>

            {/* Bouncing Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
                onClick={scrollToSection}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
                >
                    <span className="text-sm mb-2">Scroll to explore</span>
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.div>

            {/* Quote Modal */}
            <QuoteModal show={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
        </section>
    );
}
