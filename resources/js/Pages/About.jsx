import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import { Users, Target, Award, Sparkles } from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: Target,
            title: 'Innovation',
            description: 'Constantly pushing boundaries to deliver state-of-the-art solutions.',
        },
        {
            icon: Users,
            title: 'Collaboration',
            description: 'Working closely with clients to understand and exceed their expectations.',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Delivering high-quality results that stand the test of time.',
        },
    ];

    const team = [
        { name: 'Deepanshu Khandelwal', role: 'Founder & CEO', image: '/team/deepanshu.jpg' },
        { name: 'Shivam Salwar', role: 'Technical Lead', image: '/team/shivam.jpg' },
        { name: 'Rahul Sharma', role: 'Designer', image: '/team/rahul.jpg' },
        { name: 'Priya Gupta', role: 'Marketing', image: '/team/priya.jpg' },
    ];

    return (
        <LandingLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm font-semibold text-white">Our Story</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            About Envo<span className="text-gradient">Klear</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            We are a team of innovators, creators, and problem solvers dedicated to transforming businesses through technology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-300 mb-8">
                                To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation. We strive to bridge the gap between complex technology and user-friendly experiences.
                            </p>
                            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                            <p className="text-lg text-gray-300">
                                To be the global partner of choice for digital transformation, recognized for our commitment to quality, creativity, and client success.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent-cyan rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <value.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                            <p className="text-gray-400">{value.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-dark-lighter/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-extrabold text-white mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-400">The minds behind the magic.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent-cyan p-1">
                                    <div className="w-full h-full rounded-full bg-dark-lighter flex items-center justify-center overflow-hidden">
                                        <span className="text-4xl font-bold text-gray-500">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-primary mb-2">{member.role}</p>
                                <p className="text-sm text-gray-500">Passionate about technology and innovation.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
