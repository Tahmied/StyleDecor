import { ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function AirbnbSearchBar() {
    const [serviceType, setServiceType] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState('');
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showMobilePopup, setShowMobilePopup] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const serviceTypes = ['Wedding', 'Birthday', 'Home Decor'];
    const budgetRanges = ['$0 - $500', '$500 - $1000', '$1000 - $2500', '$2500+'];

    const handleSearch = () => {
        console.log('Search clicked', { serviceType, date, budget });
        handleClosePopup();
        // API call will go here
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

                    .mobile-date-input::-webkit-calendar-picker-indicator {
                        filter: invert(78%) sepia(18%) saturate(594%) hue-rotate(179deg) brightness(103%) contrast(101%);
                        cursor: pointer;
                    }
                `
            }} />
            
            <div className="w-full max-w-5xl mx-auto px-4 py-8">
                {/* Mobile Compact Version */}
                <div className="md:hidden">
                    <button
                        onClick={() => setShowMobilePopup(true)}
                        className="w-full bg-[#9FADBE] rounded-full shadow-lg border border-[#dee3ea] px-6 py-3 flex items-center justify-between hover:shadow-xl transition-shadow"
                    >
                        <div className="flex flex-row-reverse justify-between w-[80%] items-center gap-3 flex-1 min-w-0">
                            <Search className="w-5 h-5 text-[#0B141F] flex-shrink-0" />
                            <div className="text-left flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#04090f] truncate">
                                    {serviceType || 'Search services'}
                                </div>
                                <div className="text-xs text-[#0B141F] truncate">
                                    {date && budget ? `${date} • ${budget}` : 'Add date and budget'}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Mobile Popup */}
                {showMobilePopup && (
                    <div className={`md:hidden fixed inset-0 bg-[#ffffff1d] bg-opacity-50 z-50 flex items-end sm:items-center justify-center ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                        <div className={`bg-[#0B141F] w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>
                            {/* Header */}
                            <div className="sticky top-0 bg-[#0B141F] border-b border-[#dee3ea] px-6 py-4 flex items-center justify-between rounded-t-3xl">
                                <h3 className="text-lg font-semibold text-[#c0ddff]">Search</h3>
                                <button
                                    onClick={handleClosePopup}
                                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#c0ddff]" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Service Type */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-[#c0ddff] mb-2">
                                        Service Type
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowServiceDropdown(!showServiceDropdown);
                                            setShowBudgetDropdown(false);
                                            setShowDatePicker(false);
                                        }}
                                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#9FADBE] focus:ring-2 focus:ring-[#9FADBE] focus:ring-opacity-20"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#c0ddff]">{serviceType || 'Select service'}</span>
                                            <ChevronDown className="w-5 h-5 text-[#c0ddff]" />
                                        </div>
                                    </button>

                                    {showServiceDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#9FADBE] rounded-xl shadow-xl border border-[#dee3ea] z-50 overflow-hidden">
                                            {serviceTypes.map((service) => (
                                                <button
                                                    key={service}
                                                    onClick={() => {
                                                        setServiceType(service);
                                                        setShowServiceDropdown(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-[#0B141F]"
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#c0ddff] mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="mobile-date-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#9FADBE] focus:ring-2 focus:ring-[#9FADBE] focus:ring-opacity-20 text-[#c0ddff] bg-transparent"
                                        style={{
                                            colorScheme: 'dark'
                                        }}
                                    />
                                </div>

                                {/* Budget */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-[#c0ddff] mb-2">
                                        Budget
                                    </label>
                                    <button
                                        onClick={() => {
                                            setShowBudgetDropdown(!showBudgetDropdown);
                                            setShowServiceDropdown(false);
                                            setShowDatePicker(false);
                                        }}
                                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#9FADBE] focus:ring-2 focus:ring-[#9FADBE] focus:ring-opacity-20"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#c0ddff]">{budget || 'Select budget'}</span>
                                            <ChevronDown className="w-5 h-5 text-[#c0ddff]" />
                                        </div>
                                    </button>

                                    {showBudgetDropdown && (
                                        <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#9FADBE] rounded-xl shadow-xl border border-[#dee3ea] z-50 overflow-hidden">
                                            {budgetRanges.map((range) => (
                                                <button
                                                    key={range}
                                                    onClick={() => {
                                                        setBudget(range);
                                                        setShowBudgetDropdown(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-[#0B141F]"
                                                >
                                                    {range}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-[#9FADBE] hover:bg-[#8a9cad] text-[#0B141F] rounded-xl py-3.5 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold"
                                >
                                    Search
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Version */}
                <div className="hidden md:flex bg-[#9FADBE] rounded-full shadow-lg border border-[#dee3ea] items-center transition-shadow hover:shadow-xl">
                    {/* Service Type */}
                    <div className="relative flex-1 border-r border-[#dee3ea]">
                        <button
                            onClick={() => {
                                setShowServiceDropdown(!showServiceDropdown);
                                setShowBudgetDropdown(false);
                                setShowDatePicker(false);
                            }}
                            className="w-full text-left px-6 py-3 focus:outline-none cursor-pointer"
                        >
                            <div className="text-xs font-semibold text-[#0B141F] mb-1">Service Type</div>
                            <div className="text-sm text-[#0b141f] flex items-center justify-between">
                                {serviceType || 'Select service'}
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </div>
                        </button>

                        {showServiceDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#9FADBE] rounded-2xl shadow-xl border border-[#dee3ea] z-50 overflow-hidden">
                                {serviceTypes.map((service) => (
                                    <button
                                        key={service}
                                        onClick={() => {
                                            setServiceType(service);
                                            setShowServiceDropdown(false);
                                        }}
                                        className="cursor-pointer w-full text-left text-[#0B141F] px-6 py-3 hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="relative flex-1 border-r border-[#dee3ea]">
                        <button
                            onClick={() => {
                                setShowDatePicker(!showDatePicker);
                                setShowServiceDropdown(false);
                                setShowBudgetDropdown(false);
                            }}
                            className="w-full cursor-pointer text-left px-6 py-3 focus:outline-none"
                        >
                            <div className="text-xs font-semibold text-[#0B141F] mb-1">Date</div>
                            <div className="text-sm text-[#0b141f]">
                                {date || 'Add date'}
                            </div>
                        </button>

                        {showDatePicker && (
                            <div className="absolute cursor-pointer top-full left-0 right-0 mt-2 bg-[#9FADBE] rounded-2xl shadow-xl border border-[#dee3ea] z-50 p-4">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        setShowDatePicker(false);
                                    }}
                                    className="w-full cursor-pointer text-sm text-[#0b141f] focus:outline-none border border-[#0B141F] rounded-lg px-3 py-2"
                                />
                            </div>
                        )}
                    </div>

                    {/* Budget */}
                    <div className="relative flex-1">
                        <button
                            onClick={() => {
                                setShowBudgetDropdown(!showBudgetDropdown);
                                setShowServiceDropdown(false);
                                setShowDatePicker(false);
                            }}
                            className="w-full cursor-pointer text-left px-6 py-3 focus:outline-none"
                        >
                            <div className="text-xs font-semibold text-[#0b141f] mb-1">Budget</div>
                            <div className="text-sm text-[#0b141f] flex items-center justify-between">
                                {budget || 'Select budget'}
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </div>
                        </button>

                        {showBudgetDropdown && (
                            <div className="absolute cursor-pointer top-full right-0 w-48 mt-2 bg-[#9FADBE] rounded-2xl shadow-xl border border-[#dee3ea] z-50 overflow-hidden">
                                {budgetRanges.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => {
                                            setBudget(range);
                                            setShowBudgetDropdown(false);
                                        }}
                                        className="w-full cursor-pointer text-[#0b141f] text-left px-6 py-3 hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center justify-center pr-3 pl-2">
                        <button
                            onClick={handleSearch}
                            className="bg-[#dee3ea] cursor-pointer transition-all duration-200 ease-in hover:-translate-y-[2px] text-[#0b141f] rounded-full p-4 shadow-md hover:shadow-lg"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}