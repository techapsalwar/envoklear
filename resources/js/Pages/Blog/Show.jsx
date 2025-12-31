import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Share2, ArrowLeft } from 'lucide-react';

export default function BlogShow({ post, relatedPosts }) {
    return (
        <LandingLayout>
            <Head title={post.title} />

            {/* Hero Image */}
            <section className="relative h-[50vh] min-h-[400px] w-full">
                <img
                    src={post.image || 'https://via.placeholder.com/1200x600'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-gray-400 hover:text-primary mb-4 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Link>
                            <span className="bg-gradient-to-r from-primary to-accent-cyan text-white px-4 py-1.5 rounded-full font-medium text-sm mb-4 inline-block">
                                {post.category?.name || 'Uncategorized'}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-gray-300">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    {post.user?.name || 'Admin'}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(post.published_at).toLocaleDateString()}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <div
                                className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag.id} className="flex items-center bg-dark-lighter border border-white/10 text-gray-400 px-3 py-1.5 rounded-full text-sm">
                                                <Tag className="w-3 h-3 mr-1.5" /> {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-8 flex items-center gap-4">
                                <span className="font-bold text-white flex items-center">
                                    <Share2 className="w-4 h-4 mr-2" /> Share:
                                </span>
                                <button className="text-gray-500 hover:text-[#1877F2] transition-colors"><Facebook className="w-5 h-5" /></button>
                                <button className="text-gray-500 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></button>
                                <button className="text-gray-500 hover:text-[#0A66C2] transition-colors"><Linkedin className="w-5 h-5" /></button>
                            </div>
                        </motion.article>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10"
                            >
                                <h3 className="text-lg font-bold text-white mb-4">About the Author</h3>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent-cyan rounded-full mr-4 flex items-center justify-center text-xl font-bold text-white">
                                        {post.user?.name?.charAt(0) || 'A'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{post.user?.name || 'Admin'}</h4>
                                        <p className="text-sm text-gray-500">Author</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Passionate about technology and sharing knowledge.
                                </p>
                            </motion.div>

                            {relatedPosts.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="p-6 bg-dark-lighter/50 backdrop-blur-sm rounded-2xl border border-white/10"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4">Related Posts</h3>
                                    <ul className="space-y-4">
                                        {relatedPosts.map(related => (
                                            <li key={related.id}>
                                                <Link href={route('blog.show', related.slug)} className="group">
                                                    <h4 className="font-medium text-gray-300 group-hover:text-primary transition-colors">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(related.published_at).toLocaleDateString()}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
