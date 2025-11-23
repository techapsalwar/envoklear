import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import Card from '@/Components/UI/Card';
import { FileText, MessageSquare, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { name: 'Total Blogs', value: '12', icon: FileText, change: '+2', changeType: 'increase' },
        { name: 'Pending Quotes', value: '5', icon: MessageSquare, change: '+1', changeType: 'increase' },
        { name: 'Subscribers', value: '148', icon: Users, change: '+12%', changeType: 'increase' },
        { name: 'Total Views', value: '24.5k', icon: TrendingUp, change: '+4%', changeType: 'increase' },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back to EnvoKlear Admin.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((item) => (
                    <Card key={item.name} className="p-5 overflow-hidden">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-envoklear-green-light rounded-md p-3">
                                <item.icon className="h-6 w-6 text-envoklear-green" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{item.value}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className={`text-sm ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {item.change} <span className="text-gray-500">from last month</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Quote Requests</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-gray-900">Project Inquiry #{100 + i}</p>
                                    <p className="text-sm text-gray-500">Web Development • $5k - $10k</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    New
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Blog Posts</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-gray-900">Blog Post Title {i}</p>
                                    <p className="text-sm text-gray-500">Published by Admin</p>
                                </div>
                                <span className="text-sm text-gray-500">2 days ago</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
