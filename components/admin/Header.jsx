'use client'
import {
    IconCalendarEvent,
    IconHome,
    IconLayoutDashboard,
    IconMenu2,
    IconPackage,
    IconPackages,
    IconUsers,
    IconX
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const AdminHeader = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: IconLayoutDashboard },
        { name: 'Manage Decorators', href: '/admin/decorators', icon: IconUsers },
        { name: 'Manage Services', href: '/admin/services', icon: IconPackage },
        { name: 'Manage Bookings', href: '/admin/bookings', icon: IconCalendarEvent },
        { name: 'Manage Packages', href: '/admin/package', icon: IconPackages }
    ];


    return (
        <>
        
            <header className="bg-[#0b141f] backdrop-blur-sm border-b border-[rgba(192,221,255,0.15)] sticky top-0 z-40">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                    
                    
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-[rgba(192,221,255,0.1)] transition-colors"
                        >
                            {isSidebarOpen ? (
                                <IconX size={24} className="text-[#DEEBFA]" />
                            ) : (
                                <IconMenu2 size={24} className="text-[#DEEBFA]" />
                            )}
                        </button>

                        <Link href="/admin" className="hidden lg:flex items-center gap-2">
                            
                            <span className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">
                                StyleDecor Admin
                            </span>
                        </Link>

                        <Link href="/admin/dashboard" className="lg:hidden flex items-center gap-2">
                            <span className="font-urbanist text-[18px] font-bold text-[#DEEBFA]">
                                Admin Panel
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                           
                           
                            <Link
                                href="/"
                                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[rgba(192,221,255,0.1)] transition-colors"
                            >
                                <IconHome size={20} className="text-[rgba(192,221,255,0.7)]" />
                                <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] hidden md:block">
                                    Back to Site
                                </span>
                            </Link>

                            <div className="flex items-center gap-3 px-3 py-2 bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg">
                                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[rgba(192,221,255,0.3)]">
                                    <img
                                        src={session?.user?.image || 'https://via.placeholder.com/40'}
                                        alt={session?.user?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        {session?.user?.name}
                                    </p>
                                    <p className="font-urbanist text-[11px] text-[rgba(222,235,250,0.60)]">
                                        Administrator
                                    </p>
                                </div>
                            </div>

                    
                        </div>
                    </div>
                </div>
            </header>

            <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-[#0b141f] backdrop-blur-sm border-r border-[rgba(192,221,255,0.15)] overflow-y-auto">
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                        : 'hover:bg-[rgba(192,221,255,0.1)] text-[rgba(222,235,250,0.80)]'
                                }`}
                            >
                                <Icon size={20} />
                                <span className="font-urbanist text-[14px] font-semibold">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {isSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setIsSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#0B141F] border-r border-[rgba(192,221,255,0.15)] overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                               
                                    <span className="font-urbanist text-[18px] font-bold text-[#DEEBFA]">
                                        StyleDecor
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 rounded-lg hover:bg-[rgba(192,221,255,0.1)] transition-colors"
                                >
                                    <IconX size={24} className="text-[#DEEBFA]" />
                                </button>
                            </div>

                            <nav className="space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                                    : 'hover:bg-[rgba(192,221,255,0.1)] text-[rgba(222,235,250,0.80)]'
                                            }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-urbanist text-[14px] font-semibold">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminHeader;