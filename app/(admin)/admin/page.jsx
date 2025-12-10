'use client'
import api from '@/lib/axios';
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCalendarEvent,
    IconChecks,
    IconClockHour3,
    IconCurrencyTaka,
    IconLoader,
    IconPackage,
    IconUserCheck,
    IconUsers
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalDecorators: 0,
        totalServices: 0,
        totalBookings: 0,
        totalRevenue: 0,
        pendingBookings: 0,
        completedBookings: 0,
        activeDecorators: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            const [decoratorsRes, servicesRes, bookingsRes] = await Promise.all([
                api.get('/api/v1/decorators'),
                api.get('/api/v1/services'),
                api.get('/api/v1/bookings'),
            ]);

            const decorators = decoratorsRes.data.data || [];
            const services = servicesRes.data.data || [];
            const bookings = bookingsRes.data.data || [];

            const pendingCount = bookings.filter(b => b.status === 'pending' || b.status === 'assigned').length;
            const completedCount = bookings.filter(b => b.status === 'completed').length;
            const activeDecCount = decorators.filter(d => d.isActive).length;
            
            const revenue = bookings
                .filter(b => b.paymentStatus === 'paid')
                .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

            setStats({
                totalDecorators: decorators.length,
                totalServices: services.length,
                totalBookings: bookings.length,
                totalRevenue: revenue,
                pendingBookings: pendingCount,
                completedBookings: completedCount,
                activeDecorators: activeDecCount,
            });

            setRecentBookings(bookings.slice(0, 5));
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Revenue',
            value: `৳${stats.totalRevenue.toLocaleString()}`,
            icon: IconCurrencyTaka,
            color: 'from-[#4CAF50] to-[#45a049]',
            bgColor: 'rgba(76,175,80,0.1)',
            borderColor: 'rgba(76,175,80,0.3)',
            trend: '+12.5%',
            trendUp: true
        },
        {
            title: 'Total Bookings',
            value: stats.totalBookings,
            icon: IconCalendarEvent,
            color: 'from-[#2196F3] to-[#1976D2]',
            bgColor: 'rgba(33,150,243,0.1)',
            borderColor: 'rgba(33,150,243,0.3)',
            trend: '+8.3%',
            trendUp: true
        },
        {
            title: 'Active Decorators',
            value: stats.activeDecorators,
            icon: IconUserCheck,
            color: 'from-[#FF9800] to-[#F57C00]',
            bgColor: 'rgba(255,152,0,0.1)',
            borderColor: 'rgba(255,152,0,0.3)',
            trend: '+3',
            trendUp: true
        },
        {
            title: 'Total Services',
            value: stats.totalServices,
            icon: IconPackage,
            color: 'from-[#9C27B0] to-[#7B1FA2]',
            bgColor: 'rgba(156,39,176,0.1)',
            borderColor: 'rgba(156,39,176,0.3)',
            trend: '+5',
            trendUp: true
        },
    ];

    const quickStats = [
        {
            label: 'Pending Bookings',
            value: stats.pendingBookings,
            icon: IconClockHour3,
            color: 'text-[#FF9800]'
        },
        {
            label: 'Completed',
            value: stats.completedBookings,
            icon: IconChecks,
            color: 'text-[#4CAF50]'
        },
        {
            label: 'Total Decorators',
            value: stats.totalDecorators,
            icon: IconUsers,
            color: 'text-[#2196F3]'
        },
    ];

    const getStatusBadgeClass = (status) => {
        const statusClasses = {
            pending: 'bg-[rgba(255,152,0,0.15)] border-[rgba(255,152,0,0.3)] text-[#FF9800]',
            assigned: 'bg-[rgba(33,150,243,0.15)] border-[rgba(33,150,243,0.3)] text-[#2196F3]',
            'planning phase': 'bg-[rgba(156,39,176,0.15)] border-[rgba(156,39,176,0.3)] text-[#9C27B0]',
            'materials prepared': 'bg-[rgba(3,169,244,0.15)] border-[rgba(3,169,244,0.3)] text-[#03A9F4]',
            'on the way to venue': 'bg-[rgba(255,193,7,0.15)] border-[rgba(255,193,7,0.3)] text-[#FFC107]',
            'setup in progress': 'bg-[rgba(255,87,34,0.15)] border-[rgba(255,87,34,0.3)] text-[#FF5722]',
            completed: 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#4CAF50]',
        };
        return statusClasses[status?.toLowerCase()] || statusClasses.pending;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader size={48} className="text-[#C0DDFF] animate-spin" />
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B141F] lg:pl-64 pt-16">
            <div className="p-4 sm:p-6 lg:p-8">
 
                <div className="mb-8">
                    <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                        Welcome back! Heres whats happening with your business today.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.3)] rounded-lg">
                        <p className="font-urbanist text-[14px] text-[#F44336]">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {stat.trendUp ? (
                                            <IconArrowUpRight size={16} className="text-[#4CAF50]" />
                                        ) : (
                                            <IconArrowDownRight size={16} className="text-[#F44336]" />
                                        )}
                                        <span className={`font-urbanist text-[12px] font-semibold ${
                                            stat.trendUp ? 'text-[#4CAF50]' : 'text-[#F44336]'
                                        }`}>
                                            {stat.trend}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)] mb-1">
                                    {stat.title}
                                </h3>
                                <p className="font-urbanist text-[28px] font-bold text-[#DEEBFA]">
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-xl p-4 flex items-center gap-4"
                            >
                                <Icon size={32} className={stat.color} />
                                <div>
                                    <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.70)]">
                                        {stat.label}
                                    </p>
                                    <p className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-2">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">
                                    Recent Bookings
                                </h2>
                                <Link
                                    href="/admin/bookings"
                                    className="font-urbanist text-[14px] text-[#C0DDFF] hover:text-[#DEEBFA] transition-colors font-semibold"
                                >
                                    View All →
                                </Link>
                            </div>

                            {recentBookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <IconCalendarEvent size={48} className="text-[rgba(192,221,255,0.3)] mx-auto mb-3" />
                                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                        No bookings yet
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentBookings.map((booking, index) => (
                                        <div
                                            key={booking._id || index}
                                            className="bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4 hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex-1">
                                                    <h3 className="font-urbanist text-[15px] font-semibold text-[#DEEBFA] mb-1">
                                                        {booking.serviceName || 'Service Booking'}
                                                    </h3>
                                                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                                        {booking.userName || 'Customer'} • {formatDate(booking.bookingDate || booking.createdAt)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full border font-urbanist text-[11px] font-semibold ${getStatusBadgeClass(booking.status)}`}>
                                                        {booking.status || 'Pending'}
                                                    </span>
                                                    <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                                        ৳{booking.totalAmount?.toLocaleString() || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="lg:col-span-1">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <h2 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-6">
                                Quick Actions
                            </h2>
                            <div className="space-y-3">
                                <Link
                                    href="/admin/services"
                                    className="block w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                                >
                                    + Add New Service
                                </Link>
                                <Link
                                    href="/admin/decorators"
                                    className="block w-full bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 text-center"
                                >
                                    Manage Decorators
                                </Link>
                                <Link
                                    href="/admin/bookings"
                                    className="block w-full bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 text-center"
                                >
                                    View All Bookings
                                </Link>
                                <Link
                                    href="/admin/analytics"
                                    className="block w-full bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 text-center"
                                >
                                    View Analytics
                                </Link>
                            </div>
                        </div>


                        <div className="mt-6 bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <h2 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-4">
                                System Status
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        Server Status
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
                                        <span className="font-urbanist text-[13px] text-[#4CAF50] font-semibold">
                                            Online
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        Database
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
                                        <span className="font-urbanist text-[13px] text-[#4CAF50] font-semibold">
                                            Connected
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        Payment Gateway
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
                                        <span className="font-urbanist text-[13px] text-[#4CAF50] font-semibold">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;