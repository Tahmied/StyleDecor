'use client'
import api from '@/lib/axios';
import { IconCalendar, IconCheck, IconClock, IconMapPin, IconMapPinFilled, IconStar, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ServiceDetailsPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const date = searchParams.get('date');
    const serviceId = params.id;
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDecoratorSelection, setShowDecoratorSelection] = useState(false);
    const [selectedDecorator, setSelectedDecorator] = useState(null);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availableDecorators, setAvailableDecorators] = useState([]);
    const [loadingDecorators, setLoadingDecorators] = useState(false);
    const [bookingData, setBookingData] = useState({
        email: session?.user?.email || '',
        name: session?.user?.name || '',
        date: date || '',
        time: '',
        location: '',
        additionalNotes: ''
    });

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/v1/admin/service/${serviceId}`);
                if (response.data.success) {
                    setServiceDetails(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching service details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            fetchServiceDetails();
        }
    }, [serviceId]);

    const fetchAvailableDecorators = async (date) => {
        try {
            setLoadingDecorators(true);
            const response = await api.post('/api/v1/booking/get-available-decors', { date });

            if (response.data.success && response.data.data) {
                setAvailableDecorators(response.data.data);
            } else {
                setAvailableDecorators([]);
            }
        } catch (error) {
            console.error('Error fetching decorators:', error);
            setAvailableDecorators([]);
        } finally {
            setLoadingDecorators(false);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <IconStar
                key={i}
                size={16}
                className={`${i < Math.floor(rating)
                    ? "text-[#FFD700]"
                    : "text-[rgba(192,221,255,0.3)]"
                    }`}
                fill={i < Math.floor(rating) ? "#FFD700" : "none"}
            />
        ));
    };

    const handleContinueToDecorators = async (e) => {
        e.preventDefault();
        const isOnlineService = serviceDetails?.serviceType === 'online';
        const hasRequiredFields = bookingData.date && bookingData.time && (isOnlineService || bookingData.location);

        if (hasRequiredFields) {
            await fetchAvailableDecorators(bookingData.date);
            setShowDecoratorSelection(true);
        }
    };

    const handleDecoratorSelect = (decorator) => {
        setSelectedDecorator(decorator);
    };

    const handleFinalBooking = async () => {
        try {
            const bookingPayload = {
                decoratorId: selectedDecorator._id,
                serviceId: serviceDetails._id,
                eventDate: bookingData.date,
                eventTime: bookingData.time,
                eventLocation: bookingData.location,
                bookingNotes: bookingData.additionalNotes
            };

            console.log('Booking Payload:', bookingPayload);

            const res = await api.post('/api/v1/payment/create-checkout-session', bookingPayload);

            console.log('Booking Response:', res.data);

            if (res.data && res.data.url) {
                Swal.fire({
                    title: 'Please pay for the service',
                    text: 'You will be redirected to the payment page',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    router.push(res.data.url)
                })
            }

            setShowBookingModal(false);
            setShowDecoratorSelection(false);
            setSelectedDecorator(null);
        } catch (error) {
            console.error('Booking Error:', error);
        }
    };


    const handleBookNowClick = () => {
        if (!session?.user) {
            router.push('/login');
            return;
        }
        setBookingData({
            ...bookingData,
            email: session.user.email || '',
            name: session.user.name || ''
        });
        setShowBookingModal(true);
        setShowDecoratorSelection(false);
        setSelectedDecorator(null);
    };

    const handleBackToForm = () => {
        setShowDecoratorSelection(false);
        setSelectedDecorator(null);
    };

    const parseArrayString = (str) => {
        try {
            if (typeof str === 'string' && str.startsWith('[')) {
                return JSON.parse(str);
            }
            return Array.isArray(str) ? str : [];
        } catch (error) {
            return [];
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center">
                <div className="text-[#C0DDFF] font-urbanist text-[18px]">Loading...</div>
            </div>
        );
    }

    if (!serviceDetails) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center">
                <div className="text-[#C0DDFF] font-urbanist text-[18px]">Service not found</div>
            </div>
        );
    }

    const features = parseArrayString(serviceDetails.features[0]);
    const includes = parseArrayString(serviceDetails.includes[0]);
    const isOnlineService = serviceDetails.serviceType === 'online';

    return (
        <div className="min-h-screen bg-[#0B141F] py-16 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="mb-6">
                    <Link href="/services">
                        <button className="flex items-center gap-2 text-[rgba(192,221,255,0.8)] hover:text-[#C0DDFF] font-urbanist text-[14px] font-semibold transition-colors duration-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Services
                        </button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden">
                            <div className="relative h-96 overflow-hidden">
                                <img
                                    src={serviceDetails.images[0]}
                                    alt={serviceDetails.serviceName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 right-6 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="font-urbanist text-[18px] font-bold text-[#C0DDFF]">
                                        ${serviceDetails.cost}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.3)] rounded-full font-urbanist text-[12px] font-semibold text-[#C0DDFF]">
                                        {serviceDetails.serviceCategory}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <IconStar size={18} className="text-[#FFD700]" fill="#FFD700" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.90)] font-semibold">
                                            {serviceDetails.rating}
                                        </span>
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                            {serviceDetails.reviews} reviews
                                        </span>
                                    </div>
                                </div>

                                <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-4">
                                    {serviceDetails.serviceName}
                                </h1>

                                <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)] mb-6 leading-relaxed">
                                    {serviceDetails.description}
                                </p>

                                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[rgba(192,221,255,0.15)]">
                                    <div className="flex items-center gap-2 text-[rgba(222,235,250,0.80)]">
                                        <IconClock size={20} className="text-[#C0DDFF]" />
                                        <span className="font-urbanist text-[14px]">{serviceDetails.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[rgba(222,235,250,0.80)]">
                                        <IconMapPin size={20} className="text-[#C0DDFF]" />
                                        <span className="font-urbanist text-[14px] capitalize">{serviceDetails.unit}</span>
                                    </div>

                                </div>

                                <div className="mb-8">
                                    <h2 className="font-urbanist text-[24px] font-bold text-[#DEEBFA] mb-4">
                                        About This Service
                                    </h2>
                                    <p className="font-urbanist text-[15px] text-[rgba(222,235,250,0.80)] leading-relaxed">
                                        {serviceDetails.longDescription}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-4">
                                            Key Features
                                        </h3>
                                        <ul className="space-y-3">
                                            {features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <IconCheck size={20} className="text-[#C0DDFF] flex-shrink-0 mt-0.5" />
                                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-4">
                                            Whats Included
                                        </h3>
                                        <ul className="space-y-3">
                                            {includes.map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <IconCheck size={20} className="text-[#C0DDFF] flex-shrink-0 mt-0.5" />
                                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-4">
                                        Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {serviceDetails.images.map((img, index) => (
                                            <div key={index} className="relative h-40 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)] hover:border-[#C0DDFF] transition-all duration-300">
                                                <img
                                                    src={img}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="font-urbanist text-[36px] font-bold text-[#C0DDFF]">
                                        ${serviceDetails.cost}
                                    </span>
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                        per service
                                    </span>
                                </div>
                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                    Professional decoration service
                                </p>
                            </div>

                            <button
                                onClick={handleBookNowClick}
                                className="w-full cursor-pointer bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 mb-4"
                            >
                                Book Now
                            </button>

                            {!session?.user && (
                                <p className="text-center font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] mb-6">
                                    Please login to book this service
                                </p>
                            )}

                            <div className="pt-6 border-t border-[rgba(192,221,255,0.15)] space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">Duration</span>
                                    <span className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">{serviceDetails.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">Service Type</span>
                                    <span className="font-urbanist text-[14px] font-semibold text-[#DEEBFA] capitalize">{serviceDetails.unit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">Rating</span>
                                    <span className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">{serviceDetails.rating}/5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                {showDecoratorSelection ? 'Select Your Decorator' : 'Book This Service'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowBookingModal(false);
                                    setShowDecoratorSelection(false);
                                    setSelectedDecorator(null);
                                }}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors cursor-pointer"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="p-6">
                            {!showDecoratorSelection ? (
                                <>
                                    <div className="mb-6 p-4 bg-[rgba(192,221,255,0.08)] border border-[rgba(192,221,255,0.2)] rounded-lg">
                                        <h4 className="font-urbanist text-[16px] font-semibold text-[#DEEBFA] mb-2">
                                            {serviceDetails.serviceName}
                                        </h4>
                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                                            ${serviceDetails.cost} • {serviceDetails.duration}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={bookingData.name}
                                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                readOnly
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={bookingData.email}
                                                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                readOnly
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                Booking Date
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                                    <IconCalendar size={18} />
                                                </div>
                                                <input
                                                    type="date"
                                                    value={bookingData.date}
                                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                                    required
                                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                    style={{ colorScheme: 'dark' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                Booking Time
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                                    <IconClock size={18} />
                                                </div>
                                                <input
                                                    type="time"
                                                    value={bookingData.time}
                                                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                                    required
                                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                    style={{ colorScheme: 'dark' }}
                                                />
                                            </div>
                                        </div>

                                        {!isOnlineService && (
                                            <div className="space-y-2">
                                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                    Service Location
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                                        <IconMapPinFilled size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={bookingData.location}
                                                        onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                                                        placeholder="Enter the event location"
                                                        required
                                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                                Additional Notes (Optional)
                                            </label>
                                            <textarea
                                                value={bookingData.additionalNotes}
                                                onChange={(e) => setBookingData({ ...bookingData, additionalNotes: e.target.value })}
                                                placeholder="Any special requirements or preferences..."
                                                rows={4}
                                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)] resize-none"
                                            />
                                        </div>

                                        <button
                                            onClick={handleContinueToDecorators}
                                            disabled={!bookingData.date || !bookingData.time || (!isOnlineService && !bookingData.location)}
                                            className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 cursor-pointer rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-none disabled:hover:translate-y-0"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleBackToForm}
                                        className="flex items-center gap-2 text-[rgba(192,221,255,0.8)] hover:text-[#C0DDFF] font-urbanist text-[14px] font-semibold transition-colors duration-300 mb-6"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Back to Details
                                    </button>

                                    <div className="mb-6 p-4 bg-[rgba(192,221,255,0.08)] border border-[rgba(192,221,255,0.2)] rounded-lg">
                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] mb-1">
                                            Available decorators for <span className="font-semibold text-[#C0DDFF]">{bookingData.date}</span> at <span className="font-semibold text-[#C0DDFF]">{bookingData.time}</span>
                                        </p>
                                        {!isOnlineService && (
                                            <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)]">
                                                at {bookingData.location}
                                            </p>
                                        )}
                                    </div>

                                    {loadingDecorators ? (
                                        <div className="text-center py-8">
                                            <div className="text-[#C0DDFF] font-urbanist text-[16px]">Loading decorators...</div>
                                        </div>
                                    ) : availableDecorators.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="text-[rgba(222,235,250,0.70)] font-urbanist text-[16px]">No decorators available for this date</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4 mb-6">
                                                {availableDecorators.map((decorator) => (
                                                    <div
                                                        key={decorator._id}
                                                        onClick={() => handleDecoratorSelect(decorator)}
                                                        className={`cursor-pointer bg-[rgba(192,221,255,0.05)] border-2 rounded-xl p-4 transition-all duration-300 hover:bg-[rgba(192,221,255,0.08)] ${selectedDecorator?._id === decorator._id
                                                            ? 'border-[#C0DDFF] shadow-lg shadow-[rgba(192,221,255,0.2)]'
                                                            : 'border-[rgba(192,221,255,0.15)] hover:border-[rgba(192,221,255,0.3)]'
                                                            }`}
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)]">
                                                                    <img
                                                                        src={decorator.image || decorator.profileImage || '/Images/decorators/default.jpg'}
                                                                        alt={decorator.name || decorator.fullName}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                                    <div>
                                                                        <h4 className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-1">
                                                                            {decorator.name || decorator.fullName}
                                                                        </h4>
                                                                        <p className="font-urbanist text-[13px] text-[rgba(192,221,255,0.8)]">
                                                                            {decorator.title || decorator.role || 'Event Decorator'}
                                                                        </p>
                                                                    </div>
                                                                    {selectedDecorator?._id === decorator._id && (
                                                                        <div className="flex-shrink-0 w-6 h-6 bg-[#C0DDFF] rounded-full flex items-center justify-center">
                                                                            <IconCheck size={16} className="text-[#0B141F]" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className="flex gap-0.5">
                                                                        {renderStars(decorator.rating || 4.5)}
                                                                    </div>
                                                                    <span className="font-urbanist text-[13px] text-[rgba(222,235,250,0.90)] font-semibold">
                                                                        {decorator.rating || 4.5}
                                                                    </span>
                                                                    <span className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                                        ({decorator.reviews || 0} reviews)
                                                                    </span>
                                                                </div>
                                                                {decorator.specialties && decorator.specialties.length > 0 && (
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {decorator.specialties.map((specialty, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="px-2.5 py-1 bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.25)] rounded-full font-urbanist text-[11px] font-medium text-[rgba(222,235,250,0.80)]"
                                                                            >
                                                                                {specialty}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={handleFinalBooking}
                                                disabled={!selectedDecorator}
                                                className="w-full cursor-pointer bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-none disabled:hover:translate-y-0"
                                            >
                                                Confirm Booking
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetailsPage;