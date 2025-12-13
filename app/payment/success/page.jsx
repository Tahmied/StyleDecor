'use client'
import {
    IconCalendar,
    IconCheck,
    IconClock,
    IconCurrencyTaka,
    IconHome,
    IconLoader,
    IconMapPin,
    IconReceipt,
    IconUser
} from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
const PaymentSuccess = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) return;

        const VerifyPayment = async () => {
            try {
                const response = await api.post(`/api/v1/payment/verify-payment`, {
                    sessionId: sessionId
                });

                console.log("Full Backend Response:", response.data);
                setBookingData(response.data.data);

            } catch (error) {
                console.error("Verification failed:", error);
            } finally {
                setLoading(false);
            }
        };
        VerifyPayment();

    }, [sessionId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader size={48} className="text-[#C0DDFF] animate-spin" />
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                        Processing your payment...
                    </p>
                </div>
            </div>
        );
    }

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center text-white">
                <p>Unable to verify payment details. Please contact support.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B141F] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-full mb-6 animate-scale-in shadow-lg shadow-[rgba(76,175,80,0.3)]">
                        <IconCheck size={48} className="text-white" strokeWidth={3} />
                    </div>
                    <h1 className="font-urbanist text-[36px] md:text-[48px] font-bold text-[#DEEBFA] mb-3">
                        Payment Successful
                    </h1>
                    <p className="font-urbanist text-[16px] md:text-[18px] text-[rgba(222,235,250,0.70)] max-w-2xl mx-auto">
                        Thank you for your booking! Your decoration service has been confirmed, admin will assign a decorator team and the team will contact you shortly.
                    </p>
                </div>

                <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden mb-6 animate-slide-up">
                    <div className="bg-gradient-to-r from-[rgba(192,221,255,0.1)] to-[rgba(192,221,255,0.05)] border-b border-[rgba(192,221,255,0.15)] p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">

                                <div>
                                    <h2 className="font-urbanist text-[24px] font-bold text-[#DEEBFA] mb-1">
                                        {bookingData.serviceName}
                                    </h2>

                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-2 bg-[rgba(76,175,80,0.15)] border border-[rgba(76,175,80,0.3)] rounded-full font-urbanist text-[12px] font-semibold text-[#4CAF50]">
                                    {bookingData.status.toUpperCase()}
                                </span>
                                <span className="px-4 py-2 bg-[rgba(76,175,80,0.15)] border border-[rgba(76,175,80,0.3)] rounded-full font-urbanist text-[12px] font-semibold text-[#4CAF50]">
                                    PAID
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <IconCurrencyTaka size={24} className="text-[#C0DDFF]" />
                                    <h3 className="font-urbanist text-[14px] font-semibold text-[rgba(222,235,250,0.70)]">
                                        Amount Paid
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <IconCurrencyTaka size={28} className="text-[#4CAF50]" />
                                    <p className="font-urbanist text-[32px] font-bold text-[#4CAF50]">
                                        {bookingData.servicePrice.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <IconReceipt size={24} className="text-[#C0DDFF]" />
                                    <h3 className="font-urbanist text-[14px] font-semibold text-[rgba(222,235,250,0.70)]">
                                        Transaction ID
                                    </h3>
                                </div>
                                <p className="font-urbanist text-[16px] font-mono font-semibold text-[#DEEBFA] break-all">
                                    {bookingData.transactionId}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-[rgba(192,221,255,0.15)] pt-6">
                            <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-4">
                                Event Details
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="flex items-start gap-3">
                                    <IconCalendar size={22} className="text-[rgba(192,221,255,0.7)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-1">
                                            Event Date
                                        </p>
                                        <p className="font-urbanist text-[15px] font-semibold text-[#DEEBFA]">
                                            {formatDate(bookingData.eventDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <IconClock size={22} className="text-[rgba(192,221,255,0.7)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-1">
                                            Event Time
                                        </p>
                                        <p className="font-urbanist text-[15px] font-semibold text-[#DEEBFA]">
                                            {bookingData.eventTime}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <IconMapPin size={22} className="text-[rgba(192,221,255,0.7)] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-1">
                                            Event Location
                                        </p>
                                        <p className="font-urbanist text-[15px] font-semibold text-[#DEEBFA]">
                                            {bookingData.eventLocation}
                                        </p>
                                    </div>
                                </div>

                                {bookingData.serviceCategory && (
                                    <div className="flex items-start gap-3">
                                        <IconHome size={22} className="text-[rgba(192,221,255,0.7)] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-1">
                                                Service Category
                                            </p>
                                            <p className="font-urbanist text-[15px] font-semibold text-[#DEEBFA]">
                                                {bookingData.serviceCategory}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {bookingData.bookingNotes && (
                            <div className="border-t border-[rgba(192,221,255,0.15)] pt-6">
                                <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-3">
                                    Special Instructions
                                </h3>
                                <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg p-4">
                                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] leading-relaxed">
                                        {bookingData.bookingNotes}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-[rgba(192,221,255,0.15)] pt-6">
                            <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-4">
                                Your Decorator
                            </h3>
                            <div className="flex items-center gap-4 bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg p-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[rgba(192,221,255,0.3)] flex-shrink-0">
                                    <img
                                        src={bookingData.decoratorImage}
                                        alt={bookingData.decoratorName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-1">
                                        {bookingData.decoratorName}
                                    </p>
                                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        Will contact you soon to discuss details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link href="/dashboard" className="flex-1">
                        <button className="w-full cursor-pointer bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[15px] py-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 flex items-center justify-center gap-2">
                            <IconUser size={20} />
                            View My Bookings
                        </button>
                    </Link>
                    <Link href="/" className="flex-1">
                        <button className="w-full cursor-pointer bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[15px] py-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <IconHome size={20} />
                            Back to Home
                        </button>
                    </Link>
                </div>

                <div className="bg-[rgba(33,150,243,0.1)] border border-[rgba(33,150,243,0.3)] rounded-xl p-5 text-center">
                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] leading-relaxed">
                        A confirmation email with booking details has been sent to <span className="font-semibold text-[#2196F3]">{bookingData.customerName}</span>.
                        Your decorator will reach out within 24 hours to finalize the details.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scale-in {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }

                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0); 
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out 0.2s both;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;