'use client'
import Cta from '@/Components/Utils/Cta';
import Link from "next/link";
import { useState } from 'react';
import styled from 'styled-components';

const menuItems = [
    { name: 'Services', Link: '/services' },
    { name: 'About', Link: '/about' },
    { name: 'Contact', Link: '/contact' },
]

const Checkbox = ({ menuOpen, isMenuOpen }) => {

    return (
        <StyledWrapper>
            <label className="hamburger">
                <input type="checkbox" checked={menuOpen}
                    onChange={() => isMenuOpen(prev => !prev)}
                />
                <svg viewBox="0 0 32 32">
                    <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                    <path className="line" d="M7 16 27 16" />
                </svg>
            </label>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    z-index:100;
    position:relative;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    /* The size of the SVG defines the overall size */
    height: 3em;
    /* Define the transition for transforming the SVG */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    /* Define the transition for transforming the Stroke */
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
  @media (max-width: 375px) {
    .hamburger svg {
      height: 2.4em;  /* smaller */
    }
  }
  `;

const MobileMenu = ({ menuOpen }) => {
    return (
        <>
            <div
                className={`
                fixed inset-0 bg-[#000000d0] backdrop-blur-[5px] flex justify-center items-center
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-10
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
            `}
            >
                <ul className="flex flex-col gap-8 justify-center items-center">
                    {menuItems.map(menu => (
                        <Link key={menu.name} href={menu.Link}>
                            <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer hover:-translate-y-[2px] transition">
                                {menu.name}
                            </li>
                        </Link>
                    ))}
                    <Cta text={'Join Us'} href={'/'} />
                </ul>
            </div>
        </>
    )
}



const HeaderToHero = () => {
    const [menuOpen, isMenuOpen] = useState(false)
    return (
        <>
            <div className="h-[60vh] bg-[#0B141F]">
                {/* desktop header */}
                <header className="w-full max-md:hidden">
                    <div className="header-container flex justify-between max-w-[1300px] w-[90%] items-center mx-auto py-8">

                        <Link href={'/'}>
                            <div className="cursor-pointer">
                                <p className="font-logo text-[40px] font-bold">StyleDecor</p>
                            </div>
                        </Link>

                        <div>
                            <nav>
                                <ul className="flex justify-center items-center gap-8 list-none">
                                    {
                                        menuItems.map((menu) => {
                                            return <Link key={menu.name} href={menu.Link}> <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:brightness-[2.2]">{menu.name}</li> </Link>
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <Cta text={'Join Us'} href={'/'}></Cta>
                        </div>

                    </div>
                </header>

                <header className='md:hidden w-full'>
                    <div className="m-header-container w-[90%] mx-auto flex justify-between items-center py-8">
                        <Link href={'/'}>
                            <div className="cursor-pointer">
                                <p className="font-logo text-[40px] font-bold max-[375px]:text-[25px]">StyleDecor</p>
                            </div>
                        </Link>
                        <Checkbox menuOpen={menuOpen} isMenuOpen={isMenuOpen} />
                    </div>

                    <MobileMenu menuOpen={menuOpen} />

                </header>

                <section className="hero">
                    <div className="hero-container">
                        {/* adding letter */}
                    </div>
                </section>
            </div>

        </>
    );
};

export default HeaderToHero;