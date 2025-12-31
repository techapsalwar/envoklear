import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import QuoteModal from '@/Components/QuoteModal';

export default function LandingHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add background when scrolled
            setScrolled(currentScrollY > 20);

            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <motion.div
                        className={`rounded-2xl transition-all duration-300 ${scrolled
                            ? 'bg-dark/80 backdrop-blur-lg shadow-lg shadow-primary/10 border border-white/10'
                            : 'bg-transparent'
                            }`}
                    >
                        <div className="flex justify-between items-center h-16 px-6">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2 group">
                                <motion.div
                                    className="relative w-10 h-10 flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src="/envologocolour1.svg"
                                        alt="EnvoKlear Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <span className="text-2xl font-bold font-display text-white">
                                    Envo<span className="text-envoklear-green group-hover:text-accent-cyan transition-colors">Klear</span>
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="relative px-4 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors group"
                                    >
                                        {item.name}
                                        <motion.span
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-envoklear-green to-accent-cyan origin-left"
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                ))}
                            </nav>

                            {/* CTA Button */}
                            <div className="hidden md:flex items-center">
                                <motion.button
                                    onClick={() => setShowQuoteModal(true)}
                                    className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Gradient background */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-envoklear-green to-accent-cyan"></span>
                                    {/* Hover effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-envoklear-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    {/* Glow effect */}
                                    <span className="absolute inset-0 rounded-full shadow-lg shadow-primary/50 group-hover:shadow-accent-cyan/50 transition-shadow duration-300"></span>
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Get a Quote
                                    </span>
                                </motion.button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <motion.button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isOpen ? (
                                            <motion.div
                                                key="close"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <X size={24} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="menu"
                                                initial={{ rotate: 90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Menu size={24} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden absolute top-full left-0 right-0 mt-2 px-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-dark/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                                <div className="px-4 py-6 space-y-2">
                                    {navigation.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        className="pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navigation.length * 0.1 }}
                                    >
                                        <button
                                            onClick={() => {
                                                setShowQuoteModal(true);
                                                setIsOpen(false);
                                            }}
                                            className="w-full py-3 text-base font-semibold text-white rounded-full bg-gradient-to-r from-envoklear-green to-accent-cyan hover:from-accent-cyan hover:to-envoklear-green transition-all shadow-lg shadow-primary/30"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <Sparkles className="w-4 h-4" />
                                                Get a Quote
                                            </span>
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Quote Modal */}
            <QuoteModal show={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
        </>
    );
}
