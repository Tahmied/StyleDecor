'use client'
import { IconEye, IconEyeOff, IconLock, IconMail, IconUpload, IconUser, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Registration = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const SubmittedFormData = new FormData();
        SubmittedFormData.append('name', formData.fullName);
        SubmittedFormData.append('email', formData.email);
        SubmittedFormData.append('password', formData.password);
        SubmittedFormData.append('image', profileImage)
        try {
            const res = await axios.post(`${process.env.BACKEND_URI}/api/v1/users/register`, SubmittedFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            Swal.fire({
                title: 'Registration Successful!',
                text: 'Your account has been created successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                router.push('/login')
            });

        } catch (error) {

        }
        // console.log('Registration submitted:', { ...formData, profileImage });
    };

    const handleGoogleSignUp = () => {
        
        signIn('google', {callbackUrl : '/'})
    };

    return (
        <div className="min-h-screen bg-[#0B141F] flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-5xl">

                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    <div className="hidden lg:flex flex-col justify-center space-y-6 pr-12">
                        <Link href="/">
                            <h1 className="font-logo text-[64px] font-bold text-[#DEEBFA] cursor-pointer leading-tight">
                                StyleDecor
                            </h1>
                        </Link>
                        <p className="font-urbanist text-[24px] leading-relaxed bg-[linear-gradient(90.87deg,rgba(184,192,200,0.6)_-3.19%,#C0DDFF_29.28%,rgba(160,184,212,0.859813)_65.45%,rgba(184,192,200,0.6)_102.57%)] bg-clip-text text-transparent">
                            Join thousands of clients creating breathtaking events
                        </p>
                        <div className="space-y-4 pt-8">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#C0DDFF] mt-2"></div>
                                <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                                    Book consultations and decoration services instantly
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#C0DDFF] mt-2"></div>
                                <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                                    Track your projects in real-time
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#C0DDFF] mt-2"></div>
                                <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                                    Access exclusive design consultations
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">

                        <div className="text-center mb-8 lg:hidden">

                            <h1 className="font-logo text-[48px] font-bold text-[#DEEBFA] mb-2">
                                StyleDecor
                            </h1>

                            <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">
                                Create your account to get started
                            </p>
                        </div>

                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-8 shadow-2xl">


                            <div className="hidden lg:block mb-6">
                                <h2 className="font-urbanist text-[28px] font-bold text-[#DEEBFA] mb-2">
                                    Create Account
                                </h2>
                                <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                                    Start your journey with StyleDecor
                                </p>
                            </div>

                            <div className="space-y-5">

                                <div className="space-y-2">
                                    <label className="font-urbanist text-[15px] font-medium text-[rgba(222,235,250,0.90)]">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center mt-2 gap-4">

                                        <div className="relative">
                                            {imagePreview ? (
                                                <div className="relative w-20 h-20">
                                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#C0DDFF] shadow-lg">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Profile preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute cursor-pointer -top-1 -right-1 bg-[#0B141F] border-2 border-[#C0DDFF] rounded-full p-1 hover:bg-[rgba(192,221,255,0.2)] transition-all duration-300"
                                                    >
                                                        <IconX size={14} className="text-[#C0DDFF]" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-[rgba(11,20,31,0.6)] border-2 border-dashed border-[rgba(192,221,255,0.3)] flex items-center justify-center">
                                                    <IconUser size={32} className="text-[rgba(192,221,255,0.4)]" />
                                                </div>
                                            )}
                                        </div>

                                        <label className="flex-1 cursor-pointer">
                                            <div className="bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2.5 px-4 hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 flex items-center justify-center gap-2">
                                                <IconUpload size={18} className="text-[rgba(192,221,255,0.7)]" />
                                                <span className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)]">
                                                    {imagePreview ? 'Change Photo' : 'Upload Photo'}
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="fullName"
                                        className="font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.90)]"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative mt-1">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                            <IconUser size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2.5 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.90)]"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative mt-2">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                            <IconMail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2.5 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.90)]"
                                        >
                                            Password
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                                <IconLock size={18} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2.5 pl-11 pr-11 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)] hover:text-[#C0DDFF] transition-colors duration-300"
                                            >
                                                {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="font-urbanist text-[13px] font-medium text-[rgba(222,235,250,0.90)]"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                                <IconLock size={18} />
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2.5 pl-11 pr-11 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)] hover:text-[#C0DDFF] transition-colors duration-300"
                                            >
                                                {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full cursor-pointer bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[15px] py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
                                >
                                    Create Account
                                </button>

                                <div className="relative my-2">

                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] uppercase tracking-wider">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    className="w-full cursor-pointer bg-transparent border-2 border-[rgba(192,221,255,0.25)] text-[#DEEBFA] font-urbanist font-semibold text-[15px] py-3 rounded-lg hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.08)] transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    <div className="w-5 h-5 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#a0b8d4"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#a0b8d4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853#a0b8d4"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#a0b8d4"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#a0b8d4"></path></g></svg>
                                    </div>
                                    Sign Up with Google
                                </button>

                                <p className="text-center font-urbanist text-[15px] text-[rgba(222,235,250,0.70)] pt-2">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-[#C0DDFF] hover:text-[#DEEBFA] font-semibold transition-colors duration-300">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;