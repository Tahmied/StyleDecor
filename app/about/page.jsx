'use client'
import {
    IconAward,
    IconCalendarStats,
    IconHeartHandshake,
    IconUsers
} from '@tabler/icons-react';
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div className=" bg-[#0B141F] pt-32 pb-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="font-urbanist text-[40px] md:text-[56px] font-bold text-[#DEEBFA] mb-6 leading-tight">
                        We create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4]">unforgettable</span> moments for you.
                    </h1>
                    <p className="font-urbanist text-[16px] md:text-[18px] text-[rgba(222,235,250,0.70)] leading-relaxed">
                        From intimate gatherings to grand celebrations, we bring your vision to life with creativity, precision, and a touch of magic.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {[
                        { icon: IconUsers, label: 'Happy Clients', value: '500+' },
                        { icon: IconCalendarStats, label: 'Events Hosted', value: '1,200+' },
                        { icon: IconAward, label: 'Years Experience', value: '8+' },
                        { icon: IconHeartHandshake, label: 'Locations', value: '25+' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-[rgba(192,221,255,0.03)] border border-[rgba(192,221,255,0.1)] rounded-2xl p-6 text-center hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 group">
                            <div className="w-12 h-12 bg-[rgba(192,221,255,0.05)] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C0DDFF] group-hover:scale-110 transition-transform">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="font-urbanist text-[28px] font-bold text-[#DEEBFA] mb-1">
                                {stat.value}
                            </h3>
                            <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#C0DDFF] to-transparent opacity-10 rounded-2xl blur-2xl"></div>
                        <div className="relative bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-2xl p-8 md:p-12">
                            <h2 className="font-urbanist text-[32px] font-bold text-[#DEEBFA] mb-6">
                                Why we started
                            </h2>
                            <div className="space-y-6 text-[rgba(222,235,250,0.70)] font-urbanist text-[16px] leading-relaxed">
                                <p>
                                    It began with a simple idea: event planning shouldnt be stressful. We noticed that people often got lost in the logistics, missing out on the joy of their own celebrations.
                                </p>
                                <p>
                                    Our platform bridges the gap between vision and reality. We connect you with top-tier decorators and manage the details, so you can focus on making memories.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-[rgba(192,221,255,0.1)] text-[#C0DDFF]">
                                    <IconAward size={24} />
                                </div>
                                <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">Our Mission</h3>
                            </div>
                            <p className="font-urbanist text-[15px] text-[rgba(222,235,250,0.60)] pl-14">
                                To democratize luxury event styling, making professional decoration accessible, transparent, and hassle-free for everyone.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-[rgba(192,221,255,0.1)] text-[#C0DDFF]">
                                    <IconHeartHandshake size={24} />
                                </div>
                                <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">Our Promise</h3>
                            </div>
                            <p className="font-urbanist text-[15px] text-[rgba(222,235,250,0.60)] pl-14">
                                We promise transparency in pricing, reliability in service, and dedication to making your event look exactly how you imagined it.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center bg-gradient-to-b from-[rgba(192,221,255,0.05)] to-transparent border border-[rgba(192,221,255,0.1)] rounded-3xl p-12">
                    <h2 className="font-urbanist text-[32px] font-bold text-[#DEEBFA] mb-4">
                        Ready to plan your event?
                    </h2>
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.60)] mb-8 max-w-xl mx-auto">
                        Explore our wide range of decoration services and book your preferred stylist today.
                    </p>
                    <Link href="/services">
                        <button className="bg-gradient-to-r cursor-pointer from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-4 px-10 rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.2)] transition-all duration-300">
                            Browse Services
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;