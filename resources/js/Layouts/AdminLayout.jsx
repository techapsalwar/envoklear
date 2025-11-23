import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Blogs', href: route('admin.blogs.index'), icon: FileText },
        { name: 'Quotes', href: route('admin.quotes.index'), icon: MessageSquare },
        { name: 'Subscribers', href: route('admin.subscribers.index'), icon: Users },
        { name: 'Settings', href: '#', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-envoklear-dark text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0`}
            >
                <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                    <Link href="/" className="text-xl font-bold font-display">
                        Envo<span className="text-envoklear-green">Klear</span> Admin
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${route().current(item.href)
                                    ? 'bg-envoklear-green text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center ml-auto space-x-4">
                            <button className="text-gray-400 hover:text-gray-600 relative">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700 mr-2">{auth.user.name}</span>
                                <div className="h-8 w-8 rounded-full bg-envoklear-green text-white flex items-center justify-center font-bold">
                                    {auth.user.name.charAt(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
