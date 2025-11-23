import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-envoklear-green to-envoklear-dark py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Let's create something amazing together!
                    </p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
                    <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Card className="p-6 flex items-start hover:shadow-lg transition-shadow">
                            <div className="bg-envoklear-green-light p-3 rounded-full mr-4 flex-shrink-0">
                                <MapPin className="text-envoklear-green" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Our Location</h3>
                                <p className="text-gray-600">123 Innovation Drive<br />Tech City, TC 90210</p>
                            </div>
                        </Card>

                        <Card className="p-6 flex items-start hover:shadow-lg transition-shadow">
                            <div className="bg-envoklear-green-light p-3 rounded-full mr-4 flex-shrink-0">
                                <Phone className="text-envoklear-green" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Phone Number</h3>
                                <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri 9am-6pm</p>
                            </div>
                        </Card>

                        <Card className="p-6 flex items-start hover:shadow-lg transition-shadow">
                            <div className="bg-envoklear-green-light p-3 rounded-full mr-4 flex-shrink-0">
                                <Mail className="text-envoklear-green" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Email Address</h3>
                                <p className="text-gray-600">
                                    <a href="mailto:envoklear@gmail.com" className="text-envoklear-green hover:underline">envoklear@gmail.com</a><br />
                                    <a href="mailto:support@envoklear.com" className="text-gray-600 hover:text-envoklear-green">support@envoklear.com</a>
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6 flex items-start hover:shadow-lg transition-shadow">
                            <div className="bg-envoklear-green-light p-3 rounded-full mr-4 flex-shrink-0">
                                <MessageSquare className="text-envoklear-green" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">WhatsApp</h3>
                                <p className="text-gray-600">
                                    <a href="https://wa.me/15551234567" className="text-envoklear-green hover:underline">+1 (555) 123-4567</a><br />
                                    Quick response guaranteed
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Business Hours */}
                    <Card className="p-8 bg-envoklear-green-light">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Business Hours</h3>
                        <div className="space-y-3 text-gray-700 max-w-md mx-auto">
                            <div className="flex justify-between">
                                <span className="font-medium">Monday - Friday:</span>
                                <span className="font-semibold">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Saturday:</span>
                                <span className="font-semibold">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Sunday:</span>
                                <span className="font-semibold">Closed</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>
        </GuestLayout>
    );
}
