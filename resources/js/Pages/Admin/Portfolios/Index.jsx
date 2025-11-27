import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import { Plus, Edit, Trash2, Eye, ExternalLink, GripVertical } from 'lucide-react';

export default function PortfolioIndex({ portfolios }) {
    return (
        <AdminLayout>
            <Head title="Manage Portfolios" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Items</h1>
                <Button href={route('admin.portfolios.create')} variant="primary" className="flex items-center">
                    <Plus size={18} className="mr-2" /> Add New
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {portfolios && portfolios.length > 0 ? (
                                portfolios.map((portfolio) => (
                                    <tr key={portfolio.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-gray-400">
                                                <GripVertical size={16} className="mr-2" />
                                                {portfolio.sort_order}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`w-16 h-10 rounded bg-gradient-to-br ${portfolio.color}`}></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{portfolio.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{portfolio.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {portfolio.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                portfolio.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {portfolio.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-1">
                                                <span className={`w-6 h-6 flex items-center justify-center rounded text-xs ${portfolio.image_desktop ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`} title="Desktop">D</span>
                                                <span className={`w-6 h-6 flex items-center justify-center rounded text-xs ${portfolio.image_tablet ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`} title="Tablet">T</span>
                                                <span className={`w-6 h-6 flex items-center justify-center rounded text-xs ${portfolio.image_mobile ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`} title="Mobile">M</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                {portfolio.website_url && (
                                                    <a href={portfolio.website_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                                <Link href={route('admin.portfolios.edit', portfolio.id)} className="text-blue-400 hover:text-blue-600">
                                                    <Edit size={18} />
                                                </Link>
                                                <Link href={route('admin.portfolios.destroy', portfolio.id)} method="delete" as="button" className="text-red-400 hover:text-red-600" onClick={(e) => {
                                                    if (!confirm('Are you sure you want to delete this portfolio item?')) {
                                                        e.preventDefault();
                                                    }
                                                }}>
                                                    <Trash2 size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No portfolio items yet. Click "Add New" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminLayout>
    );
}
