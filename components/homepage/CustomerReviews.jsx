'use client'
import { useEffect, useState } from 'react';
import Headings from '../Utils/Heading';

export default function CustomerReviews() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const reviews = [
        {
            id: 1,
            name: "Stevia Angela",
            role: "Homeowner",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
            text: "Working with Plexi was such a pleasure! They helped me make the most of my small apartment, transforming it into a functional and chic space. I'm in love with how everything turned out!",
            rating: 4.5,
            projectImage: "/Images/section-four/project-one-pinned.png"
        },
        {
            id: 2,
            name: "Michael Roberts",
            role: "Business Owner",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
            text: "The team exceeded all expectations! Their attention to detail and creative solutions made our office space both beautiful and highly functional. Couldn't be happier with the results!",
            rating: 5,
            projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
        },
        {
            id: 3,
            name: "Sarah Johnson",
            role: "Interior Enthusiast",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
            text: "From concept to completion, the experience was seamless. They truly understood my vision and brought it to life in ways I couldn't have imagined. Highly recommend their services!",
            rating: 5,
            projectImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
        }
    ];

    const clientAvatars = [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop"
    ];

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev + 1) % reviews.length);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
        }
    };

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} className="w-6 h-6 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-6 h-6" viewBox="0 0 24 24">
                    <defs>
                        <linearGradient id="half-star">
                            <stop offset="50%" stopColor="#FBBF24" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-star)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }

        return stars;
    };

    return (
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0B141F]">
            <Headings text={'Customer Reviews'}/>
            <div className="max-w-[1300px] w-[90%] mx-auto max-[400px]:w-full">
             

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    <div 
                        className={`relative transition-all duration-600 ease-in-out ${
                            isTransitioning ? 'opacity-0 transform translate-x-[-20px]' : 'opacity-100 transform translate-x-0'
                        }`}
                    >
                        <div className="rounded-3xl overflow-hidden">
                            <img
                                src={reviews[currentSlide].projectImage}
                                alt="Interior design showcase"
                                className="w-full h-[500px] object-cover max-[426px]:h-[400px]"
                            />
                        </div>

                        <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-6 py-4 shadow-lg max-[426px]:hidden">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-5xl font-bold text-gray-900">4.5</span>
                                <span className="text-3xl font-bold text-gray-400">/5</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                {clientAvatars.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Client ${index + 1}`}
                                        className="w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 font-medium">Client Reviews</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#deebfacc] mb-4 leading-tight max-[1023px]:hidden">
                            Our Clients Share Their Design Journeys
                        </h2>

                        <div className="relative">
                            <div 
                                className={`bg-[#9fadbe] rounded-3xl p-8 mb-8 transition-all duration-600 ease-in-out ${
                                    isTransitioning ? 'opacity-0 transform translate-x-[20px]' : 'opacity-100 transform translate-x-0'
                                }`}
                            >
                                
                                <div className="flex items-start gap-6 mb-6 max-[400px]:flex-col max-[400px]:gap-2 max-[400px]:items-center">
                                    <img
                                        src={reviews[currentSlide].image}
                                        alt={reviews[currentSlide].name}
                                        className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <div className="flex gap-1 mt-2">
                                            {renderStars(reviews[currentSlide].rating)}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#0b141f]">{reviews[currentSlide].name}</h4>
                                            <p className="text-[#0b141f]">{reviews[currentSlide].role}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-lg mb-6 leading-relaxed max-[400px]:text-center">
                                    {reviews[currentSlide].text}
                                </p>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={prevSlide}
                                    disabled={isTransitioning}
                                    className="w-12 h-12 cursor-pointer rounded-full bg-[#9fadbe] hover:bg-[#8a9dae] flex items-center justify-center transition-colors disabled:opacity-50"
                                    aria-label="Previous review"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="#0b141f" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={isTransitioning}
                                    className="w-12 h-12 cursor-pointer rounded-full bg-[#9fadbe] hover:bg-[#8a9dae] text-white flex items-center justify-center transition-colors disabled:opacity-50"
                                    aria-label="Next review"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="#0b141f" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>


                            <div className="flex justify-center gap-2 mt-6">
                                {reviews.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!isTransitioning) {
                                                setIsTransitioning(true);
                                                setCurrentSlide(index);
                                            }
                                        }}
                                        className={`h-2 rounded-full transition-all ${
                                            index === currentSlide 
                                                ? 'w-8 bg-[#9fadbe]' 
                                                : 'w-2 bg-[#9fadbe] opacity-40'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}