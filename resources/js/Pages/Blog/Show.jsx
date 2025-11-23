import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Section from '@/Components/UI/Section';
import Card from '@/Components/UI/Card';
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

export default function BlogShow({ post, relatedPosts }) {
    return (
        <GuestLayout>
            <Head title={post.title} />

            {/* Hero Image */}
            <div className="h-96 w-full relative">
                <img
                    src={post.image || 'https://via.placeholder.com/1200x600'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full text-white">
                        <span className="bg-envoklear-green text-white px-3 py-1 rounded-full font-medium text-sm mb-4 inline-block">
                            {post.category?.name || 'Uncategorized'}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center text-sm md:text-base text-gray-200">
                            <div className="flex items-center mr-6">
                                <User size={18} className="mr-2" />
                                {post.user?.name || 'Admin'}
                            </div>
                            <div className="flex items-center">
                                <Calendar size={18} className="mr-2" />
                                {new Date(post.published_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag.id} className="flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                            <Tag size={14} className="mr-1" /> {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share */}
                        <div className="mt-8 flex items-center space-x-4">
                            <span className="font-bold text-gray-900 flex items-center">
                                <Share2 size={18} className="mr-2" /> Share:
                            </span>
                            <button className="text-gray-500 hover:text-[#1877F2] transition-colors"><Facebook size={20} /></button>
                            <button className="text-gray-500 hover:text-[#1DA1F2] transition-colors"><Twitter size={20} /></button>
                            <button className="text-gray-500 hover:text-[#0A66C2] transition-colors"><Linkedin size={20} /></button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <Card className="p-6 bg-gray-50 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-xl font-bold text-white">
                                    {post.user?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{post.user?.name || 'Admin'}</h4>
                                    <p className="text-sm text-gray-500">Author</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Passionate about technology and sharing knowledge.
                            </p>
                        </Card>

                        {relatedPosts.length > 0 && (
                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Posts</h3>
                                <ul className="space-y-4">
                                    {relatedPosts.map(related => (
                                        <li key={related.id}>
                                            <Link href={route('blog.show', related.slug)} className="group">
                                                <h4 className="font-medium text-gray-900 group-hover:text-envoklear-green transition-colors">
                                                    {related.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(related.published_at).toLocaleDateString()}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}
                    </aside>
                </div>
            </Section>
        </GuestLayout>
    );
}
