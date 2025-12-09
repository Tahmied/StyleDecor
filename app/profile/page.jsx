'use client'
import api from '@/lib/axios';
import { IconCalendar, IconCamera, IconCheck, IconEdit, IconLoader, IconLock, IconMail, IconShield, IconUser, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UserProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [updateData, setUpdateData] = useState({
        name: '',
        password: '',
        image: null
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/v1/users/profile');
            if (response.data.success) {
                setUserData(response.data.data);
                setUpdateData({ name: response.data.data.name, password: '', image: null });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setUpdateData({ ...updateData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setUpdating(true);

        try {
            const formData = new FormData();
            formData.append('name', updateData.name);
            if (updateData.password) {
                formData.append('password', updateData.password);
            }
            if (updateData.image) {
                formData.append('image', updateData.image);
            }

            const response = await api.post('/api/v1/users/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.success) {
                Swal.fire({
                    text: 'Profile updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    setShowEditModal(false)
                })
                await fetchUserProfile();
            } else {
                setError(response.data.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader size={48} className="text-[#C0DDFF] animate-spin" />
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B141F] py-16 px-4">
            <div className="max-w-5xl mx-auto">
            
                <div className="mb-8">
                    <h1 className="font-urbanist text-[36px] md:text-[48px] font-bold text-[#DEEBFA] mb-2">
                        My Profile
                    </h1>
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                        Manage your account information and settings
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-1">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 sticky top-8">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[rgba(192,221,255,0.3)]">
                                        <img
                                            src={userData?.image || 'https://via.placeholder.com/150'}
                                            alt={userData?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {userData?.isVerified && (
                                        <div className="absolute bottom-0 right-0 bg-[#4CAF50] rounded-full p-1.5 border-2 border-[#0B141F]">
                                            <IconCheck size={18} className="text-white" />
                                        </div>
                                    )}
                                </div>

                                <h2 className="font-urbanist text-[24px] font-bold text-[#DEEBFA] text-center mb-1">
                                    {userData?.name}
                                </h2>
                                <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)] text-center mb-6 break-all px-2">
                                    {userData?.email}
                                </p>

                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="w-full bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <IconEdit size={18} />
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-2 space-y-6">
                        
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-6 flex items-center gap-2">
                                <IconUser size={24} className="text-[#C0DDFF]" />
                                Account Information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[rgba(192,221,255,0.1)]">
                                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                        <IconUser size={20} className="text-[rgba(192,221,255,0.7)]" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">Full Name</span>
                                    </div>
                                    <span className="font-urbanist text-[15px] font-semibold text-[#DEEBFA] sm:text-right">
                                        {userData?.name}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[rgba(192,221,255,0.1)]">
                                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                        <IconMail size={20} className="text-[rgba(192,221,255,0.7)]" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">Email Address</span>
                                    </div>
                                    <span className="font-urbanist text-[15px] font-semibold text-[#DEEBFA] sm:text-right break-all">
                                        {userData?.email}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[rgba(192,221,255,0.1)]">
                                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                        <IconShield size={20} className="text-[rgba(192,221,255,0.7)]" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">Account Role</span>
                                    </div>
                                    <span className="px-3 py-1 bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.3)] rounded-full font-urbanist text-[12px] font-semibold text-[#C0DDFF] uppercase">
                                        {userData?.role}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[rgba(192,221,255,0.1)]">
                                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                        <IconCalendar size={20} className="text-[rgba(192,221,255,0.7)]" />
                                        <span className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">Member Since</span>
                                    </div>
                                    <span className="font-urbanist text-[15px] font-semibold text-[#DEEBFA] sm:text-right">
                                        {formatDate(userData?.createdAt)}
                                    </span>
                                </div>

                              
                            </div>
                        </div>

                
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">Edit Profile</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setPreviewImage(null);
                                    setError('');
                                    setSuccess('');
                                    setUpdateData({ name: userData?.name || '', password: '', image: null });
                                }}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="p-6">
                            {error && (
                                <div className="mb-4 p-4 bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.3)] rounded-lg">
                                    <p className="font-urbanist text-[14px] text-[#F44336]">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-4 bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.3)] rounded-lg flex items-center gap-2">
                                    <IconCheck size={20} className="text-[#4CAF50]" />
                                    <p className="font-urbanist text-[14px] text-[#4CAF50]">{success}</p>
                                </div>
                            )}

                            <div className="space-y-5">
                                
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative mb-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[rgba(192,221,255,0.3)]">
                                            <img
                                                src={previewImage || userData?.image || 'https://via.placeholder.com/150'}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <label className="absolute bottom-0 right-0 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] rounded-full p-3 cursor-pointer hover:brightness-110 transition-all duration-300 shadow-lg">
                                            <IconCamera size={20} className="text-[#0B141F]" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] text-center">
                                        Click the camera icon to update your profile picture
                                    </p>
                                </div>


                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                            <IconUser size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={updateData.name}
                                            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                            required
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        />
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        New Password (Optional)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]">
                                            <IconLock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            value={updateData.password}
                                            onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                                            placeholder="Leave blank to keep current password"
                                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-11 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                        />
                                    </div>
                                    <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                        Leave this field empty if you dont want to change your password
                                    </p>
                                </div>


                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setPreviewImage(null);
                                            setError('');
                                            setSuccess('');
                                            setUpdateData({ name: userData?.name || '', password: '', image: null });
                                        }}
                                        className="flex-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdateProfile}
                                        disabled={updating}
                                        className="flex-1 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {updating ? (
                                            <>
                                                <IconLoader size={18} className="animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <IconCheck size={18} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;