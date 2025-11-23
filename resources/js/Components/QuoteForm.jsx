import { useForm } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import { Send, User, Mail, MessageSquare, Building, Globe, Briefcase, DollarSign, Calendar, FileText } from 'lucide-react';

export default function QuoteForm({ onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        company: '',
        website: '',
        service_type: '',
        requirements: '',
        budget_range: '',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="john@example.com"
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
            </div>

            {/* WhatsApp & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            value={data.whatsapp}
                            onChange={(e) => setData('whatsapp', e.target.value)}
                            placeholder="+1 234 567 8900"
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Deadline <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            value={data.deadline}
                            onChange={(e) => setData('deadline', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
                </div>
            </div>

            {/* Company & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder="Your Company Ltd."
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                        />
                    </div>
                    {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="url"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                            placeholder="https://yourwebsite.com"
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all"
                        />
                    </div>
                    {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                </div>
            </div>

            {/* Service Type & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={data.service_type}
                            onChange={(e) => setData('service_type', e.target.value)}
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all appearance-none bg-white"
                        >
                            <option value="">Select a service</option>
                            <option value="Web Development">🌐 Web Development</option>
                            <option value="Mobile App Development">📱 Mobile App Development</option>
                            <option value="Digital Marketing">📊 Digital Marketing</option>
                            <option value="SEO Services">🔍 SEO Services</option>
                            <option value="Hardware Solutions">💻 Hardware Solutions</option>
                            <option value="Other">✨ Other</option>
                        </select>
                    </div>
                    {errors.service_type && <p className="mt-1 text-sm text-red-600">{errors.service_type}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={data.budget_range}
                            onChange={(e) => setData('budget_range', e.target.value)}
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all appearance-none bg-white"
                        >
                            <option value="">Select budget</option>
                            <option value="₹50,000 - ₹2,00,000">💰 ₹50,000 - ₹2,00,000</option>
                            <option value="₹2,00,000 - ₹5,00,000">💰💰 ₹2,00,000 - ₹5,00,000</option>
                            <option value="₹5,00,000 - ₹10,00,000">💰💰💰 ₹5,00,000 - ₹10,00,000</option>
                            <option value="₹10,00,000 - ₹25,00,000">💎 ₹10,00,000 - ₹25,00,000</option>
                            <option value="₹25,00,000+">💎💎 ₹25,00,000+</option>
                        </select>
                    </div>
                    {errors.budget_range && <p className="mt-1 text-sm text-red-600">{errors.budget_range}</p>}
                </div>
            </div>

            {/* Requirements */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Requirements <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                        value={data.requirements}
                        onChange={(e) => setData('requirements', e.target.value)}
                        rows="4"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-envoklear-green focus:border-transparent transition-all resize-none"
                        required
                    ></textarea>
                </div>
                {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    processing={processing}
                    className="px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <Send size={20} className="mr-2" />
                    Send Quote Request
                </Button>
            </div>
        </form>
    );
}
