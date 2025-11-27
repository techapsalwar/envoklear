import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronUp, X } from 'lucide-react';

export default function FloatingElements() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        // Show tooltip after 5 seconds
        const tooltipTimer = setTimeout(() => {
            setShowWhatsAppTooltip(true);
        }, 5000);

        // Auto-hide tooltip after 10 seconds
        const hideTooltipTimer = setTimeout(() => {
            setShowWhatsAppTooltip(false);
        }, 15000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(tooltipTimer);
            clearTimeout(hideTooltipTimer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* WhatsApp Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {showWhatsAppTooltip && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="absolute bottom-full right-0 mb-3 w-64"
                        >
                            <div className="bg-white rounded-xl p-4 shadow-2xl relative">
                                <button
                                    onClick={() => setShowWhatsAppTooltip(false)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                                <p className="text-gray-800 font-medium text-sm mb-2">
                                    👋 Hi! Have questions about your website?
                                </p>
                                <p className="text-gray-600 text-xs">
                                    Chat with us on WhatsApp for instant answers!
                                </p>
                                {/* Arrow */}
                                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.a
                    href="https://wa.me/919876543210?text=Hi! I'm interested in getting a website for my business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.7)',
                            '0 0 0 15px rgba(34, 197, 94, 0)',
                        ],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                >
                    <MessageCircle className="w-6 h-6 text-white" />
                </motion.a>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-dark-lighter border border-white/10 rounded-full flex items-center justify-center hover:bg-dark hover:border-primary/50 transition-all"
                    >
                        <ChevronUp className="w-5 h-5 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
