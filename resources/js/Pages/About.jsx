import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import { Users, Target, Award } from 'lucide-react';

export default function About() {
    return (
        <GuestLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <div className="bg-envoklear-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold sm:text-5xl mb-6">
                        About Envo<span className="text-envoklear-green">Klear</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We are a team of innovators, creators, and problem solvers dedicated to transforming businesses through technology.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation. We strive to bridge the gap between complex technology and user-friendly experiences.
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                        <p className="text-lg text-gray-600">
                            To be the global partner of choice for digital transformation, recognized for our commitment to quality, creativity, and client success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <Card className="p-6 border-l-4 border-envoklear-green">
                            <div className="flex items-start">
                                <Target className="text-envoklear-green mt-1 mr-4" size={24} />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                    <p className="text-gray-600">Constantly pushing boundaries to deliver state-of-the-art solutions.</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-l-4 border-envoklear-green">
                            <div className="flex items-start">
                                <Users className="text-envoklear-green mt-1 mr-4" size={24} />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                                    <p className="text-gray-600">Working closely with clients to understand and exceed their expectations.</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-l-4 border-envoklear-green">
                            <div className="flex items-start">
                                <Award className="text-envoklear-green mt-1 mr-4" size={24} />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Excellence</h3>
                                    <p className="text-gray-600">Delivering high-quality results that stand the test of time.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* Team Section Placeholder */}
            <Section background="light">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
                    <p className="mt-4 text-xl text-gray-500">The minds behind the magic.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((member) => (
                        <Card key={member} className="p-6 text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                            <h3 className="text-lg font-bold text-gray-900">Team Member {member}</h3>
                            <p className="text-envoklear-green mb-2">Position</p>
                            <p className="text-sm text-gray-500">Passionate about technology and innovation.</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </GuestLayout>
    );
}
