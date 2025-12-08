'use client'
import { IconAdjustmentsHorizontal, IconClock, IconMapPin, IconSearch, IconStar, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const ServicesPage = () => {
    const searchParams = useSearchParams();

    const getInitialState = useMemo(() => {
        const serviceTypeParam = searchParams.get('serviceType');
        const budgetParam = searchParams.get('budget');
        const dateParam = searchParams.get('date');

        const typeMap = {
            'Wedding': 'wedding',
            'Birthday': 'birthday',
            'Home Decor': 'home',
            'Corporate Event': 'corporate',
            'Festival': 'seasonal'
        };

        const budgetMap = {
            '$0 - $500': { min: '0', max: '500' },
            '$500 - $1000': { min: '500', max: '1000' },
            '$1000 - $2500': { min: '1000', max: '2500' },
            '$2500+': { min: '2500', max: '' }
        };

        return {
            type: serviceTypeParam ? (typeMap[serviceTypeParam] || 'all') : 'all',
            budget: budgetParam ? (budgetMap[budgetParam] || { min: '', max: '' }) : { min: '', max: '' },
            date: dateParam || ''
        };
    }, [searchParams]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState(getInitialState.type);
    const [budgetRange, setBudgetRange] = useState(getInitialState.budget);
    const [selectedDate, setSelectedDate] = useState(getInitialState.date);
    const [showFilters, setShowFilters] = useState(false);

    const serviceTypes = [
        { value: 'all', label: 'All Services' },
        { value: 'wedding', label: 'Wedding Decoration' },
        { value: 'corporate', label: 'Corporate Events' },
        { value: 'birthday', label: 'Birthday Parties' },
        { value: 'home', label: 'Home Decoration' },
        { value: 'seasonal', label: 'Seasonal Decoration' },
    ];

    const allServices = [
        {
            id: 1,
            name: 'Elegant Wedding Decoration',
            type: 'wedding',
            description: 'Transform your special day with stunning floral arrangements and elegant setups',
            price: 2500,
            duration: '8-10 hours',
            location: 'On-site',
            rating: 4.9,
            reviews: 124,
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'
        },
        {
            id: 2,
            name: 'Corporate Gala Setup',
            type: 'corporate',
            description: 'Professional event decoration for corporate gatherings and galas',
            price: 3500,
            duration: '6-8 hours',
            location: 'On-site',
            rating: 4.8,
            reviews: 89,
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500'
        },
        {
            id: 3,
            name: 'Birthday Party Package',
            type: 'birthday',
            description: 'Fun and vibrant decorations for unforgettable birthday celebrations',
            price: 800,
            duration: '4-5 hours',
            location: 'On-site',
            rating: 4.7,
            reviews: 156,
            image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500'
        },
        {
            id: 4,
            name: 'Luxury Home Makeover',
            type: 'home',
            description: 'Complete home decoration consultation and installation service',
            price: 5000,
            duration: '2-3 days',
            location: 'Residential',
            rating: 5.0,
            reviews: 67,
            image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500'
        },
        {
            id: 5,
            name: 'Holiday Season Decor',
            type: 'seasonal',
            description: 'Festive decorations for Christmas, New Year, and other celebrations',
            price: 1200,
            duration: '5-6 hours',
            location: 'On-site',
            rating: 4.8,
            reviews: 203,
            image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500'
        },
        {
            id: 6,
            name: 'Garden Wedding Setup',
            type: 'wedding',
            description: 'Beautiful outdoor wedding decoration with natural elements',
            price: 3200,
            duration: '10-12 hours',
            location: 'Outdoor',
            rating: 4.9,
            reviews: 98,
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'
        },
        {
            id: 7,
            name: 'Kids Birthday Extravaganza',
            type: 'birthday',
            description: 'Themed party decorations with balloons, banners, and props',
            price: 600,
            duration: '3-4 hours',
            location: 'On-site',
            rating: 4.6,
            reviews: 187,
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'
        },
        {
            id: 8,
            name: 'Office Space Redesign',
            type: 'corporate',
            description: 'Modern and professional workspace decoration solutions',
            price: 4200,
            duration: '1-2 days',
            location: 'Commercial',
            rating: 4.7,
            reviews: 54,
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500'
        },
    ];

    const filteredServices = allServices.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || service.type === selectedType;
        const matchesBudget =
            (!budgetRange.min || service.price >= Number(budgetRange.min)) &&
            (!budgetRange.max || service.price <= Number(budgetRange.max));

        return matchesSearch && matchesType && matchesBudget;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setBudgetRange({ min: '', max: '' });
        setSelectedDate('');
    };

    const hasActiveFilters = searchQuery || selectedType !== 'all' || budgetRange.min || budgetRange.max || selectedDate;

    return (
        <div className="min-h-screen bg-[#0B141F] py-16 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="font-urbanist text-[48px] md:text-[64px] font-bold leading-tight mb-4 bg-[linear-gradient(90.87deg,rgba(184,192,200,0.6)_-3.19%,#C0DDFF_29.28%,rgba(160,184,212,0.859813)_65.45%,rgba(184,192,200,0.6)_102.57%)] bg-clip-text text-transparent">
                        Our Services
                    </h1>
                    <p className="font-urbanist text-[16px] md:text-[18px] text-[rgba(222,235,250,0.80)] max-w-2xl mx-auto">
                        Discover our comprehensive range of decoration services tailored to make your events unforgettable
                    </p>
                </div>

                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                            <IconSearch size={20} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for decoration services..."
                            className="w-full bg-[rgba(11,20,31,0.8)] border-2 border-[rgba(192,221,255,0.2)] rounded-xl py-4 pl-12 pr-4 text-[#DEEBFA] font-urbanist text-[15px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-urbanist font-semibold text-[14px] transition-all duration-300 ${showFilters
                                    ? 'bg-[#C0DDFF] text-[#0B141F]'
                                    : 'bg-[rgba(192,221,255,0.1)] border-2 border-[rgba(192,221,255,0.25)] text-[#DEEBFA] hover:border-[#C0DDFF]'
                                }`}
                        >
                            <IconAdjustmentsHorizontal size={18} />
                            Filters
                        </button>

                        {serviceTypes.slice(1).map(type => (
                            <button
                                key={type.value}
                                onClick={() => setSelectedType(selectedType === type.value ? 'all' : type.value)}
                                className={`px-4 py-2.5 rounded-lg font-urbanist font-medium text-[14px] transition-all duration-300 ${selectedType === type.value
                                        ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F]'
                                        : 'bg-[rgba(192,221,255,0.08)] border border-[rgba(192,221,255,0.2)] text-[rgba(222,235,250,0.90)] hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.12)]'
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[rgba(255,82,82,0.1)] border border-[rgba(255,82,82,0.3)] text-[#ff5252] font-urbanist font-semibold text-[14px] hover:bg-[rgba(255,82,82,0.15)] hover:border-[#ff5252] transition-all duration-300"
                            >
                                <IconX size={16} />
                                Clear All
                            </button>
                        )}
                    </div>

                    {showFilters && (
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-xl p-6 space-y-4">
                            <h3 className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-4">
                                Budget Range
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.80)] mb-2">
                                        Min Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)] font-urbanist text-[14px]">$</span>
                                        <input
                                            type="number"
                                            value={budgetRange.min}
                                            onChange={(e) => setBudgetRange({ ...budgetRange, min: e.target.value })}
                                            placeholder="0"
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-8 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.80)] mb-2">
                                        Max Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)] font-urbanist text-[14px]">$</span>
                                        <input
                                            type="number"
                                            value={budgetRange.max}
                                            onChange={(e) => setBudgetRange({ ...budgetRange, max: e.target.value })}
                                            placeholder="10000"
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-8 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="pt-4 border-t border-[rgba(192,221,255,0.15)]">
                                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        Selected Date: <span className="text-[#C0DDFF] font-semibold">{selectedDate}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                        Showing <span className="text-[#C0DDFF] font-semibold">{filteredServices.length}</span> of <span className="text-[#C0DDFF] font-semibold">{allServices.length}</span> services
                    </p>
                </div>

                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map(service => (
                            <div
                                key={service.id}
                                className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[#C0DDFF] transition-all duration-300 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                            ${service.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                                        {service.name}
                                    </h3>

                                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] mb-4 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-4 text-[rgba(222,235,250,0.70)]">
                                        <div className="flex items-center gap-1">
                                            <IconStar size={16} className="text-[#FFD700]" fill="#FFD700" />
                                            <span className="font-urbanist text-[13px]">
                                                {service.rating} ({service.reviews})
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconClock size={16} />
                                            <span className="font-urbanist text-[13px]">
                                                {service.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4 text-[rgba(222,235,250,0.70)]">
                                        <IconMapPin size={16} />
                                        <span className="font-urbanist text-[13px]">
                                            {service.location}
                                        </span>
                                    </div>

                                    <Link href={`/service/${service.id}${selectedDate ? `?date=${selectedDate}` : ''}`}>
                                        <button className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold cursor-pointer text-[14px] py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-12 max-w-md mx-auto">
                            <IconSearch size={48} className="text-[rgba(192,221,255,0.4)] mx-auto mb-4" />
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA] mb-2">
                                No Services Found
                            </h3>
                            <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)] mb-6">
                                Try adjusting your search or filters to find what you are looking for
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 px-6 rounded-lg hover:brightness-110 transition-all duration-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;