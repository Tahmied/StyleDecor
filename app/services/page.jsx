'use client'
import { IconAdjustmentsHorizontal, IconClock, IconMapPin, IconSearch, IconSortDescending, IconStar, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Utils/Loader';
import api from '../../lib/axios';

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
            '৳5000 - ৳20000': { min: '5000', max: '20000' },
            '৳20000 - ৳40000': { min: '20000', max: '40000' },
            '৳40000 - ৳60000': { min: '40000', max: '60000' },
            '৳60000+': { min: '60000', max: '' }
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
    
    const [services, setServices] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [page, setPage] = useState(1);
    
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: '9',
                    sort: sortBy
                });

                if (searchQuery) params.append('search', searchQuery);
                if (selectedType !== 'all') params.append('category', selectedType);
                if (budgetRange.min) params.append('minPrice', budgetRange.min);
                if (budgetRange.max) params.append('maxPrice', budgetRange.max);

                const res = await api.get(`/api/v1/admin/services?${params.toString()}`);
                
                if (res.data.success) {
                    setServices(res.data.data.services);
                    setPagination(res.data.data.pagination);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchServices();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [page, searchQuery, selectedType, budgetRange, sortBy]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedType, budgetRange, sortBy]);

    const serviceCategory = [
        { value: 'all', label: 'All Services' },
        { value: 'wedding', label: 'Wedding Decoration' },
        { value: 'corporate', label: 'Corporate Events' },
        { value: 'birthday', label: 'Birthday Parties' },
        { value: 'home', label: 'Home Decoration' },
        { value: 'seasonal', label: 'Seasonal Decoration' },
    ];

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setBudgetRange({ min: '', max: '' });
        setSelectedDate('');
        setPage(1);
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

                        {serviceCategory.slice(1).map(type => (
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

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-[rgba(192,221,255,0.1)] border-2 border-[rgba(192,221,255,0.25)] text-[#DEEBFA] rounded-lg pl-4 pr-10 py-2.5 font-urbanist font-medium text-[14px] focus:outline-none focus:border-[#C0DDFF] cursor-pointer hover:border-[#C0DDFF] transition-all"
                            >
                                <option value="newest" className="bg-[#0B141F]">Newest Arrivals</option>
                                <option value="price-asc" className="bg-[#0B141F]">Price: Low to High</option>
                                <option value="price-desc" className="bg-[#0B141F]">Price: High to Low</option>
                                <option value="rating" className="bg-[#0B141F]">Top Rated</option>
                            </select>
                            <IconSortDescending size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)] pointer-events-none" />
                        </div>

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
                        Showing <span className="text-[#C0DDFF] font-semibold">{services.length}</span> of <span className="text-[#C0DDFF] font-semibold">{pagination.total}</span> services
                    </p>
                </div>

                {loading ? (
                    <div className="mt-6">
                        <div className="">
                            <div className="w-full mt-4 flex flex-col items-center justify-center rounded-2xl">
                                <Loader />
                                <div className="text-center mt-6">
                                    <h4 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">
                                        Loading Services
                                    </h4>
                                    <p className="font-urbanist text-[15px] text-[rgba(222,235,250,0.60)] mt-2">
                                        Please wait, getting your data...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : services.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <div
                                    key={service._id}
                                    className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[#C0DDFF] transition-all duration-300 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={service.images && service.images.length > 0 ? service.images[0] : 'https://via.placeholder.com/400'}
                                            alt={service.serviceName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-3 py-1 rounded-full">
                                            <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                                ৳{service.cost}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                                            {service.serviceName}
                                        </h3>

                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] mb-4 line-clamp-2">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-4 mb-4 text-[rgba(222,235,250,0.70)]">
                                            <div className="flex items-center gap-1">
                                                <IconStar size={16} className="text-[#FFD700]" fill="#FFD700" />
                                                <span className="font-urbanist text-[13px]">
                                                    {service.rating || 0} ({service.reviews || 0})
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
                                            <span className="font-urbanist text-[13px] capitalize">
                                                {service.serviceType || 'On-site'}
                                            </span>
                                        </div>

                                        <Link href={`/service/${service._id}${selectedDate ? `?date=${selectedDate}` : ''}`}>
                                            <button className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold cursor-pointer text-[14px] py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!loading && pagination.pages > 0 && (
                            <div className="mt-12 flex justify-center items-center gap-4">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(192,221,255,0.1)] transition-all cursor-pointer"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="font-urbanist text-[14px] text-[#DEEBFA] bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] px-4 py-2 rounded-lg">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, pagination.pages))}
                                    disabled={page === pagination.pages}
                                    className="px-4 py-2 rounded-lg bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(192,221,255,0.1)] transition-all cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
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
                                className="bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 px-6 rounded-lg hover:brightness-110 transition-all duration-300 cursor-pointer"
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