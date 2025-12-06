import Cta from '@/Components/Utils/Cta';
import Link from "next/link";

const HeaderToHero = () => {
    return (
        <>
            <div className="h-[60vh] bg-[#0B141F]">
                <header className="w-full">
                    <div className="header-container flex justify-between max-w-[1300px] w-[90%] items-center mx-auto py-8">

                        <Link href={'/'}>
                            <div className="cursor-pointer">
                                <p className="font-logo text-[40px] font-bold">StyleDecor</p>
                            </div>
                        </Link>

                        <div>
                            <nav>
                                <ul className="flex justify-center items-center gap-8 list-none">
                                    <Link href={'/'}> <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:brightness-[2.2]">Services</li> </Link>
                                    <Link href={'/'}> <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:brightness-[1.2]">About</li></Link>                                  
                                    <Link href={'/'}> <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:brightness-[1.2]">Contact</li> </Link>
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <Cta text={'Join Us'}></Cta>
                        </div>
                    </div>
                </header>

                <section className="hero">
                    <div className="hero-container">
                        
                    </div>
                </section>
            </div>

        </>
    );
};

export default HeaderToHero;