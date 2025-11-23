import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { Code, BarChart, Cpu, Globe, Smartphone, Search } from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: <Code size={32} />,
            title: 'Web Development',
            description: 'Custom websites, web applications, and e-commerce platforms built with modern technologies like Laravel, React, and Vue.js.',
            features: ['Custom CMS', 'E-commerce Solutions', 'API Integration', 'Progressive Web Apps'],
        },
        {
            icon: <Smartphone size={32} />,
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android that provide seamless user experiences.',
            features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
        },
        {
            icon: <BarChart size={32} />,
            title: 'Digital Marketing',
            description: 'Data-driven marketing strategies to increase brand visibility, drive traffic, and convert leads into customers.',
            features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Email Marketing'],
        },
        {
            icon: <Cpu size={32} />,
            title: 'Hardware Solutions',
            description: 'Innovative hardware integration, IoT solutions, and custom electronics design for modern business needs.',
            features: ['IoT Development', 'Embedded Systems', 'PCB Design', 'Prototyping'],
        },
        {
            icon: <Globe size={32} />,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure setup, migration, and management using AWS, Azure, or Google Cloud.',
            features: ['Cloud Migration', 'Server Management', 'DevOps', 'Security Audits'],
        },
        {
            icon: <Search size={32} />,
            title: 'SEO Optimization',
            description: 'Comprehensive SEO services to improve your search engine rankings and drive organic traffic.',
            features: ['On-page SEO', 'Off-page SEO', 'Technical SEO', 'Keyword Research'],
        },
    ];

    return (
        <GuestLayout>
            <Head title="Our Services" />

            {/* Hero Section */}
            <div className="bg-envoklear-green-light py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-envoklear-dark sm:text-5xl mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive digital solutions tailored to help your business thrive in the modern world.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="p-8 hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 bg-envoklear-green-light rounded-2xl flex items-center justify-center mb-6 text-envoklear-green">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 mb-6">{service.description}</p>
                            <ul className="space-y-2 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-500">
                                        <div className="w-1.5 h-1.5 bg-envoklear-green rounded-full mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button href="/contact" variant="outline" className="w-full justify-center">
                                Learn More
                            </Button>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <Section background="dark">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-6">
                        Need a custom solution?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        We understand that every business is unique. Contact us to discuss your specific requirements.
                    </p>
                    <Button href="/contact" variant="primary" className="px-8 py-4">
                        Contact Us Today
                    </Button>
                </div>
            </Section>
        </GuestLayout>
    );
}
