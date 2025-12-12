'use client'
import api from '@/lib/axios';
import {
    IconAlertCircle,
    IconCalendarEvent,
    IconClock,
    IconCurrencyTaka,
    IconLoader,
    IconMapPin,
    IconReceipt,
    IconUser
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UserProfilePage from '../profile/page';
import DecoratorDashboard from './decoratorDashboard';

const UserDashboard = () => {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState('profile');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        if (activeTab === 'bookings') {
            fetchBookings();
        }
    }, [activeTab]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/v1/booking/my-bookings');
            if (response.data.success) {
                setBookings(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
            Swal.fire({
                icon: 'error',
                text: 'Failed to load bookings',
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setLoading(false);
        }
    };

    const paymentHistory = [
        {
            id: 1,
            serviceName: 'Elegant Wedding Decoration',
            amount: 50000,
            paymentDate: '2025-12-10',
            paymentMethod: 'Stripe',
            transactionId: 'TXN123456789',
            status: 'completed'
        },
        {
            id: 2,
            serviceName: 'Home Interior Decoration',
            amount: 25000,
            paymentDate: '2025-12-01',
            paymentMethod: 'Stripe',
            transactionId: 'TXN987654321',
            status: 'completed'
        }
    ];

    const getStatusBadge = (status) => {
        const statusStyles = {
            confirmed: 'bg-[rgba(33,150,243,0.15)] border-[rgba(33,150,243,0.3)] text-[#2196F3]',
            pending: 'bg-[rgba(255,152,0,0.15)] border-[rgba(255,152,0,0.3)] text-[#FF9800]',
            completed: 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#4CAF50]',
            cancelled: 'bg-[rgba(244,67,54,0.15)] border-[rgba(244,67,54,0.3)] text-[#F44336]'
        };
        return statusStyles[status?.toLowerCase()] || statusStyles.pending;
    };

    const getPaymentBadge = (status) => {
        const paymentStyles = {
            paid: 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#4CAF50]',
            pending: 'bg-[rgba(255,152,0,0.15)] border-[rgba(255,152,0,0.3)] text-[#FF9800]',
            failed: 'bg-[rgba(244,67,54,0.15)] border-[rgba(244,67,54,0.3)] text-[#F44336]'
        };
        return paymentStyles[status?.toLowerCase()] || paymentStyles.pending;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCancelBooking = (booking) => {
        if (booking.status?.toLowerCase() === 'completed') {
            Swal.fire({
                icon: 'warning',
                text: 'Cannot cancel a completed booking',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        if (booking.status?.toLowerCase() === 'cancelled') {
            Swal.fire({
                icon: 'info',
                text: 'This booking is already cancelled',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const confirmCancellation = async () => {
        if (!selectedBooking) return;

        setCancelling(true);
        try {
            const response = await api.post('/api/v1/users/updateBookingStutes', {
                bookingId: selectedBooking._id,
                status: 'cancelled'
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    text: 'Booking cancelled successfully!',
                    showConfirmButton: false,
                    timer: 2000
                });

                await fetchBookings();
                setShowCancelModal(false);
                setSelectedBooking(null);
            }
        } catch (err) {
            console.error('Error cancelling booking:', err);
            Swal.fire({
                icon: 'error',
                text: err.response?.data?.message || 'Failed to cancel booking',
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setCancelling(false);
        }
    };

    const canCancelBooking = (booking) => {
        const status = booking.status?.toLowerCase();
        return status !== 'assigned' && status !== 'cancelled' && status !== 'paid';
    };

    return (
        <>
            {
                session?.user.role == 'decorator' ? (<DecoratorDashboard/>) : ''
            }
            <div className="min-h-screen bg-[#0B141F] py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="font-urbanist text-[36px] md:text-[48px] font-bold text-[#DEEBFA] mb-2">
                            My Dashboard
                        </h1>
                        <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                            Manage your bookings, profile, and payment history
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-urbanist font-semibold text-[14px] transition-all duration-300 ${activeTab === 'profile'
                                ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                : 'bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:bg-[rgba(192,221,255,0.1)]'
                                }`}
                        >
                            <IconUser size={20} />
                            My Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-urbanist font-semibold text-[14px] transition-all duration-300 ${activeTab === 'bookings'
                                ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                : 'bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:bg-[rgba(192,221,255,0.1)]'
                                }`}
                        >
                            <IconCalendarEvent size={20} />
                            My Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('payments')}
                            className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg font-urbanist font-semibold text-[14px] transition-all duration-300 ${activeTab === 'payments'
                                ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                : 'bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:bg-[rgba(192,221,255,0.1)]'
                                }`}
                        >
                            <IconReceipt size={20} />
                            Payment History
                        </button>
                    </div>

                    <div>
                        {activeTab === 'profile' && (
                            <div className="">
                                <UserProfilePage />
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <>
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <IconLoader size={48} className="text-[#C0DDFF] animate-spin mb-4" />
                                        <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                                            Loading bookings...
                                        </p>
                                    </div>
                                ) : bookings.length === 0 ? (
                                    <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-12 text-center">
                                        <IconCalendarEvent size={64} className="text-[rgba(192,221,255,0.3)] mx-auto mb-4" />
                                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                                            No Bookings Yet
                                        </h3>
                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)] mb-6">
                                            You havent made any bookings yet. Browse our services to get started!
                                        </p>
                                        <button className="bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 px-6 rounded-lg hover:brightness-110 transition-all duration-300">
                                            Browse Services
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {bookings.map((booking) => (
                                            <div
                                                key={booking._id}
                                                className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                                            >
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="flex-1 p-6">
                                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                                            <div>
                                                                <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                                                                    {booking.serviceName}
                                                                </h3>
                                                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] mb-2">
                                                                    Decorator: {booking.decoratorName}
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    <span className={`px-3 py-1 rounded-full border font-urbanist text-[11px] font-semibold ${getStatusBadge(booking.status)}`}>
                                                                        {booking.status?.toUpperCase()}
                                                                    </span>
                                                                    <span className={`px-3 py-1 rounded-full border font-urbanist text-[11px] font-semibold ${getPaymentBadge(booking.paymentStatus)}`}>
                                                                        {booking.paymentStatus === 'paid' ? 'PAID' : 'PAYMENT PENDING'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="flex items-center gap-1 justify-end">
                                                                    <IconCurrencyTaka size={20} className="text-[#C0DDFF]" />
                                                                    <span className="font-urbanist text-[24px] font-bold text-[#C0DDFF]">
                                                                        {booking.servicePrice?.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                    Total Amount
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                                            <div className="flex items-center gap-3">
                                                                <IconCalendarEvent size={20} className="text-[rgba(192,221,255,0.7)]" />
                                                                <div>
                                                                    <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                        Event Date
                                                                    </p>
                                                                    <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                                        {formatDate(booking.eventDate)}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <IconClock size={20} className="text-[rgba(192,221,255,0.7)]" />
                                                                <div>
                                                                    <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                        Time
                                                                    </p>
                                                                    <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                                        {booking.eventTime}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {booking.eventLocation && (
                                                                <div className="flex items-start gap-3 sm:col-span-2">
                                                                    <IconMapPin size={20} className="text-[rgba(192,221,255,0.7)] flex-shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                            Location
                                                                        </p>
                                                                        <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                                            {booking.eventLocation}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {booking.bookingNotes && (
                                                                <div className="flex items-start gap-3 sm:col-span-2">
                                                                    <div className="w-full bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg p-3">
                                                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] mb-1">
                                                                            Booking Notes
                                                                        </p>
                                                                        <p className="font-urbanist text-[13px] text-[#DEEBFA]">
                                                                            {booking.bookingNotes}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-wrap gap-3">
                                                            {booking.paymentStatus?.toLowerCase() === 'pending' && (
                                                                <button className="flex-1 sm:flex-none bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-semibold text-[13px] py-2.5 px-6 rounded-lg hover:brightness-110 transition-all duration-300">
                                                                    Pay Now
                                                                </button>
                                                            )}
                                                            {canCancelBooking(booking) && (
                                                                <button
                                                                    onClick={() => handleCancelBooking(booking)}
                                                                    className="flex-1 cursor-pointer sm:flex-none bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.3)] text-[#F44336] font-urbanist font-semibold text-[13px] py-2.5 px-6 rounded-lg hover:bg-[rgba(244,67,54,0.15)] transition-all duration-300"
                                                                >
                                                                    Cancel Booking
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'payments' && (
                            <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden">
                                {paymentHistory.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <IconReceipt size={64} className="text-[rgba(192,221,255,0.3)] mx-auto mb-4" />
                                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                                            No Payment History
                                        </h3>
                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                                            You havent made any payments yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-[rgba(192,221,255,0.08)]">
                                                <tr>
                                                    <th className="text-left py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Service
                                                    </th>
                                                    <th className="text-left py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Transaction ID
                                                    </th>
                                                    <th className="text-left py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Date
                                                    </th>
                                                    <th className="text-left py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Method
                                                    </th>
                                                    <th className="text-right py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Amount
                                                    </th>
                                                    <th className="text-center py-4 px-6 font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paymentHistory.map((payment, index) => (
                                                    <tr
                                                        key={payment.id}
                                                        className={`border-t border-[rgba(192,221,255,0.1)] hover:bg-[rgba(192,221,255,0.05)] transition-colors ${index % 2 === 0 ? 'bg-[rgba(192,221,255,0.02)]' : ''
                                                            }`}
                                                    >
                                                        <td className="py-4 px-6">
                                                            <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                                {payment.serviceName}
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <p className="font-urbanist text-[13px] font-mono text-[rgba(222,235,250,0.80)]">
                                                                {payment.transactionId}
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)]">
                                                                {formatDate(payment.paymentDate)}
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)]">
                                                                {payment.paymentMethod}
                                                            </p>
                                                        </td>
                                                        <td className="py-4 px-6 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <IconCurrencyTaka size={16} className="text-[#C0DDFF]" />
                                                                <span className="font-urbanist text-[15px] font-bold text-[#C0DDFF]">
                                                                    {payment.amount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 text-center">
                                                            <span className={`inline-block px-3 py-1 rounded-full border font-urbanist text-[11px] font-semibold ${payment.status === 'completed'
                                                                ? 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#4CAF50]'
                                                                : 'bg-[rgba(244,67,54,0.15)] border-[rgba(244,67,54,0.3)] text-[#F44336]'
                                                                }`}>
                                                                {payment.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {showCancelModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                        <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.3)] rounded-full">
                                    <IconAlertCircle size={28} className="text-[#F44336]" />
                                </div>
                                <div>
                                    <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">
                                        Cancel Booking?
                                    </h3>
                                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg p-4 mb-6">
                                <p className="font-urbanist text-[14px] text-[#DEEBFA] font-semibold mb-1">
                                    {selectedBooking?.serviceName}
                                </p>
                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.70)]">
                                    Event Date: {formatDate(selectedBooking?.eventDate)}
                                </p>
                            </div>

                            <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] mb-6">
                                Are you sure you want to cancel this booking?
                                {selectedBooking?.paymentStatus?.toLowerCase() === 'paid' &&
                                    ' A refund will be processed within 5-7 business days.'
                                }
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    disabled={cancelling}
                                    className="flex-1 cursor-pointer bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Keep Booking
                                </button>
                                <button
                                    onClick={confirmCancellation}
                                    disabled={cancelling}
                                    className="flex-1 cursor-pointer bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.3)] text-[#F44336] font-urbanist font-semibold text-[14px] py-3 rounded-lg hover:bg-[rgba(244,67,54,0.15)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {cancelling ? (
                                        <>
                                            <IconLoader size={18} className="animate-spin" />
                                            Cancelling...
                                        </>
                                    ) : (
                                        'Yes, Cancel'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};

export default UserDashboard;