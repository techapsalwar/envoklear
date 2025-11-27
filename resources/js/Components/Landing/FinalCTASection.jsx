import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, MessageCircle, Sparkles, Flame } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function FinalCTASection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [showConfetti, setShowConfetti] = useState(false);

    const handleCTAClick = () => {
        setShowConfetti(true);
        setTimeout(() => {
            window.open('https://wa.me/919876543210', '_blank');
        }, 500);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const guarantees = [
        '100% Money-Back Guarantee',
        'Free consultation, no strings',
        'Fixed price, no surprises',
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 animated-gradient-bg" />
            <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" />

            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                    {[...Array(100)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-sm"
                            initial={{
                                x: '50%',
                                y: '50%',
                                scale: 0,
                            }}
                            animate={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                                scale: [0, 1, 1, 0],
                                rotate: Math.random() * 720,
                            }}
                            transition={{
                                duration: 2,
                                delay: Math.random() * 0.5,
                                ease: 'easeOut',
                            }}
                            style={{
                                backgroundColor: ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 5)],
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Urgency Badge */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.9, 1.05, 1] }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-full mb-8"
                    >
                        <Flame className="w-5 h-5 animate-pulse" />
                        <span className="font-bold">Only 3 spots left this month</span>
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                        Ready to <span className="text-gradient">Own Your Website</span>?
                    </h2>

                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Stop paying monthly fees. Stop waiting months. 
                        Get a professional website that's 100% yours in just 7 days.
                    </p>

                    {/* Guarantees */}
                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                        {guarantees.map((guarantee, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-center gap-2"
                            >
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="text-white font-medium">{guarantee}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <MagneticButton onClick={handleCTAClick}>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Get Free Consultation
                        </MagneticButton>

                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Us
                        </a>
                    </div>

                    {/* Trust Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                        className="text-gray-400 text-sm mt-8"
                    >
                        🔒 No spam, ever. Your information is safe with us.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
