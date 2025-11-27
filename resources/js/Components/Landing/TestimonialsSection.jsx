import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Play, Quote } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialsSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [activeVideo, setActiveVideo] = useState(null);

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Owner, Fashion Boutique',
            quote: 'EnvoKlear delivered our e-commerce site in just 5 days. We were on Shopify paying ₹7,000/month. Now we own everything and pay nothing monthly!',
            rating: 5,
            image: null,
        },
        {
            name: 'Priya Sharma',
            role: 'Founder, Wellness Studio',
            quote: 'The booking system they built is amazing. Our clients love it, and we saved over ₹2 lakhs compared to traditional agencies.',
            rating: 5,
            image: null,
        },
        {
            name: 'Amit Patel',
            role: 'CEO, Tech Startup',
            quote: 'Best decision we made. Professional website, quick delivery, and zero hidden costs. Highly recommend!',
            rating: 5,
            image: null,
        },
        {
            name: 'Sneha Reddy',
            role: 'Owner, Jewelry Brand',
            quote: 'From concept to launch in 7 days. The website looks like it cost ₹5 lakhs but I paid a fraction of that.',
            rating: 5,
            image: null,
        },
    ];

    const clientLogos = [
        'Fashion Brand', 'Tech Co', 'Restaurant', 'Wellness', 
        'Jewelry', 'Retail Store', 'Startup', 'Agency'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative py-24 bg-dark-lighter overflow-hidden">
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
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Real stories from real business owners who chose the smarter way
                    </p>
                </motion.div>

                {/* Testimonial Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-dark rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-8 h-8 text-primary/30 mb-4" />
                            
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Video Testimonial CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gradient-to-r from-primary/20 to-accent-cyan/20 border border-primary/30 rounded-2xl p-8 text-center mb-16"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 cursor-pointer hover:bg-primary/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play className="w-8 h-8 text-primary fill-primary" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">Watch Video Testimonials</h3>
                        <p className="text-gray-400">See our clients share their success stories</p>
                    </div>
                </motion.div>

                {/* Client Logos Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <p className="text-center text-gray-400 text-sm mb-8">Trusted by businesses across India</p>
                    <div className="marquee-container">
                        <div className="marquee-content gap-12">
                            {[...clientLogos, ...clientLogos].map((logo, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 px-8 py-4 bg-dark-lighter/50 rounded-lg border border-white/5"
                                >
                                    <span className="text-gray-500 font-semibold whitespace-nowrap">{logo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
