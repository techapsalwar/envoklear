import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

const colorOptions = [
    { label: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
    { label: 'Orange to Red', value: 'from-orange-500 to-red-500' },
    { label: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
    { label: 'Purple to Pink', value: 'from-purple-500 to-pink-500' },
    { label: 'Indigo to Blue', value: 'from-indigo-500 to-blue-500' },
    { label: 'Yellow to Orange', value: 'from-yellow-500 to-orange-500' },
    { label: 'Teal to Green', value: 'from-teal-500 to-green-500' },
    { label: 'Rose to Purple', value: 'from-rose-500 to-purple-500' },
    { label: 'Slate to Gray', value: 'from-slate-500 to-gray-500' },
    { label: 'Emerald to Teal', value: 'from-emerald-500 to-teal-500' },
];

export default function PortfolioCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        description: '',
        website_url: '',
        color: 'from-blue-500 to-cyan-500',
        image_desktop: null,
        image_tablet: null,
        image_mobile: null,
        is_active: true,
        sort_order: 0,
    });

    const [previews, setPreviews] = useState({
        desktop: null,
        tablet: null,
        mobile: null,
    });

    const handleImageChange = (type, e) => {
        const file = e.target.files[0];
        if (file) {
            setData(`image_${type}`, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.portfolios.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Add Portfolio" />

            <div className="mb-6">
                <Link href={route('admin.portfolios.index')} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft size={18} className="mr-2" /> Back to Portfolios
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Portfolio Item</h1>
            </div>

            <Card className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                placeholder="e.g., E-Commerce Store"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category *</label>
                            <input
                                type="text"
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                placeholder="e.g., Retail, Healthcare, Real Estate"
                                required
                            />
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            rows="3"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            placeholder="Brief description of the project"
                            required
                        ></textarea>
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Website URL</label>
                            <input
                                type="url"
                                value={data.website_url}
                                onChange={e => setData('website_url', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                placeholder="https://example.com"
                            />
                            {errors.website_url && <p className="mt-1 text-sm text-red-600">{errors.website_url}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color Theme *</label>
                            <select
                                value={data.color}
                                onChange={e => setData('color', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            >
                                {colorOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className={`mt-2 h-8 rounded bg-gradient-to-r ${data.color}`}></div>
                            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                            <input
                                type="number"
                                value={data.sort_order}
                                onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                min="0"
                            />
                            <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-envoklear-green focus:ring-envoklear-green"
                                />
                                <span>Active (Show on website)</span>
                            </label>
                        </div>
                    </div>

                    {/* Device Images */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Device Screenshots</h3>
                        <p className="text-sm text-gray-500 mb-6">Upload screenshots of how the website looks on different devices.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Desktop */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Monitor size={18} className="mr-2" /> Desktop Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange('desktop', e)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-envoklear-green file:text-white hover:file:bg-envoklear-green/90"
                                />
                                {errors.image_desktop && <p className="mt-1 text-sm text-red-600">{errors.image_desktop}</p>}
                                {previews.desktop && (
                                    <div className="mt-3">
                                        <img src={previews.desktop} alt="Desktop Preview" className="rounded-lg shadow-md max-h-40 w-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Tablet */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Tablet size={18} className="mr-2" /> Tablet Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange('tablet', e)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-envoklear-green file:text-white hover:file:bg-envoklear-green/90"
                                />
                                {errors.image_tablet && <p className="mt-1 text-sm text-red-600">{errors.image_tablet}</p>}
                                {previews.tablet && (
                                    <div className="mt-3">
                                        <img src={previews.tablet} alt="Tablet Preview" className="rounded-lg shadow-md max-h-40 w-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Mobile */}
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Smartphone size={18} className="mr-2" /> Mobile Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange('mobile', e)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-envoklear-green file:text-white hover:file:bg-envoklear-green/90"
                                />
                                {errors.image_mobile && <p className="mt-1 text-sm text-red-600">{errors.image_mobile}</p>}
                                {previews.mobile && (
                                    <div className="mt-3">
                                        <img src={previews.mobile} alt="Mobile Preview" className="rounded-lg shadow-md max-h-40 w-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button href={route('admin.portfolios.index')} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Portfolio'}
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
