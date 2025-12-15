'use client'
import api from '@/lib/axios';
import {
    IconArrowUpRight,
    IconBox,
    IconCalendarStats,
    IconCurrencyTaka,
    IconLoader,
    IconUsers
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/api/v1/payment/analytics');
                if (response.data.success) {
                    setStats(response.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch analytics", err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const avgBookingValue = stats?.totalBookings > 0 
        ? Math.round(stats.totalRevenue / stats.totalBookings) 
        : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex flex-col items-center justify-center lg:pl-64">
                <IconLoader size={48} className="text-[#C0DDFF] animate-spin mb-4" />
                <p className="font-urbanist text-[rgba(222,235,250,0.6)]">Loading Analytics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center lg:pl-64">
                <p className="text-red-400 font-urbanist">{error}</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0B141F] border border-[rgba(192,221,255,0.2)] p-3 rounded-lg shadow-xl z-50">
                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.8)] mb-1">{label}</p>
                    <p className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                        {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-[#0B141F] lg:pl-64 py-8 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto pl-4">
                
                <div className="mb-8">
                    <h1 className="font-urbanist text-[28px] sm:text-[32px] font-bold text-[#DEEBFA] mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                        Real-time overview of your business performance
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-5 rounded-2xl relative overflow-hidden group hover:bg-[rgba(192,221,255,0.05)] transition-all">
                       
                        <div className="p-2.5 bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-lg w-fit mb-4 shadow-lg shadow-[#4CAF50]/20">
                            <IconCurrencyTaka size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.6)] uppercase tracking-wider mb-1">
                            Total Revenue
                        </p>
                        <h3 className="font-urbanist text-[24px] sm:text-[28px] font-bold text-[#DEEBFA]">
                            {stats?.totalRevenue?.toLocaleString() || 0}
                        </h3>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-5 rounded-2xl relative overflow-hidden group hover:bg-[rgba(192,221,255,0.05)] transition-all">
                       
                        <div className="p-2.5 bg-gradient-to-r from-[#2196F3] to-[#1976D2] rounded-lg w-fit mb-4 shadow-lg shadow-[#2196F3]/20">
                            <IconCalendarStats size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.6)] uppercase tracking-wider mb-1">
                            Total Bookings
                        </p>
                        <h3 className="font-urbanist text-[24px] sm:text-[28px] font-bold text-[#DEEBFA]">
                            {stats?.totalBookings?.toLocaleString() || 0}
                        </h3>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-5 rounded-2xl relative overflow-hidden group hover:bg-[rgba(192,221,255,0.05)] transition-all">
                       
                        <div className="p-2.5 bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] rounded-lg w-fit mb-4 shadow-lg shadow-[#9C27B0]/20">
                            <IconUsers size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.6)] uppercase tracking-wider mb-1">
                            Decorators
                        </p>
                        <h3 className="font-urbanist text-[24px] sm:text-[28px] font-bold text-[#DEEBFA]">
                            {stats?.activeDecorators?.toLocaleString() || 0}
                        </h3>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-5 rounded-2xl relative overflow-hidden group hover:bg-[rgba(192,221,255,0.05)] transition-all">
                        
                        <div className="p-2.5 bg-gradient-to-r from-[#FF9800] to-[#F57C00] rounded-lg w-fit mb-4 shadow-lg shadow-[#FF9800]/20">
                            <IconArrowUpRight size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.6)] uppercase tracking-wider mb-1">
                            Avg. Booking Value
                        </p>
                        <h3 className="font-urbanist text-[24px] sm:text-[28px] font-bold text-[#DEEBFA]">
                            {avgBookingValue.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    
                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-6 rounded-2xl">
                        <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-6">
                            Revenue History
                        </h3>
                        <div className="h-[300px] w-full">
                            {stats?.monthlyRevenue && stats.monthlyRevenue.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.monthlyRevenue}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C0DDFF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#C0DDFF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(192,221,255,0.1)" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="rgba(222,235,250,0.5)" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false} 
                                        />
                                        <YAxis 
                                            stroke="rgba(222,235,250,0.5)" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false}
                                            tickFormatter={(value) => `${value / 1000}k`} 
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(192,221,255,0.3)', strokeWidth: 1 }} />
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="#C0DDFF" 
                                            strokeWidth={3}
                                            fillOpacity={1} 
                                            fill="url(#colorRevenue)" 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-[rgba(222,235,250,0.4)]">
                                    <IconCalendarStats size={40} className="mb-2 opacity-50"/>
                                    <p className="font-urbanist text-[14px]">No revenue data available yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] p-6 rounded-2xl">
                        <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-6">
                            Top Service Demand
                        </h3>
                        <div className="h-[300px] w-full">
                            {stats?.serviceDemand && stats.serviceDemand.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.serviceDemand} layout="vertical" margin={{ left: 0, right: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(192,221,255,0.1)" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis 
                                            dataKey="name" 
                                            type="category" 
                                            width={140}
                                            stroke="rgba(222,235,250,0.8)" 
                                            fontSize={11} 
                                            tickLine={false} 
                                            axisLine={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(192,221,255,0.05)' }} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                            {stats.serviceDemand.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#C0DDFF' : '#A0B8D4'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-[rgba(222,235,250,0.4)]">
                                    <IconBox size={40} className="mb-2 opacity-50"/>
                                    <p className="font-urbanist text-[14px]">No booking data available yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA]">
                            Service Performance
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        {stats?.serviceDemand && stats.serviceDemand.length > 0 ? (
                            stats.serviceDemand.map((service, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-[rgba(11,20,31,0.3)] rounded-xl border border-[rgba(192,221,255,0.05)] hover:border-[rgba(192,221,255,0.15)] transition-all">
                                    <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                                        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[#0B141F] font-bold font-urbanist ${
                                            index === 0 ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 
                                            index === 1 ? 'bg-gradient-to-r from-[#C0C0C0] to-[#E0E0E0]' :
                                            index === 2 ? 'bg-gradient-to-r from-[#CD7F32] to-[#B87333]' :
                                            'bg-[rgba(192,221,255,0.1)] text-[#C0DDFF]'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <span className="font-urbanist text-[15px] text-[#DEEBFA] font-medium truncate block">
                                            {service.name}
                                        </span>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="font-urbanist text-[16px] font-bold text-[#C0DDFF]">
                                            {service.value}
                                        </span>
                                        <span className="text-[12px] text-[rgba(222,235,250,0.5)] ml-2">bookings</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                             <p className="text-center py-8 font-urbanist text-[rgba(222,235,250,0.5)]">No services have been booked yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;