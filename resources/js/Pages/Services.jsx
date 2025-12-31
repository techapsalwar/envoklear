import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import MagneticButton from '@/Components/Landing/ui/MagneticButton';
import { Code, BarChart, Cpu, Globe, Smartphone, Search, Sparkles, ArrowRight } from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description: 'Custom websites, web applications, and e-commerce platforms built with modern technologies like Laravel, React, and Vue.js.',
            features: ['Custom CMS', 'E-commerce Solutions', 'API Integration', 'Progressive Web Apps'],
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Smartphone,
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android that provide seamless user experiences.',
            features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: BarChart,
            title: 'Digital Marketing',
            description: 'Data-driven marketing strategies to increase brand visibility, drive traffic, and convert leads into customers.',
            features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Email Marketing'],
            gradient: 'from-orange-500 to-red-500',
        },
        {
            icon: Cpu,
            title: 'Hardware Solutions',
            description: 'Innovative hardware integration, IoT solutions, and custom electronics design for modern business needs.',
            features: ['IoT Development', 'Embedded Systems', 'PCB Design', 'Prototyping'],
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: Globe,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure setup, migration, and management using AWS, Azure, or Google Cloud.',
            features: ['Cloud Migration', 'Server Management', 'DevOps', 'Security Audits'],
            gradient: 'from-indigo-500 to-violet-500',
        },
        {
            icon: Search,
            title: 'SEO Optimization',
            description: 'Comprehensive SEO services to improve your search engine rankings and drive organic traffic.',
            features: ['On-page SEO', 'Off-page SEO', 'Technical SEO', 'Keyword Research'],
            gradient: 'from-teal-500 to-cyan-500',
        },
    ];

    return (
        <LandingLayout>
            <Head title="Our Services" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-accent-cyan mr-2" />
                            <span className="text-sm font-semibold text-white">What We Offer</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Our <span className="text-gradient">Services</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comprehensive digital solutions tailored to help your business thrive in the modern world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group p-8 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                <ul className="space-y-2 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-500">
                                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-2`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="flex items-center text-primary hover:text-accent-cyan transition-colors font-medium group/btn">
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-cyan/20" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-extrabold text-white mb-6">
                            Need a custom solution?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            We understand that every business is unique. Contact us to discuss your specific requirements.
                        </p>
                        <MagneticButton href="/contact">
                            Contact Us Today
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>
        </LandingLayout>
    );
}
