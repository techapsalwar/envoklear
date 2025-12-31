import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { ArrowLeft, Mail, Phone, Calendar, Building, Globe, DollarSign, Send, MessageSquare } from 'lucide-react';

export default function QuoteShow({ quote }) {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const { data, setData, put, processing } = useForm({
        status: quote.status,
        priority: quote.priority,
        notes: quote.notes || '',
    });

    const replyForm = useForm({
        subject: `Re: Your Quote Request - ${quote.service_type || 'EnvoKlear'}`,
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.quotes.update', quote.id), {
            preserveScroll: true,
        });
    };

    const handleReply = (e) => {
        e.preventDefault();
        replyForm.post(route('admin.quotes.reply', quote.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowReplyForm(false);
                replyForm.reset();
            },
        });
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

    return (
        <AdminLayout>
            <Head title={`Quote #${quote.id}`} />

            <div className="mb-6">
                <Link href={route('admin.quotes.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Quotes
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Quote Request #{quote.id}</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="flex items-center gap-2"
                    >
                        <MessageSquare size={16} />
                        {showReplyForm ? 'Cancel Reply' : 'Reply to Client'}
                    </Button>
                </div>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
                <Card className="p-6 mb-6 border-2 border-envoklear-green">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Send size={20} className="text-envoklear-green" />
                        Send Email Reply
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        This will send an email to: <strong className="text-gray-900">{quote.email}</strong>
                    </p>
                    <form onSubmit={handleReply} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                value={replyForm.data.subject}
                                onChange={(e) => replyForm.setData('subject', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                                placeholder="Email subject..."
                            />
                            {replyForm.errors.subject && (
                                <p className="text-red-500 text-sm mt-1">{replyForm.errors.subject}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                value={replyForm.data.message}
                                onChange={(e) => replyForm.setData('message', e.target.value)}
                                rows="6"
                                placeholder="Type your reply message here..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                            ></textarea>
                            {replyForm.errors.message && (
                                <p className="text-red-500 text-sm mt-1">{replyForm.errors.message}</p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                processing={replyForm.processing}
                                className="flex items-center gap-2"
                            >
                                <Send size={16} />
                                Send Reply
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowReplyForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Client Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-gray-900">{quote.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-gray-900 flex items-center">
                                    <Mail size={16} className="mr-2 text-gray-400" />
                                    <a href={`mailto:${quote.email}`} className="text-envoklear-green hover:underline">{quote.email}</a>
                                </p>
                            </div>
                            {quote.phone && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                                    <p className="mt-1 text-gray-900 flex items-center">
                                        <Phone size={16} className="mr-2 text-gray-400" />
                                        {quote.phone}
                                    </p>
                                </div>
                            )}
                            {quote.whatsapp && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">WhatsApp</label>
                                    <p className="mt-1 text-gray-900">{quote.whatsapp}</p>
                                </div>
                            )}
                            {quote.company && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Company</label>
                                    <p className="mt-1 text-gray-900 flex items-center">
                                        <Building size={16} className="mr-2 text-gray-400" />
                                        {quote.company}
                                    </p>
                                </div>
                            )}
                            {quote.website && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Website</label>
                                    <p className="mt-1 text-gray-900 flex items-center">
                                        <Globe size={16} className="mr-2 text-gray-400" />
                                        <a href={quote.website} target="_blank" rel="noopener noreferrer" className="text-envoklear-green hover:underline">{quote.website}</a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Email Conversation History */}
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MessageSquare size={20} className="text-envoklear-green" />
                            Email Conversation
                        </h2>

                        {quote.email_messages && quote.email_messages.length > 0 ? (
                            <div className="space-y-6">
                                {quote.email_messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${msg.direction === 'outbound'
                                                    ? 'bg-gradient-to-br from-envoklear-green/10 to-transparent border border-envoklear-green/20 rounded-tr-none'
                                                    : 'bg-white border border-gray-100 rounded-tl-none'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3 text-xs border-b border-gray-100/50 pb-2">
                                                <span className={`font-bold flex items-center gap-2 ${msg.direction === 'outbound' ? 'text-envoklear-green' : 'text-gray-700'
                                                    }`}>
                                                    {msg.direction === 'outbound' ? (
                                                        <>
                                                            <span>Us</span>
                                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-envoklear-green/10">Admin</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{msg.from_name || quote.name}</span>
                                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100">Client</span>
                                                        </>
                                                    )}
                                                </span>
                                                <span className="text-gray-400">
                                                    {new Date(msg.created_at).toLocaleString([], {
                                                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                                                {msg.subject && (
                                                    <div className="mb-2 font-medium text-gray-900 pb-2 border-b border-gray-100/50">
                                                        Subject: {msg.subject}
                                                    </div>
                                                )}
                                                {msg.body_text || <div dangerouslySetInnerHTML={{ __html: msg.body_html }} className="prose prose-sm max-w-none" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <Mail size={32} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">No email history yet</p>
                                <p className="text-sm text-gray-400 mt-1">Replies sent via dashboard or received from client will appear here.</p>
                            </div>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Project Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Service Type</label>
                                <p className="mt-1 text-gray-900">{quote.service_type || 'Not specified'}</p>
                            </div>
                            {quote.budget_range && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Budget Range</label>
                                    <p className="mt-1 text-gray-900 flex items-center">
                                        <DollarSign size={16} className="mr-2 text-gray-400" />
                                        {quote.budget_range}
                                    </p>
                                </div>
                            )}
                            {quote.deadline && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Deadline</label>
                                    <p className="mt-1 text-gray-900 flex items-center">
                                        <Calendar size={16} className="mr-2 text-gray-400" />
                                        {new Date(quote.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Requirements</label>
                                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{quote.requirements}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Status & Priority</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                                >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="quoted">Quoted</option>
                                    <option value="won">Won</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <select
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows="4"
                                    placeholder="Add internal notes..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-envoklear-green focus:border-envoklear-green"
                                ></textarea>
                            </div>
                            <Button type="submit" variant="primary" className="w-full" processing={processing}>
                                Update Quote
                            </Button>
                        </form>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Meta Information</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500">Received:</span>
                                <p className="text-gray-900">{new Date(quote.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Source:</span>
                                <p className="text-gray-900">{quote.source || 'Website'}</p>
                            </div>
                            {quote.ip_address && (
                                <div>
                                    <span className="text-gray-500">IP Address:</span>
                                    <p className="text-gray-900">{quote.ip_address}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
