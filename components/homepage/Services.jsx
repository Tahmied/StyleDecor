"use client";

import Btn from '@/components/Utils/Btn';
import { Bell, Calendar, Sparkles, Store, Users } from "lucide-react";
import Link from 'next/link';

export default function Services() {
    return (
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#9fadbe]">
            <div className="max-w-7xl mx-auto">

                <div className="mb-12 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#0b141f] mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Professional decoration services tailored to make your special moments unforgettable
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {services.map((service, index) => {

                        const isLarge = index === 0 || index === 4;
                        const isMedium = index === 1 || index === 5;
                        const isTall = index === 2 || index === 6;

                        return (
                            <div
                                key={service.id}
                                className={`
                  group relative overflow-hidden rounded-3xl cursor-pointer
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                  ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-2' : ''}
                  ${isTall ? 'lg:row-span-2' : ''}
                `}
                            >

                                <Link href={`/service/${service.id}`}>
                                    <div className="absolute inset-0">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b141f]/90 via-[#0b141f]/50 to-transparent" />
                                    </div>

                                    <div className="relative h-full min-h-[280px] p-6 flex flex-col justify-between">

                                        <div className="flex justify-end">
                                            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                                                {service.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold text-white leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-200 text-sm leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="inline-block">
                                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                                                    Starting at ${service.price}
                                                </span>
                                            </div>

                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="mt-2 px-6 py-2 bg-white text-[#0b141f] rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                                                    Learn More →
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                            backgroundSize: '20px 20px'
                                        }} />
                                    </div>
                                </Link>

                            </div>
                        );
                    })}
                </div>


                <div className="mt-12 text-center">
                    <Btn text={'Book a Consultation'} link={'/'} />
                </div>
            </div>
        </div>
    );
}

const services = [
    {
        id: 1,
        title: "Wedding Decorations",
        description: "Create magical moments with our elegant wedding decoration packages tailored to your dream celebration",
        price: "1,999",
        image: "/Images/decors/wedding.jpg",
        icon: <Sparkles className="h-6 w-6" />
    },
    {
        id: 2,
        title: "Birthday Parties",
        description: "Make birthdays unforgettable with vibrant, themed decorations for all ages",
        price: "299",
        image: "/Images/decors/birthday.avif",
        icon: <Calendar className="h-6 w-6" />
    },
    {
        id: 6,
        title: "Festival Decorations",
        description: "Bring cultural celebrations to life with authentic, vibrant festival decor",
        price: "499",
        image: "/Images/decors/fest.jpg",
        icon: <Sparkles className="h-6 w-6" />
    },
    {
        id: 4,
        title: "Home Makeover",
        description: "Transform your living space with our seasonal and permanent decoration solutions",
        price: "599",
        image: "/Images/decors/home.jpg",
        icon: <Store className="h-6 w-6" />
    },
    {
        id: 5,
        title: "Lighting Design",
        description: "Celebrate new beginnings with adorable, customized baby shower decorations",
        price: "399",
        image: "/Images/decors/lighting.jpg",
        icon: <Bell className="h-6 w-6" />
    },
    {
        id: 3,
        title: "Corporate Events",
        description: "Professional setups for conferences, product launches, and company celebrations",
        price: "799",
        image: "/Images/decors/corp-event.jpeg",
        icon: <Users className="h-6 w-6" />
    }
];