import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function Portfolio() {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Web Development', 'Mobile App', 'Digital Marketing'];

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'A full-featured e-commerce solution with real-time inventory management.',
        },
        {
            id: 2,
            title: 'Fitness Tracking App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Cross-platform mobile application for tracking workouts and nutrition.',
        },
        {
            id: 3,
            title: 'Social Media Campaign',
            category: 'Digital Marketing',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Viral marketing campaign that increased brand engagement by 200%.',
        },
        {
            id: 4,
            title: 'Corporate Website',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Modern corporate website for a leading financial institution.',
        },
        {
            id: 5,
            title: 'Food Delivery App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'On-demand food delivery application with real-time tracking.',
        },
        {
            id: 6,
            title: 'SEO Overhaul',
            category: 'Digital Marketing',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Complete SEO strategy implementation resulting in #1 ranking for key terms.',
        },
    ];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <LandingLayout>
            <Head title="Portfolio" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-accent-purple mr-2" />
                            <span className="text-sm font-semibold text-white">Our Work</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Our <span className="text-gradient">Portfolio</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Showcasing some of our best projects and success stories.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter & Projects */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === category
                                        ? 'bg-gradient-to-r from-primary to-accent-cyan text-white shadow-lg shadow-primary/30'
                                        : 'bg-dark-lighter border border-white/10 text-gray-400 hover:text-white hover:border-primary/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="wait">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all"
                                >
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-3 bg-gradient-to-r from-primary to-accent-cyan text-white rounded-full font-medium flex items-center gap-2"
                                            >
                                                View Details <ExternalLink className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
