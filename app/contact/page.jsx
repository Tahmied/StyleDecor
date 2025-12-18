'use client'
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

const ContactPage = () => {
    return (
        <div className="bg-[#0B141F] py-12 px-4 sm:px-6">
            <div className="w-[80%] mx-auto space-y-12">

                <div className="text-center space-y-4">
                    <h1 className="font-urbanist text-[32px] sm:text-[40px] font-bold text-[#DEEBFA] leading-tight">
                        Contact Us
                    </h1>
                    <p className="font-urbanist text-[15px] sm:text-[16px] text-[rgba(222,235,250,0.60)] max-w-lg mx-auto leading-relaxed">
                        We are here to help you plan your perfect event. Reach out to us directly or find us on the map.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 flex flex-col items-center text-center hover:bg-[rgba(192,221,255,0.08)] transition-all">
                        <div className="p-3 rounded-full bg-[rgba(192,221,255,0.1)] text-[#C0DDFF] mb-4">
                            <IconPhone size={24} />
                        </div>
                        <h3 className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-1">Call Us</h3>
                        <a href="tel:+8801234567890" className="font-urbanist text-[14px] text-[rgba(222,235,250,0.8)] hover:text-[#C0DDFF] transition-colors">
                            +880 1234 567 890
                        </a>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 flex flex-col items-center text-center hover:bg-[rgba(192,221,255,0.08)] transition-all">
                        <div className="p-3 rounded-full bg-[rgba(192,221,255,0.1)] text-[#C0DDFF] mb-4">
                            <IconMail size={24} />
                        </div>
                        <h3 className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-1">Email Us</h3>
                        <a href="mailto:support@styledecor.com" className="font-urbanist text-[14px] text-[rgba(222,235,250,0.8)] hover:text-[#C0DDFF] transition-colors break-all">
                            support@styledecor.com
                        </a>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 flex flex-col items-center text-center hover:bg-[rgba(192,221,255,0.08)] transition-all">
                        <div className="p-3 rounded-full bg-[rgba(192,221,255,0.1)] text-[#C0DDFF] mb-4">
                            <IconMapPin size={24} />
                        </div>
                        <h3 className="font-urbanist text-[16px] font-bold text-[#DEEBFA] mb-1">Visit Us</h3>
                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.8)]">
                            Gulshan Avenue, Dhaka
                        </p>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default ContactPage;