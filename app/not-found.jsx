import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { IconHome, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <Header height={'auto'}>
                <p></p>
            </Header>
            <div className=" bg-[#0B141F] flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    
                    <div className="w-24 h-24 bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <IconSearch size={40} className="text-[#C0DDFF]" />
                    </div>

                    <h1 className="font-urbanist text-[32px] font-bold text-[#DEEBFA] mb-2">
                        Page Not Found
                    </h1>
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.60)] mb-8">
                        The decoration or page you are looking for doesnt exist or has been moved.
                    </p>

                    <Link href="/">
                        <button className="bg-gradient-to-r cursor-pointer from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[16px] py-3.5 px-8 rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                            <IconHome size={20} />
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}