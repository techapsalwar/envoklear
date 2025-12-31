import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { Eye, Trash2, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function QuoteIndex({ quotes, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.quotes.index'), {
            search,
            status: statusFilter,
            priority: priorityFilter,
        }, {
            preserveState: true,
        });
    };

    const handleStatusChange = (quoteId, newStatus) => {
        if (confirm('Update quote status?')) {
            router.put(route('admin.quotes.update', quoteId), {
                status: newStatus,
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleDelete = (quoteId) => {
        if (confirm('Are you sure you want to delete this quote request?')) {
            router.delete(route('admin.quotes.destroy', quoteId), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            new: 'bg-blue-100 text-blue-800',
            contacted: 'bg-purple-100 text-purple-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            quoted: 'bg-indigo-100 text-indigo-800',
            won: 'bg-green-100 text-green-800',
            lost: 'bg-red-100 text-red-800',
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityBadge = (priority) => {
        const styles = {
            low: 'bg-gray-100 text-gray-600',
            medium: 'bg-orange-100 text-orange-600',
            high: 'bg-red-100 text-red-600',
        };
        return styles[priority] || 'bg-gray-100 text-gray-600';
    };

    return (
        <AdminLayout>
            <Head title="Manage Quotes" />

            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
                <div className="text-sm text-gray-500">
                    Total: {quotes.total} requests
                </div>
            </div>

            {/* Filters */}
            <Card className="p-4 mb-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Name, email, company..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                        >
                            <option value="">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="quoted">Quoted</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <Button type="submit" variant="primary" className="w-full">
                            <Filter size={18} className="mr-2" />
                            Apply Filters
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quotes.data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No quote requests found.
                                    </td>
                                </tr>
                            ) : (
                                quotes.data.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{quote.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                                                {quote.unread_emails_count > 0 && (
                                                    <span className="flex items-center justify-center w-5 h-5 bg-red-100 text-red-600 rounded-full text-xs font-bold" title={`${quote.unread_emails_count} unread emails`}>
                                                        {quote.unread_emails_count}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">{quote.email}</div>
                                            {quote.company && <div className="text-xs text-gray-400">{quote.company}</div>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.service_type || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.budget_range || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(quote.priority)}`}>
                                                {quote.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={quote.status}
                                                onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                                                className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusBadge(quote.status)}`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="quoted">Quoted</option>
                                                <option value="won">Won</option>
                                                <option value="lost">Lost</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(quote.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={route('admin.quotes.show', quote.id)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(quote.id)}
                                                    className="text-red-400 hover:text-red-600"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {quotes.links && quotes.links.length > 3 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{quotes.from}</span> to <span className="font-medium">{quotes.to}</span> of{' '}
                                <span className="font-medium">{quotes.total}</span> results
                            </div>
                            <div className="flex space-x-2">
                                {quotes.links.map((link, key) => (
                                    link.url ? (
                                        <Link
                                            key={key}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded ${link.active
                                                ? 'bg-envoklear-green text-white border-envoklear-green'
                                                : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={key}
                                            className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </AdminLayout>
    );
}
