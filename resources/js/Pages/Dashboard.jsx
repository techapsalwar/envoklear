import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/UI/Card';
import { MessageSquare, FileText, CheckCircle, Clock, TrendingUp, Plus, ExternalLink, ArrowRight } from 'lucide-react';

export default function Dashboard({ stats, recent_quotes, recent_blogs, charts }) {

    const statCards = [
        {
            name: 'Total Quotes',
            value: stats.total_quotes,
            icon: MessageSquare,
            color: 'bg-blue-100 text-blue-600',
            desc: 'All time requests'
        },
        {
            name: 'In Progress',
            value: stats.in_progress,
            icon: Clock,
            color: 'bg-yellow-100 text-yellow-600',
            desc: 'Active negotiations'
        },
        {
            name: 'Won Deals',
            value: stats.won_quotes,
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
            desc: 'Successfully closed'
        },
        {
            name: 'Total Content',
            value: stats.total_blogs + stats.total_portfolios,
            icon: FileText,
            color: 'bg-purple-100 text-purple-600',
            desc: 'Blogs & Portfolios'
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            new: 'bg-blue-100 text-blue-800',
            contacted: 'bg-purple-100 text-purple-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            quoted: 'bg-indigo-100 text-indigo-800',
            won: 'bg-green-100 text-green-800',
            lost: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                    <Link
                        href={route('admin.quotes.index')}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        View All Quotes
                    </Link>
                    <Link
                        href={route('admin.blogs.create')}
                        className="inline-flex items-center px-4 py-2 bg-envoklear-green text-white rounded-lg text-sm font-medium hover:bg-envoklear-green-dark shadow-sm transition-colors"
                    >
                        <Plus size={16} className="mr-2" />
                        New Post
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {statCards.map((item) => (
                    <Card key={item.name} className="p-5 flex items-start justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{item.name}</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${item.color}`}>
                            <item.icon size={24} />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Quote Analytics (Simple Bar Visualization) */}
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Quote Status Breakdown</h2>
                        <div className="space-y-4">
                            {Object.entries(charts.quotes_by_status).map(([status, count]) => {
                                const percentage = Math.round((count / stats.total_quotes) * 100) || 0;
                                return (
                                    <div key={status}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium capitalize text-gray-700">{status.replace('_', ' ')}</span>
                                            <span className="text-gray-500">{count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className={`h-2.5 rounded-full ${getStatusColor(status).split(' ')[0].replace('bg-', 'bg-')}`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                            {stats.total_quotes === 0 && (
                                <p className="text-center text-gray-400 text-sm py-4">No data available yet</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Quotes */}
                    <Card className="overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <TrendingUp size={20} className="text-envoklear-green" />
                                Recent Requests
                            </h2>
                            <Link href={route('admin.quotes.index')} className="text-sm text-envoklear-green hover:underline flex items-center">
                                View all <ArrowRight size={14} className="ml-1" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Client</th>
                                        <th className="px-6 py-3">Service</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recent_quotes.length > 0 ? (
                                        recent_quotes.map((quote) => (
                                            <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{quote.name}</div>
                                                    <div className="text-xs text-gray-500">{quote.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{quote.service_type || 'General'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(quote.status)}`}>
                                                        {quote.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-gray-500 text-xs">
                                                    {quote.time_ago}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">
                                                No recent quotes found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href={route('admin.blogs.create')} className="flex items-center p-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
                                <div className="p-2 bg-green-100 text-green-600 rounded-md mr-3 group-hover:bg-green-200 transition-colors">
                                    <FileText size={18} />
                                </div>
                                Write New Blog Post
                            </Link>
                            <Link href={route('admin.portfolios.create')} className="flex items-center p-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-md mr-3 group-hover:bg-indigo-200 transition-colors">
                                    <ExternalLink size={18} />
                                </div>
                                Add Portfolio Item
                            </Link>
                            <Link href={route('admin.quotes.index')} className="flex items-center p-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                                    <MessageSquare size={18} />
                                </div>
                                Manage Quotes
                            </Link>
                        </div>
                    </Card>

                    {/* Recent Content */}
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Latest Content</h2>
                        <div className="flow-root">
                            <ul className="-mb-8">
                                {recent_blogs.map((blog, idx) => (
                                    <li key={blog.id}>
                                        <div className="relative pb-8">
                                            {idx !== recent_blogs.length - 1 && (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                            )}
                                            <div className="relative flex space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                                    <FileText size={14} className="text-gray-500" />
                                                </div>
                                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Published <Link href={route('blog.show', blog.slug)} className="font-medium text-gray-900 truncate hover:underline">{blog.title}</Link>
                                                        </p>
                                                    </div>
                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                        <time>{blog.time_ago}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {recent_blogs.length === 0 && (
                                    <li className="text-sm text-gray-400 italic">No recent blogs</li>
                                )}
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
