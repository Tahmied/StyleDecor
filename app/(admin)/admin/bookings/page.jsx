'use client'
import api from '@/lib/axios';
import { IconCalendar, IconCheck, IconClock, IconCoin, IconCurrencyDollar, IconMapPin, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [filter, setFilter] = useState('pending');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/api/v1/booking/allBookings');
            if (response.data.success) {
                setBookings(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, status) => {
        setProcessingId(bookingId);
        try {
            const response = await api.post('/api/v1/booking/updateBookingStatus', {
                bookingId,
                status: status === 'approve' ? 'Assigned' : 'cancelled'
            });
            
            if (response.data.success) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'assigned':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true;
        if (filter === 'pending') return booking.status.toLowerCase() === 'pending';
        if (filter === 'approved') return booking.status.toLowerCase() === 'assigned';
        if (filter === 'cancelled') return booking.status.toLowerCase() === 'cancelled';
        return true;
    });

    const filterOptions = [
        { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status.toLowerCase() === 'pending').length },
        { value: 'approved', label: 'Approved', count: bookings.filter(b => b.status.toLowerCase() === 'assigned').length },
        { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length },
        { value: 'all', label: 'All', count: bookings.length },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b141f] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C0DDFF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b141f] lg:pl-64 pt-8">
            <div className="p-4 sm:py-0 sm:px-8 lg:py-0">
                <div className="mb-8">
                    <h1 className="font-urbanist text-[28px] sm:text-[32px] font-bold text-[#DEEBFA] mb-2">
                        Manage Bookings
                    </h1>
                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                        Review and manage all booking requests
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setFilter(option.value)}
                            className={`px-4 cursor-pointer py-2.5 rounded-lg font-urbanist text-[14px] font-semibold transition-all duration-300 ${
                                filter === option.value
                                    ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                    : 'bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:bg-[rgba(192,221,255,0.1)]'
                            }`}
                        >
                            {option.label}
                            <span className={`ml-2 cursor-pointer px-2 py-0.5 rounded-full text-[11px] ${
                                filter === option.value
                                    ? 'bg-[rgba(11,20,31,0.2)]'
                                    : 'bg-[rgba(192,221,255,0.1)]'
                            }`}>
                                {option.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredBookings.length === 0 ? (
                        <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-8 text-center">
                            <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.60)]">
                                No {filter !== 'all' ? filter : ''} bookings found
                            </p>
                        </div>
                    ) : (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-4 sm:p-6 hover:bg-[rgba(192,221,255,0.08)] transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1 space-y-4">
                                      
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-urbanist text-[18px] sm:text-[20px] font-semibold text-[#DEEBFA] mb-1">
                                                    {booking.serviceName}
                                                </h3>
                                                <div className="flex items-center gap-2 text-[#C0DDFF]">
                                                    <IconCurrencyDollar size={16} />
                                                    <span className="font-urbanist text-[14px] font-medium">
                                                        {booking.servicePrice}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        {/* Customer & Decorator Info */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                                    Customer
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={booking.customerImage || 'https://via.placeholder.com/40'}
                                                        alt={booking.customerName}
                                                        className="w-10 h-10 rounded-full border-2 border-[rgba(192,221,255,0.3)] object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-urbanist text-[14px] font-medium text-[#DEEBFA]">
                                                            {booking.customerName}
                                                        </p>
                                                        {booking.customerPhoneNumber && (
                                                            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                {booking.customerPhoneNumber}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                                    Decorator
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={booking.decoratorImage || 'https://via.placeholder.com/40'}
                                                        alt={booking.decoratorName}
                                                        className="w-10 h-10 rounded-full border-2 border-[rgba(192,221,255,0.3)] object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-urbanist text-[14px] font-medium text-[#DEEBFA]">
                                                            {booking.decoratorName}
                                                        </p>
                                                        {booking.decoratorNum && (
                                                            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                {booking.decoratorNum}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-[rgba(222,235,250,0.70)]">
                                            <div className="flex items-center gap-2">
                                                <IconCalendar size={16} />
                                                <span className="font-urbanist text-[13px]">
                                                    {formatDate(booking.eventDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IconClock size={16} />
                                                <span className="font-urbanist text-[13px]">
                                                    {booking.eventTime}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IconMapPin size={16} />
                                                <span className="font-urbanist text-[13px]">
                                                    {booking.eventLocation}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IconCoin size={16} />
                                                <span className="font-urbanist text-[13px]">
                                                    {booking.paymentStatus}
                                                </span>
                                            </div>
                                        </div>

                                        {booking.bookingNotes && (
                                            <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-3">
                                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide mb-1">
                                                    Notes
                                                </p>
                                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)]">
                                                    {booking.bookingNotes}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {booking.status.toLowerCase() === 'pending' && (
                                        <div className="flex lg:flex-col gap-3 lg:min-w-[120px]">
                                            <button
                                                onClick={() => handleStatusUpdate(booking._id, 'approve')}
                                                disabled={processingId === booking._id}
                                                className="flex-1 cursor-pointer lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-urbanist text-[14px] font-semibold"
                                            >
                                                <IconCheck size={18} />
                                                Assign To Decorator
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking._id, 'reject')}
                                                disabled={processingId === booking._id}
                                                className="flex-1 cursor-pointer lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-urbanist text-[14px] font-semibold"
                                            >
                                                <IconX size={18} />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;