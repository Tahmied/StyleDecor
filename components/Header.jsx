'use client'
import Cta from '@/components/Utils/Cta';
import { IconLayoutDashboard, IconLogout, IconUser } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useState } from 'react';
import styled from 'styled-components';

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
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
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
      height: 2.4em;
    }
  }
  `;

const ProfileDropdown = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group"
            >
                <div className="w-10 cursor-pointer h-10 rounded-full overflow-hidden border-2 border-[rgba(192,221,255,0.3)] group-hover:border-[#C0DDFF] transition-all duration-300">
                    {session?.user?.image ? (
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[rgba(192,221,255,0.1)] flex items-center justify-center">
                            <IconUser size={20} className="text-[#C0DDFF]" />
                        </div>
                    )}
                </div>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="absolute right-0 w-56 bg-[rgba(11,20,31,0.95)] backdrop-blur-sm border border-[rgba(192,221,255,0.2)] rounded-lg shadow-2xl z-20 overflow-hidden">
                        <div className="px-4 py-3 border-b border-[rgba(192,221,255,0.15)]">
                            <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA] truncate">
                                {session?.user?.name || 'User'}
                            </p>
                            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] truncate">
                                {session?.user?.email}
                            </p>
                        </div>

                        <div className="py-2">
                            <Link href="/profile">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-[rgba(192,221,255,0.08)] transition-all duration-300 group"
                                >
                                    <IconUser size={18} className="text-[rgba(192,221,255,0.7)] group-hover:text-[#C0DDFF]" />
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.90)] group-hover:text-[#DEEBFA]">
                                        My Profile
                                    </span>
                                </button>
                            </Link>

                            <Link href="/dashboard">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-[rgba(192,221,255,0.08)] transition-all duration-300 group"
                                >
                                    <IconLayoutDashboard size={18} className="text-[rgba(192,221,255,0.7)] group-hover:text-[#C0DDFF]" />
                                    <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.90)] group-hover:text-[#DEEBFA]">
                                        Dashboard
                                    </span>
                                </button>
                            </Link>

                            <div className="border-t border-[rgba(192,221,255,0.15)] my-2"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-[rgba(255,82,82,0.1)] transition-all duration-300 group"
                            >
                                <IconLogout size={18} className="text-[rgba(255,82,82,0.8)] group-hover:text-[#ff5252]" />
                                <span className="font-urbanist text-[14px] text-[rgba(255,82,82,0.9)] group-hover:text-[#ff5252] font-semibold">
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const MobileMenu = ({ menuOpen, MenuItems }) => {
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
                    {MenuItems.map(menu => (
                        <Link key={menu.name} href={menu.Link}>
                            <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer hover:-translate-y-[2px] transition">
                                {menu.name}
                            </li>
                        </Link>
                    ))}
                    <Cta text={'Join Us'} href={'/register'} />
                </ul>
            </div>
        </>
    )
}

const Header = ({ children, height = '90vh', styles = '' }) => {
    const { data: session, status } = useSession();
    console.log(session?.user);
    console.log(status);
    const MenuItems = session?.user
        ? [
            { name: 'Services', Link: '/services' },
            { name: 'Dashboard', Link: '/dashboard' },
            { name: 'Contact', Link: '/contact' },
        ] : [
            { name: 'Services', Link: '/services' },
            { name: 'About', Link: '/about' },
            { name: 'Contact', Link: '/contact' },
        ]
    const [menuOpen, isMenuOpen] = useState(false)
    return (
        <>

            <div
                className={`flex flex-col bg-[#0B141F] ${styles}`}
                style={{ height }}
            >

                <header className="w-full max-md:hidden">
                    <div className="header-container flex justify-between max-w-[1300px] w-[90%] items-center mx-auto py-8">

                        <Link href={'/'}>
                            <div className="cursor-pointer">
                                <p className="font-logo text-[40px] text-[#DEEBFA] font-bold">StyleDecor</p>
                            </div>
                        </Link>

                        <div>
                            <nav>
                                <ul className="flex justify-center items-center gap-8 list-none">
                                    {
                                        MenuItems.map((menu) => {
                                            return <Link key={menu.name} href={menu.Link}> <li className="--font-urbanist font-extrabold text-[14px] uppercase text-[#DEEBFA] cursor-pointer transition-all duration-300 ease hover:-translate-y-[2px] hover:brightness-[2.2]">{menu.name}</li> </Link>
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div>
                            {status === 'authenticated' ? (
                                <ProfileDropdown session={session} />
                            ) : (
                                <Cta text={'Join Us'} href={'/register'} />
                            )}
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
                        <div className="flex items-center gap-4">
                            {status === 'authenticated' && (
                                <ProfileDropdown session={session} />
                            )}
                            <Checkbox menuOpen={menuOpen} isMenuOpen={isMenuOpen} />
                        </div>
                    </div>

                    <MobileMenu MenuItems={MenuItems} menuOpen={menuOpen} />

                </header>
                {children}
            </div>

        </>
    );
};

export default Header;