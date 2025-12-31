import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import NewsletterForm from '@/Components/NewsletterForm';
import { Calendar, User, ArrowRight, Search, Sparkles } from 'lucide-react';

export default function BlogIndex({ posts, categories, filters }) {
    const { url } = usePage();

    return (
        <LandingLayout>
            <Head title="Blog" />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-teal/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-accent-teal mr-2" />
                            <span className="text-sm font-semibold text-white">Insights & Updates</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Our <span className="text-gradient">Blog</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Insights, news, and trends from the world of technology and digital innovation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {posts.data.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all group"
                                >
                                    <img
                                        src={post.image || 'https://via.placeholder.com/800x400'}
                                        alt={post.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="p-8">
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">
                                                {post.category?.name || 'Uncategorized'}
                                            </span>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {post.user?.name || 'Admin'}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                            <Link href={route('blog.show', post.slug)}>{post.title}</Link>
                                        </h2>
                                        <p className="text-gray-400 mb-6">{post.summary}</p>
                                        <Link
                                            href={route('blog.show', post.slug)}
                                            className="text-primary font-medium flex items-center hover:text-accent-cyan transition-colors group/link"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 pt-8">
                                {posts.links.map((link, key) => (
                                    link.url ? (
                                        <Link
                                            key={key}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${link.active
                                                    ? 'bg-gradient-to-r from-primary to-accent-cyan text-white'
                                                    : 'bg-dark-lighter border border-white/10 text-gray-400 hover:text-white hover:border-primary/50'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={key}
                                            className="px-4 py-2 rounded-lg bg-dark-lighter border border-white/10 text-gray-600 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Search */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <h3 className="text-lg font-bold text-white mb-4">Search</h3>
                                <form action={route('blog.index')} method="GET" className="relative">
                                    <input
                                        type="text"
                                        name="search"
                                        defaultValue={filters.search}
                                        placeholder="Search articles..."
                                        className="w-full pl-10 pr-4 py-3 bg-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-primary focus:border-primary"
                                    />
                                    <Search className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                                </form>
                            </motion.div>

                            {/* Categories */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                                <ul className="space-y-3">
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={route('blog.index', { category: category.slug })}
                                                className={`flex justify-between items-center transition-colors ${filters.category === category.slug
                                                        ? 'text-primary font-bold'
                                                        : 'text-gray-400 hover:text-primary'
                                                    }`}
                                            >
                                                <span>{category.name}</span>
                                                <span className="px-2 py-1 bg-dark rounded-full text-xs text-gray-500">
                                                    {category.blogs_count}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Newsletter */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-6 bg-gradient-to-br from-primary/20 to-accent-cyan/20 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <h3 className="text-lg font-bold text-white mb-2">Subscribe</h3>
                                <p className="text-gray-400 text-sm mb-4">Get the latest updates delivered to your inbox.</p>
                                <NewsletterForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
