import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import { useState } from 'react';

export default function BlogEdit({ blog, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: blog.title || '',
        slug: blog.slug || '',
        category_id: blog.category_id || '',
        author: blog.author || '',
        summary: blog.summary || '',
        content: blog.content || '',
        status: blog.status || 'draft',
        image: null,
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        meta_keywords: blog.meta_keywords || '',
        is_featured: blog.is_featured || false,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState(blog.image || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.update', blog.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Blog" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
            </div>

            <Card className="p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slug *</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                required
                            />
                            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category *</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories && categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Author</label>
                            <input
                                type="text"
                                value={data.author}
                                onChange={e => setData('author', e.target.value)}
                                placeholder="Leave empty to use your name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            />
                            {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status *</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>
                        <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mt-6">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-envoklear-green focus:ring-envoklear-green"
                                />
                                <span>Featured Post</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-envoklear-green file:text-white hover:file:bg-envoklear-green/90"
                        />
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Current/Preview Image:</p>
                                <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Summary *</label>
                        <textarea
                            rows="3"
                            value={data.summary}
                            onChange={e => setData('summary', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            required
                        ></textarea>
                        {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content *</label>
                        <textarea
                            rows="12"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                            required
                        ></textarea>
                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Meta Data (Optional)</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={e => setData('meta_title', e.target.value)}
                                    placeholder="Leave empty to use post title"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                                <textarea
                                    rows="2"
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    placeholder="Leave empty to use summary"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                                <input
                                    type="text"
                                    value={data.meta_keywords}
                                    onChange={e => setData('meta_keywords', e.target.value)}
                                    placeholder="keyword1, keyword2, keyword3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-envoklear-green focus:ring-envoklear-green sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 border-t pt-6">
                        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" processing={processing}>
                            Update Post
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
