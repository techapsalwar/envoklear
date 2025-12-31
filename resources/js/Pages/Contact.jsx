import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import { Mail, Phone, MapPin, MessageSquare, Sparkles, Clock } from 'lucide-react';

export default function Contact() {
    const contactInfo = [
        {
            icon: MapPin,
            title: 'Our Location',
            lines: ['118, Khasra No. 1664, Near Trishakti Resort', 'Old Delhi Road, Bahala, Alwar', 'Rajasthan, PIN-301001'],
        },
        {
            icon: Phone,
            title: 'Phone Number',
            lines: ['+91 9982432654', 'Mon-Fri 9am-6pm'],
        },
        {
            icon: Mail,
            title: 'Email Address',
            lines: ['envoklear@gmail.com', 'support@envoklear.com'],
            isEmail: true,
        },
        {
            icon: MessageSquare,
            title: 'WhatsApp',
            lines: ['+91 9982432654', 'Quick response guaranteed'],
        },
    ];

    const hours = [
        { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', time: 'Closed' },
    ];

    return (
        <LandingLayout>
            <Head title="Contact Us" />

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
                            <span className="text-sm font-semibold text-white">Get In Touch</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Contact <span className="text-gradient">Us</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Have a project in mind? We'd love to hear from you. Let's create something amazing together!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
                        <p className="text-gray-400">We're here to help and answer any question you might have.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent-cyan rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                        {item.lines.map((line, idx) => (
                                            <p key={idx} className={`text-gray-400 ${item.isEmail ? 'hover:text-primary cursor-pointer' : ''}`}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Business Hours */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-gradient-to-r from-primary/20 to-accent-cyan/20 backdrop-blur-sm rounded-2xl border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-bold text-white">Business Hours</h3>
                        </div>
                        <div className="space-y-3">
                            {hours.map((item) => (
                                <div key={item.day} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                    <span className="text-gray-300 font-medium">{item.day}</span>
                                    <span className="text-white font-semibold">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </LandingLayout>
    );
}
