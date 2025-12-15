'use client'
import { ChevronDown, Search, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AirbnbSearchBar() {
    const router = useRouter()
    const [serviceType, setServiceType] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState('');
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showMobilePopup, setShowMobilePopup] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const serviceTypes = ['Wedding', 'Birthday', 'Home Decor', 'Corporate Event', 'Festival'];
    const budgetRanges = ['$0 - $500', '$500 - $1000', '$1000 - $2500', '$2500+'];

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (serviceType) {
            params.append('serviceType', serviceType);
        }
        if (budget) {
            params.append('budget', budget);
        }
        if (date) {
            params.append('date', date);
        }
        handleClosePopup();
        router.push(`/services?${params.toString()}`);
    };

    const handleClosePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowMobilePopup(false);
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes slideUpAnimation {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideDownAnimation {
                        from {
                            transform: translateY(0);
                        }
                        to {
                            transform: translateY(100%);
                        }
                    }

                    @keyframes fadeInAnimation {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes fadeOutAnimation {
                        from {
                            opacity: 1;
                        }
                        to {
                            opacity: 0;
                        }
                    }

                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }

                    @keyframes glow {
                        0%, 100% {
                            box-shadow: 0 0 20px rgba(159, 173, 190, 0.3);
                        }
                        50% {
                            box-shadow: 0 0 40px rgba(159, 173, 190, 0.6);
                        }
                    }

                    .animate-slide-up {
                        animation: slideUpAnimation 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    .animate-slide-down {
                        animation: slideDownAnimation 0.3s cubic-bezier(0.7, 0, 0.84, 0);
                    }

                    .animate-fade-in {
                        animation: fadeInAnimation 0.3s ease-out;
                    }

                    .animate-fade-out {
                        animation: fadeOutAnimation 0.3s ease-out;
                    }

                    .animate-bounce-slow {
                        animation: bounce 2s ease-in-out infinite;
                    }

                    .animate-glow {
                        animation: glow 2s ease-in-out infinite;
                    }

                    .mobile-date-input::-webkit-calendar-picker-indicator {
                        filter: invert(78%) sepia(18%) saturate(594%) hue-rotate(179deg) brightness(103%) contrast(101%);
                        cursor: pointer;
                    }

                    input[type="date"]::-webkit-calendar-picker-indicator {
                        cursor: pointer;
                        filter: invert(78%) sepia(18%) saturate(594%) hue-rotate(179deg) brightness(103%) contrast(101%);
                    }
                `
            }} />

            <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">

                <div className="md:hidden">
                    <button
                        onClick={() => setShowMobilePopup(true)}
                        className="w-full bg-[#1a2937] rounded-full shadow-lg border-2 border-[#9FADBE] px-6 py-3 flex items-center justify-between hover:shadow-xl hover:border-[#DEEBFA] transition-all"
                    >
                        <div className="flex flex-row-reverse justify-between w-[80%] items-center gap-3 flex-1 min-w-0">
                            <Search className="w-5 h-5 text-[#9FADBE] flex-shrink-0" />
                            <div className="text-left flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#DEEBFA] truncate">
                                    {serviceType || 'Search services'}
                                </div>
                                <div className="text-xs text-[#9FADBE] truncate">
                                    {date && budget ? `${date} • ${budget}` : 'Add date and budget'}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                {showMobilePopup && (
                    <div className={`md:hidden fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end sm:items-center justify-center ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                        <div className={`bg-[#1a2937] w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto border-2 border-[#9FADBE] ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>

                            <div className="sticky top-0 bg-[#1a2937] border-b border-[#9FADBE] px-6 py-4 flex items-center justify-between rounded-t-3xl">
                                <h3 className="text-lg font-semibold text-[#DEEBFA]">Search Services</h3>
                                <button
                                    onClick={handleClosePopup}
                                    className="p-2 hover:bg-[#253646] rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#DEEBFA]" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">


                                <div className="relative">
                                    <label className="block text-sm font-semibold text-[#DEEBFA] mb-2">
                                        Service Type
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowServiceDropdown(!showServiceDropdown);
                                            setShowBudgetDropdown(false);
                                            setShowDatePicker(false);
                                        }}
                                        className="w-full text-left px-4 py-3 bg-[#0B141F] border-2 border-[#9FADBE] rounded-xl focus:outline-none focus:border-[#DEEBFA] transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#DEEBFA]">{serviceType || 'Select service'}</span>
                                            <ChevronDown className="w-5 h-5 text-[#9FADBE]" />
                                        </div>
                                    </button>

                                    {showServiceDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#9FADBE] rounded-xl shadow-xl border-2 border-[#DEEBFA] z-50 overflow-hidden max-h-60 overflow-y-auto">
                                            {serviceTypes.map((service) => (
                                                <button
                                                    key={service}
                                                    onClick={() => {
                                                        setServiceType(service);
                                                        setShowServiceDropdown(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-[#8a9cad] transition-colors text-[#0B141F] font-semibold"
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>


                                <div>
                                    <label className="block text-sm font-semibold text-[#DEEBFA] mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="mobile-date-input w-full px-4 py-3 bg-[#0B141F] border-2 border-[#9FADBE] rounded-xl focus:outline-none focus:border-[#DEEBFA] text-[#DEEBFA] transition-colors"
                                        style={{
                                            colorScheme: 'dark'
                                        }}
                                    />
                                </div>


                                <div className="relative">
                                    <label className="block text-sm font-semibold text-[#DEEBFA] mb-2">
                                        Budget
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowBudgetDropdown(!showBudgetDropdown);
                                            setShowServiceDropdown(false);
                                            setShowDatePicker(false);
                                        }}
                                        className="w-full text-left px-4 py-3 bg-[#0B141F] border-2 border-[#9FADBE] rounded-xl focus:outline-none focus:border-[#DEEBFA] transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#DEEBFA]">{budget || 'Select budget'}</span>
                                            <ChevronDown className="w-5 h-5 text-[#9FADBE]" />
                                        </div>
                                    </button>

                                    {showBudgetDropdown && (
                                        <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#9FADBE] rounded-xl shadow-xl border-2 border-[#DEEBFA] z-50 overflow-hidden">
                                            {budgetRanges.map((range) => (
                                                <button
                                                    key={range}
                                                    onClick={() => {
                                                        setBudget(range);
                                                        setShowBudgetDropdown(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-[#8a9cad] transition-colors text-[#0B141F] font-semibold"
                                                >
                                                    {range}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>


                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-[#9FADBE] hover:bg-[#DEEBFA] text-[#0B141F] rounded-xl py-3.5 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-bold"
                                >
                                    Search Services
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                <div className="hidden md:block">
                    <div className="flex bg-[#1a2937] rounded-full shadow-2xl border-2 border-[#9FADBE] items-center transition-all hover:shadow-xl hover:border-[#DEEBFA] animate-glow">

                        <div className="relative flex-1 border-r-2 border-[#9FADBE]">
                            <button
                                onClick={() => {
                                    setShowServiceDropdown(!showServiceDropdown);
                                    setShowBudgetDropdown(false);
                                    setShowDatePicker(false);
                                }}
                                className="w-full text-left px-6 py-3 focus:outline-none cursor-pointer hover:bg-[#253646] rounded-l-full transition-colors"
                            >
                                <div className="text-xs font-semibold text-[#9FADBE] mb-1">Service Type</div>
                                <div className="text-sm text-[#DEEBFA] flex items-center justify-between font-medium">
                                    {serviceType || 'Select service'}
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </div>
                            </button>

                            {showServiceDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#9FADBE] rounded-2xl shadow-xl border-2 border-[#DEEBFA] z-50 overflow-hidden max-h-60 overflow-y-auto">
                                    {serviceTypes.map((service) => (
                                        <button
                                            key={service}
                                            onClick={() => {
                                                setServiceType(service);
                                                setShowServiceDropdown(false);
                                            }}
                                            className="cursor-pointer w-full text-left text-[#0B141F] px-6 py-3 hover:bg-[#8a9cad] transition-colors text-sm font-semibold"
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative flex-1 border-r-2 border-[#9FADBE]">
                            <div className="px-6 py-3 hover:bg-[#253646] transition-colors">
                                <div className="text-xs font-semibold text-[#9FADBE] mb-1">Date</div>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full text-sm text-[#DEEBFA] bg-transparent focus:outline-none cursor-pointer font-medium"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <button
                                onClick={() => {
                                    setShowBudgetDropdown(!showBudgetDropdown);
                                    setShowServiceDropdown(false);
                                    setShowDatePicker(false);
                                }}
                                className="w-full cursor-pointer text-left px-6 py-3 focus:outline-none hover:bg-[#253646] transition-colors"
                            >
                                <div className="text-xs font-semibold text-[#9FADBE] mb-1">Budget</div>
                                <div className="text-sm text-[#DEEBFA] flex items-center justify-between font-medium">
                                    {budget || 'Select budget'}
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </div>
                            </button>

                            {showBudgetDropdown && (
                                <div className="absolute cursor-pointer top-full right-0 w-48 mt-2 bg-[#9FADBE] rounded-2xl shadow-xl border-2 border-[#DEEBFA] z-50 overflow-hidden">
                                    {budgetRanges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => {
                                                setBudget(range);
                                                setShowBudgetDropdown(false);
                                            }}
                                            className="w-full cursor-pointer text-[#0b141f] text-left px-6 py-3 hover:bg-[#8a9cad] transition-colors text-sm font-semibold"
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center pr-3 pl-2">
                            <button
                                onClick={handleSearch}
                                className="bg-[#9FADBE] cursor-pointer transition-all duration-200 ease-in hover:scale-110 hover:bg-[#DEEBFA] text-[#0B141F] rounded-full p-4 shadow-lg hover:shadow-xl"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">

                    <Link href={'/services'}>
                        <button
                            className="group cursor-pointer relative bg-gradient-to-r from-[#9FADBE] to-[#DEEBFA] text-[#0B141F] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 overflow-hidden border-2 border-transparent hover:border-[#DEEBFA] w-full sm:w-auto justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>

                            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse flex-shrink-0" />
                            <span className="relative z-5 whitespace-nowrap">Book Decoration Service</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="transform group-hover:translate-x-1 transition-transform flex-shrink-0 sm:w-6 sm:h-6"
                            >
                                <path
                                    d="M5 12h14m0 0l-7-7m7 7l-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </Link>

                    <p className="text-sm text-[#9FADBE] font-medium">
                        Quick search • Instant booking • Best decorators
                    </p>
                </div>
            </div>
        </>
    );
}