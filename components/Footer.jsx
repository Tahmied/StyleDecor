import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', icon: <IconBrandFacebook size={24} />, href: '#' },
        { name: 'Instagram', icon: <IconBrandInstagram size={24} />, href: '#' },
        { name: 'Twitter', icon: <IconBrandTwitter size={24} />, href: '#' },
        { name: 'LinkedIn', icon: <IconBrandLinkedin size={24} />, href: '#' },
    ];

    const quickLinks = [
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
    ];

    const workingHours = [
        { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', time: 'Closed' },
    ];

    return (
        <footer className="bg-[#0B141F] text-[#DEEBFA] pt-16 pb-8">
            <div className="max-w-7xl mx-auto w-[90%]">
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    <div className="space-y-4">
                        <Link href="/">
                            <h3 className="font-logo text-[36px] font-bold text-[#DEEBFA] cursor-pointer">
                                StyleDecor
                            </h3>
                        </Link>
                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] leading-relaxed">
                            Transforming spaces into breathtaking masterpieces with over 12 years of expertise in event styling and luxury decoration.
                        </p>


                        <div className="flex gap-4 pt-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="text-[rgba(192,221,255,0.7)] hover:text-[#C0DDFF] transition-all duration-300 hover:-translate-y-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>


                    <div className="space-y-4">
                        <h4 className="font-urbanist font-bold text-[18px] text-[#DEEBFA] uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] hover:text-[#C0DDFF] transition-all duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h4 className="font-urbanist font-bold text-[18px] text-[#DEEBFA] uppercase tracking-wider">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <IconMapPin size={20} className="text-[rgba(192,221,255,0.7)] mt-1 flex-shrink-0" />
                                <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)]">
                                    Jashore, Khulna, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <IconPhone size={20} className="text-[rgba(192,221,255,0.7)] flex-shrink-0" />
                                <a
                                    href="tel:+1234567890"
                                    className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] hover:text-[#C0DDFF] transition-colors duration-300"
                                >
                                    +8801927216841
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <IconMail size={20} className="text-[rgba(192,221,255,0.7)] flex-shrink-0" />
                                <a
                                    href="mailto:info@styledecor.com"
                                    className="font-urbanist text-[14px] text-[rgba(222,235,250,0.80)] hover:text-[#C0DDFF] transition-colors duration-300"
                                >
                                    info@styledecor.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-4">
                        <h4 className="font-urbanist font-bold text-[18px] text-[#DEEBFA] uppercase tracking-wider">
                            Working Hours
                        </h4>
                        <ul className="space-y-3">
                            {workingHours.map((schedule) => (
                                <li key={schedule.day} className="space-y-1">
                                    <p className="font-urbanist text-[14px] font-semibold text-[rgba(192,221,255,0.9)]">
                                        {schedule.day}
                                    </p>
                                    <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                        {schedule.time}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[rgba(192,221,255,0.15)] pt-8">
                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] text-center md:text-left">
                            © {currentYear} StyleDecor. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href="/terms"
                                className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] hover:text-[#C0DDFF] transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/privacy"
                                className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] hover:text-[#C0DDFF] transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;