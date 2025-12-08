'use client'
import { IconCalendar, IconCheck, IconClock, IconMapPin, IconMapPinFilled, IconStar, IconUsers, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ServiceDetailsPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const date = searchParams.get('date');
    const serviceId = params.id;
    console.log(date, serviceId);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        email: session?.user?.email || '',
        name: session?.user?.name || '',
        date: date || '',
        location: '',
        additionalNotes: ''
    });

    const serviceDetails = {
        id: 1,
        name: 'Elegant Wedding Decoration',
        type: 'Wedding Decoration',
        description: 'Transform your special day with our stunning floral arrangements and elegant setups. Our expert team brings years of experience in creating unforgettable wedding atmospheres that perfectly match your vision and style.',
        longDescription: 'Our Elegant Wedding Decoration service offers a comprehensive package designed to make your special day truly magical. We specialize in creating sophisticated and romantic environments that reflect your unique love story. From the initial consultation to the final setup, our dedicated team works closely with you to ensure every detail is perfect. We use premium quality materials, fresh flowers, and elegant decorative elements to transform your venue into a breathtaking space.',
        price: 2500,
        duration: '8-10 hours',
        location: 'On-site Service',
        rating: 4.9,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
            'https://images.unsplash.com/photo-1522673607212-f2e66d7c2776?w=400',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
        ],
        features: [
            'Premium floral arrangements',
            'Custom color schemes',
            'Professional setup team',
            'Venue consultation included',
            'Day-of coordination',
            'Cleanup service included'
        ],
        includes: [
            'Initial design consultation',
            'Mood board creation',
            'All decorative materials',
            'Professional installation',
            'On-site supervision',
            'Post-event cleanup'
        ]
    };


    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log('Booking submitted:', bookingData);
        setShowBookingModal(false);
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
    };

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
                                    src={serviceDetails.image}
                                    alt={serviceDetails.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 right-6 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="font-urbanist text-[18px] font-bold text-[#C0DDFF]">
                                        ${serviceDetails.price}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.3)] rounded-full font-urbanist text-[12px] font-semibold text-[#C0DDFF]">
                                        {serviceDetails.type}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <IconStar size={18} className="text-[#FFD700]" fill="#FFD700" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.90)] font-semibold">
                                            {serviceDetails.rating}
                                        </span>
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                            ({serviceDetails.reviews} reviews)
                                        </span>
                                    </div>
                                </div>

                                <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-4">
                                    {serviceDetails.name}
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
                                        <span className="font-urbanist text-[14px]">{serviceDetails.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[rgba(222,235,250,0.80)]">
                                        <IconUsers size={20} className="text-[#C0DDFF]" />
                                        <span className="font-urbanist text-[14px]">Professional Team</span>
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
                                            {serviceDetails.features.map((feature, index) => (
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
                                            {serviceDetails.includes.map((item, index) => (
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
                                        {serviceDetails.gallery.map((img, index) => (
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
                                        ${serviceDetails.price}
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
                                className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 mb-4"
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
                                    <span className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">On-site</span>
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
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">Book This Service</h3>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6 p-4 bg-[rgba(192,221,255,0.08)] border border-[rgba(192,221,255,0.2)] rounded-lg">
                                <h4 className="font-urbanist text-[16px] font-semibold text-[#DEEBFA] mb-2">
                                    {serviceDetails.name}
                                </h4>
                                <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                                    ${serviceDetails.price} • {serviceDetails.duration}
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
                                    onClick={handleBookingSubmit}
                                    className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetailsPage;