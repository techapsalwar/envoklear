import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Phone, MapPin, Mail as MailIcon, ArrowUpRight, Sparkles } from 'lucide-react';
import NewsletterForm from '@/Components/NewsletterForm';

export default function Footer() {
    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const services = [
        'Web Development',
        'Mobile Apps',
        'Digital Marketing',
        'SEO Optimization',
        'Hardware Solutions',
        'Cloud Services',
    ];

    const socials = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="relative bg-dark overflow-hidden">
            {/* Animated Gradient Border Top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Enhanced Watermark Logo - Animated Glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pointer-events-none overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-primary/20 to-accent-cyan/10 rounded-full transform scale-150" />
                    <img
                        src="/envologocolour1.svg"
                        alt="EnvoKlear Watermark"
                        className="w-full h-auto max-w-2xl -mr-32 opacity-[0.08] transform scale-110"
                        style={{ filter: 'brightness(1.5) saturate(0.8)' }}
                    />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center space-x-2 mb-6 group">
                            <motion.img
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                src="/envologocolour1.svg"
                                alt="EnvoKlear Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-2xl font-bold font-display text-white">
                                Envo<span className="text-gradient">Klear</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering businesses with innovative digital solutions. We build the future of the web.
                        </p>
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-dark-lighter border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent-cyan" />
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/services"
                                        className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-accent-cyan transition-colors" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent-purple" />
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-10 h-10 bg-dark-lighter border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                                    <MapPin size={18} className="text-primary" />
                                </div>
                                <span className="text-gray-400 text-sm leading-relaxed">
                                    118, Khasra No. 1664, Near Trishakti Resort, Old Delhi Road, Bahala, Alwar, Rajasthan - 301001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-dark-lighter border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                                    <Phone size={18} className="text-primary" />
                                </div>
                                <a href="tel:+919982432654" className="text-gray-400 hover:text-primary transition-colors">
                                    +91 9982432654
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-dark-lighter border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                                    <MailIcon size={18} className="text-primary" />
                                </div>
                                <a href="mailto:info@envoklear.info" className="text-gray-400 hover:text-primary transition-colors">
                                    info@envoklear.info
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} <span className="text-white">EnvoKlear</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                            Privacy Policy <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                            Terms of Service <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
