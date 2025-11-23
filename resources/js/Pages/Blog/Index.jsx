import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import NewsletterForm from '@/Components/NewsletterForm';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

export default function BlogIndex({ posts, categories, filters }) {
    const { url } = usePage();

    return (
        <GuestLayout>
            <Head title="Blog" />

            <div className="bg-envoklear-green-light py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-envoklear-dark sm:text-5xl mb-6">
                        Our Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Insights, news, and trends from the world of technology and digital innovation.
                    </p>
                </div>
            </div>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {posts.data.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <img
                                    src={post.image || 'https://via.placeholder.com/800x400'}
                                    alt={post.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <span className="bg-envoklear-green-light text-envoklear-green px-3 py-1 rounded-full font-medium mr-4">
                                            {post.category?.name || 'Uncategorized'}
                                        </span>
                                        <div className="flex items-center mr-4">
                                            <Calendar size={16} className="mr-1" />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <User size={16} className="mr-1" />
                                            {post.user?.name || 'Admin'}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-envoklear-green transition-colors">
                                        <Link href={route('blog.show', post.slug)}>{post.title}</Link>
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        {post.summary}
                                    </p>
                                    <Link
                                        href={route('blog.show', post.slug)}
                                        className="text-envoklear-green font-medium flex items-center hover:underline"
                                    >
                                        Read More <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>
                            </Card>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center space-x-2">
                            {posts.links.map((link, key) => (
                                link.url ? (
                                    <Link
                                        key={key}
                                        href={link.url}
                                        className={`px-4 py-2 border rounded-md ${link.active
                                            ? 'bg-envoklear-green text-white border-envoklear-green'
                                            : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={key}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Search */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
                            <form action={route('blog.index')} method="GET" className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={filters.search}
                                    placeholder="Search articles..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </form>
                        </Card>

                        {/* Categories */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={route('blog.index', { category: category.slug })}
                                            className={`flex justify-between items-center hover:text-envoklear-green ${filters.category === category.slug ? 'text-envoklear-green font-bold' : 'text-gray-600'
                                                }`}
                                        >
                                            <span>{category.name}</span>
                                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                                {category.blogs_count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Newsletter */}
                        <Card className="p-6 bg-envoklear-dark text-white">
                            <h3 className="text-lg font-bold mb-2">Subscribe</h3>
                            <p className="text-gray-400 text-sm mb-4">Get the latest updates delivered to your inbox.</p>
                            <NewsletterForm />
                        </Card>
                    </div>
                </div>
            </Section>
        </GuestLayout>
    );
}
