import Link from "next/link";

const Cta = ({ text, href }) => {
    return (
        <>
            <Link href={href}>
                <button className='bg-[#9FADBE] rounded-[900] pl-10 pr-4 flex justify-between items-center py-[12px] font-urbanist font-semibold text-[16px] text-[#0B141F] gap-4 uppercase text-center relative cursor-pointer overflow-hidden transition-all duration-300 ease hover:brightness-[1.2] hover:-translate-y-[5px]'>
                    {text}
                    <div className="bg-[#DEE3EA] rounded-full h-[40px] w-[40px] flex items-center justify-center">
                        <svg width="13" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5974 1.7298C17.6377 1.17898 17.2239 0.699789 16.673 0.659486L7.69704 0.00270465C7.14623 -0.0375987 6.66704 0.37625 6.62673 0.927063C6.58643 1.47787 7.00028 1.95707 7.55109 1.99737L15.5298 2.58118L14.946 10.5598C14.9057 11.1107 15.3195 11.5899 15.8703 11.6302C16.4211 11.6705 16.9003 11.2566 16.9406 10.7058L17.5974 1.7298ZM0.653809 15.4286L1.30743 16.1854L17.2537 2.41364L16.6001 1.65682L15.9464 0.899996L0.000188768 14.6718L0.653809 15.4286Z" fill="#293B52" />
                        </svg>
                    </div>

                    <div className="eff absolute -top-[20%] -right-[5px]">
                        <svg width="125" height="72" viewBox="0 0 125 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_502_330)">
                                <ellipse cx="86" cy="12.5" rx="46" ry="30.5" fill="#C8E1FF" />
                            </g>
                            <defs>
                                <filter id="filter0_f_502_330" x="0" y="-58" width="172" height="141" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_502_330" />
                                </filter>
                            </defs>
                        </svg>

                    </div>


                </button>
            </Link>

        </>
    );
};

export default Cta;