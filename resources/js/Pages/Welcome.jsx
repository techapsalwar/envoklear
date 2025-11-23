import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import AnimatedCard from '@/Components/UI/AnimatedCard';
import NewsletterForm from '@/Components/NewsletterForm';
import FadeIn from '@/Components/Animations/FadeIn';
import SlideIn from '@/Components/Animations/SlideIn';
import ScaleIn from '@/Components/Animations/ScaleIn';
import StaggerChildren, { StaggerItem } from '@/Components/Animations/StaggerChildren';
import DotGrid from '@/Components/UI/DotGrid';
import {
    ArrowRight, Code, BarChart, Cpu, Zap, Shield, Rocket,
    CheckCircle, TrendingUp, Users, Award, Sparkles,
    ChevronDown, Globe, Smartphone, Palette, Database, Cloud, Settings
} from 'lucide-react';

export default function Welcome() {
    const stats = [
        { number: 150, label: 'Projects Completed', suffix: '+' },
        { number: 50, label: 'Happy Clients', suffix: '+' },
        { number: 5, label: 'Years Experience', suffix: '+' },
        { number: 98, label: 'Satisfaction Rate', suffix: '%' },
    ];

    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies like Laravel and React.',
            features: ['Responsive Design', 'Fast Performance', 'SEO Optimized'],
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            icon: Smartphone,
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
            features: ['iOS & Android', 'React Native', 'Flutter'],
            gradient: 'from-purple-500 to-pink-600'
        },
        {
            icon: BarChart,
            title: 'Digital Marketing',
            description: 'Data-driven strategies to increase your online visibility and drive conversions.',
            features: ['SEO & SEM', 'Social Media', 'Analytics'],
            gradient: 'from-green-500 to-teal-600'
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces that users love and convert effectively.',
            features: ['User Research', 'Prototyping', 'Design Systems'],
            gradient: 'from-orange-500 to-red-600'
        },
        {
            icon: Cloud,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
            features: ['AWS & Azure', 'DevOps', 'CI/CD'],
            gradient: 'from-cyan-500 to-blue-600'
        },
        {
            icon: Cpu,
            title: 'Hardware Solutions',
            description: 'Innovative hardware integration and IoT solutions for modern businesses.',
            features: ['IoT Integration', 'Sensors', 'Automation'],
            gradient: 'from-yellow-500 to-orange-600'
        },
    ];

    const process = [
        { step: 1, title: 'Discovery', description: 'Understanding your goals and requirements', icon: Sparkles },
        { step: 2, title: 'Strategy', description: 'Planning the perfect solution', icon: TrendingUp },
        { step: 3, title: 'Development', description: 'Building with cutting-edge tech', icon: Code },
        { step: 4, title: 'Launch', description: 'Delivering results that matter', icon: Rocket },
    ];

    const techStack = {
        frontend: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'TypeScript'],
        backend: ['Laravel', 'Node.js', 'PHP', 'Python', 'MySQL'],
        tools: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
    };

    return (
        <GuestLayout>
            <Head title="Digital Growth Platform" />

            {/* === HERO SECTION === */}
            <div className="relative min-h-screen flex items-center overflow-hidden bg-white">
                {/* DotGrid Background */}
                <DotGrid
                    dotSize={3}
                    gap={10}
                    baseColor="#e4f9dbff"
                    activeColor="#8fc585ff"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
                    <div className="text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                                <Sparkles className="text-envoklear-green mr-2" size={18} />
                                <span className="text-sm font-semibold text-gray-700">Transforming Ideas into Reality</span>
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Innovate Your
                            <br />
                            <span className="bg-gradient-to-r from-envoklear-green to-blue-600 bg-clip-text text-transparent">
                                <TypeAnimation
                                    sequence={[
                                        'Digital Future',
                                        2000,
                                        'Online Presence',
                                        2000,
                                        'Business Growth',
                                        2000,
                                        'User Experience',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            We combine cutting-edge web development, data-driven marketing,
                            and innovative hardware solutions to propel your business forward.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="primary"
                                className="px-8 py-4 text-lg group shadow-xl hover:shadow-2xl"
                            >
                                Get Started
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>
                            <Button href="/portfolio" variant="secondary" className="px-8 py-4 text-lg shadow-lg hover:shadow-xl">
                                View Portfolio
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-envoklear-green to-blue-600 bg-clip-text text-transparent">
                                        {stat.number}{stat.suffix}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ChevronDown className="text-envoklear-green" size={32} />
                </motion.div>
            </div>

            {/* === SERVICES SECTION === */}
            <Section id="services" background="white">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Our <span className="bg-gradient-to-r from-envoklear-green to-blue-600 bg-clip-text text-transparent">Services</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive solutions tailored to your business needs, powered by cutting-edge technology.
                        </p>
                    </div>
                </FadeIn>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <StaggerItem key={index}>
                                <AnimatedCard className="h-full">
                                    <Card className="h-full p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-envoklear-green/20">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                                            <Icon className="text-white" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                        <div className="space-y-2 mb-6">
                                            {service.features.map((feature, i) => (
                                                <div key={i} className="flex items-center text-sm text-gray-700">
                                                    <CheckCircle className="text-envoklear-green mr-2 flex-shrink-0" size={16} />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <a
                                            href="#"
                                            className="inline-flex items-center text-envoklear-green font-semibold hover:gap-2 transition-all group"
                                        >
                                            Learn more
                                            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Card>
                                </AnimatedCard>
                            </StaggerItem>
                        );
                    })}
                </StaggerChildren>
            </Section>

            {/* === TRUST SECTION === */}
            <Section background="light">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Trusted by Industry Leaders
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join hundreds of satisfied clients who trust EnvoKlear
                        </p>
                    </div>
                </FadeIn>

                <div className="bg-white rounded-2xl p-12 shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 transition-all">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="text-4xl font-bold text-gray-400">
                                LOGO {i}
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* === PROCESS SECTION === */}
            <Section background="white">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            How We <span className="bg-gradient-to-r from-envoklear-green to-blue-600 bg-clip-text text-transparent">Work</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our proven process ensures exceptional results, every time.
                        </p>
                    </div>
                </FadeIn>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-envoklear-green via-blue-500 to-envoklear-green transform -translate-y-1/2" />

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {process.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <StaggerItem key={index}>
                                    <div className="text-center">
                                        <motion.div
                                            className="relative inline-block mb-6"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <div className="w-24 h-24 bg-gradient-to-br from-envoklear-green to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                                                <Icon className="text-white" size={36} />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-envoklear-green rounded-full flex items-center justify-center text-xs font-bold text-envoklear-green">
                                                {item.step}
                                            </div>
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerChildren>
                </div>
            </Section>

            {/* === TECH STACK SECTION === */}
            <Section background="light">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Technology <span className="bg-gradient-to-r from-envoklear-green to-blue-600 bg-clip-text text-transparent">Stack</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We use the latest and most reliable technologies to build your solutions.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(techStack).map(([category, techs], index) => (
                        <ScaleIn key={category} delay={index * 0.2}>
                            <Card className="p-8 hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 capitalize">{category}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-envoklear-green-light text-envoklear-green rounded-full text-sm font-medium hover:bg-envoklear-green hover:text-white transition-colors cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </ScaleIn>
                    ))}
                </div>
            </Section>

            {/* === NEWSLETTER CTA SECTION === */}
            <Section background="green">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Let's discuss how we can help you achieve your digital goals.
                                Get a free consultation and quote today!
                            </p>
                            <Button variant="dark" className="px-8 py-4 text-lg mb-12">
                                Get a Free Quote
                            </Button>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                                <p className="text-white/80">Subscribe to our newsletter for insights and updates</p>
                            </div>
                            <NewsletterForm />
                        </div>
                    </FadeIn>
                </div>
            </Section>
        </GuestLayout>
    );
}
