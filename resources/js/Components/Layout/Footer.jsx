import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, MapPin, Mail as MailIcon } from 'lucide-react';
import NewsletterForm from '@/Components/NewsletterForm';

export default function Footer() {

    return (
        <footer className="bg-envoklear-dark text-white pt-16 pb-8 relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end opacity-5 pointer-events-none">
                <img
                    src="/envologocolour1.svg"
                    alt="EnvoKlear Watermark"
                    className="w-full h-auto max-w-2xl -mr-20 transform scale-70"
                    style={{ filter: 'brightness(2)' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <img
                                src="/envologocolour1.svg"
                                alt="EnvoKlear Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-2xl font-bold font-display">
                                Envo<span className="text-envoklear-green">Klear</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Empowering businesses with innovative digital solutions. We build the future of the web.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-envoklear-green transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-envoklear-green transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-envoklear-green transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-envoklear-green transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-envoklear-green transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-envoklear-green transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-envoklear-green transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-envoklear-green transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-envoklear-green transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">Web Development</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">Mobile Apps</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">Digital Marketing</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">SEO Optimization</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-envoklear-green transition-colors">Hardware Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-envoklear-green mr-3 mt-1" />
                                <span className="text-gray-400">118, Khasra No. 1664, Near Trishakti Resort, Old Delhi Road, Bahala,Alwar, Rajasthan, PIN-301001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-envoklear-green mr-3" />
                                <span className="text-gray-400">+91 9982432654</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon size={20} className="text-envoklear-green mr-3" />
                                <span className="text-gray-400">info@envoklear.info</span>
                            </li>
                        </ul>


                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} EnvoKlear. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
