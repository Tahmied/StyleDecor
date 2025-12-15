"use client";

import Btn from '@/components/Utils/Btn';
import api from '@/lib/axios';
import { IconBell, IconCalendar, IconShoppingBag, IconSparkles, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/api/v1/admin/homepage-services');
                if (response.data.success) {
                    const formattedServices = response.data.data.map(item => ({
                        id: item._id,
                        title: item.serviceName,
                        description: item.description,
                        price: item.cost.toLocaleString(),
                        image: item.images[0],
                        category: item.serviceCategory || 'General'
                    }));
                    setServices(formattedServices);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, []);

    const getIcon = (category) => {
        const cat = category.toLowerCase();
        if (cat.includes('wedding')) return <IconSparkles className="h-6 w-6" />;
        if (cat.includes('birthday')) return <IconCalendar className="h-6 w-6" />;
        if (cat.includes('corporate')) return <IconUser className="h-6 w-6" />;
        if (cat.includes('home')) return <IconShoppingBag className="h-6 w-6" />;
        return <IconBell className="h-6 w-6" />; 
    };

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
                                                {getIcon(service.category)}
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
                    <Btn text={'View All Services'} link={'/services'} />
                </div>
            </div>
        </div>
    );
}

