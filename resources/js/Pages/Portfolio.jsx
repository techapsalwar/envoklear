import { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { ExternalLink } from 'lucide-react';

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
        <GuestLayout>
            <Head title="Portfolio" />

            <div className="bg-envoklear-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold sm:text-5xl mb-6">
                        Our Work
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Showcasing some of our best projects and success stories.
                    </p>
                </div>
            </div>

            <Section>
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${filter === category
                                    ? 'bg-envoklear-green text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Button variant="primary" className="flex items-center">
                                        View Details <ExternalLink size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-envoklear-green uppercase tracking-wide">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {project.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </GuestLayout>
    );
}
