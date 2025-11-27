import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';
import Carousel3D from './ui/Carousel3D';

export default function PortfolioSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeDevice, setActiveDevice] = useState('desktop');

    const projects = [
        {
            title: 'E-Commerce Store',
            category: 'Retail',
            description: 'Modern e-commerce platform with payment integration',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Restaurant Website',
            category: 'Food & Beverage',
            description: 'Online ordering and reservation system',
            color: 'from-orange-500 to-red-500',
        },
        {
            title: 'Healthcare Portal',
            category: 'Medical',
            description: 'Patient management and appointment booking',
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Real Estate Platform',
            category: 'Property',
            description: 'Property listings with virtual tours',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    const devices = [
        { id: 'desktop', icon: Monitor, label: 'Desktop' },
        { id: 'tablet', icon: Tablet, label: 'Tablet' },
        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
    ];

    const getDeviceDimensions = () => {
        switch (activeDevice) {
            case 'tablet':
                return 'w-64 h-80';
            case 'mobile':
                return 'w-44 h-80';
            default:
                return 'w-full h-64';
        }
    };

    const portfolioItems = projects.map((project, index) => (
        <div 
            key={index}
            className={`device-frame ${getDeviceDimensions()} mx-auto transition-all duration-500`}
        >
            <div className={`device-frame-screen h-full bg-gradient-to-br ${project.color} flex flex-col items-center justify-center p-6 text-center`}>
                <span className="text-xs text-white/70 uppercase tracking-wider mb-2">
                    {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/80 mb-4">{project.description}</p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm text-white hover:bg-white/30 transition-colors">
                    View Project <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    ));

    return (
        <section className="relative py-24 bg-dark overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Our <span className="text-gradient">Portfolio</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Real websites. Real results. See what we've built for businesses like yours.
                    </p>
                </motion.div>

                {/* Device Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {devices.map((device) => {
                        const Icon = device.icon;
                        return (
                            <button
                                key={device.id}
                                onClick={() => setActiveDevice(device.id)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                                    ${activeDevice === device.id 
                                        ? 'bg-primary text-white' 
                                        : 'bg-dark-lighter text-gray-400 hover:text-white hover:bg-dark-lighter/80'
                                    }
                                `}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium hidden sm:inline">{device.label}</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* 3D Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Carousel3D 
                        items={portfolioItems}
                        autoRotate={true}
                        autoRotateInterval={5000}
                    />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 mb-4">Want to see more of our work?</p>
                    <a 
                        href="/portfolio" 
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors"
                    >
                        View Full Portfolio <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
