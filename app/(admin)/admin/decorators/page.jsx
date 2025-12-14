'use client'
import api from '@/lib/axios';
import { IconBriefcase, IconCalendar, IconCurrencyDollar, IconEdit, IconPhone, IconPlus, IconStar, IconUpload, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageDecorators = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [filter, setFilter] = useState('all');

    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');

    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
        role: 'user',
        phoneNumber: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/v1/admin/users');
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setModalMode('add');
        setFormData({ userId: '', name: '', email: '', password: '', role: 'user', isFeaturedDecorator: false, phoneNumber: '' });
        setImageFile(null);
        setImagePreview(null);
        setShowUserModal(true);
    };

    const openEditModal = (user) => {
        setModalMode('edit');
        setFormData({
            userId: user._id,
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            isFeaturedDecorator: user.isFeaturedDecorator || false,
            phoneNumber: user.phoneNumber || '',
        });
        setImageFile(null);
        setImagePreview(user.image);
        setShowUserModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('role', formData.role);
        data.append('isFeaturedDecorator', formData.isFeaturedDecorator);
        data.append('phoneNum', formData.phoneNumber)

        if (formData.password) data.append('password', formData.password);

        if (imageFile) data.append('image', imageFile);

        try {
            let response;
            if (modalMode === 'add') {
                response = await api.post('/api/v1/users/register', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                data.append('userId', formData.userId);
                response = await api.post('/api/v1/users/edit-user', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: modalMode === 'add' ? 'User created successfully' : 'Profile updated successfully',
                    background: '#0B141F',
                    color: '#DEEBFA'
                });
                setShowUserModal(false);
                fetchUsers();
            }
        } catch (error) {
            console.error('Submit error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Something went wrong',
                background: '#0B141F',
                color: '#DEEBFA'
            });
        } finally {
            setFormLoading(false);
        }
    };

    const handleRoleUpdate = async (userId, currentRole) => {
        setProcessingId(userId);
        try {
            const newRole = currentRole === 'decorator' ? 'user' : 'decorator';
            const response = await api.post('/api/v1/admin/UpdateUserRole', {
                userId,
                role: newRole
            });

            if (response.data.success) {
                fetchUsers();
                if (selectedUser && selectedUser._id === userId) {
                    setSelectedUser({ ...selectedUser, role: newRole });
                }
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        } finally {
            setProcessingId(null);
        }
    };

    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        if (filter === 'decorators') return user.role === 'decorator';
        if (filter === 'users') return user.role === 'user';
        return true;
    });

    const filterOptions = [
        { value: 'all', label: 'All Users', count: users.length },
        { value: 'decorators', label: 'Decorators', count: users.filter(u => u.role === 'decorator').length },
        { value: 'users', label: 'Regular Users', count: users.filter(u => u.role === 'user').length },
    ];

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'decorator':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'admin':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b141f] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C0DDFF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b141f] lg:pl-64 pt-0">
            <div className="p-4 sm:p-6 lg:p-8">

                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-urbanist text-[28px] sm:text-[32px] font-bold text-[#DEEBFA] mb-2">
                            Manage Users
                        </h1>
                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                            Manage user roles, profiles, and assignments
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-gradient-to-r cursor-pointer from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] px-6 py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 flex items-center gap-2"
                    >
                        <IconPlus size={20} />
                        Add New User
                    </button>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setFilter(option.value)}
                            className={`px-4 cursor-pointer py-2.5 rounded-lg font-urbanist text-[14px] font-semibold transition-all duration-300 ${filter === option.value
                                ? 'bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] shadow-lg'
                                : 'bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:bg-[rgba(192,221,255,0.1)]'
                                }`}
                        >
                            {option.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-[11px] ${filter === option.value
                                ? 'bg-[rgba(11,20,31,0.2)]'
                                : 'bg-[rgba(192,221,255,0.1)]'
                                }`}>
                                {option.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.length === 0 ? (
                        <div className="col-span-full bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-8 text-center">
                            <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.60)]">
                                No {filter !== 'all' ? filter : 'users'} found
                            </p>
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-5 hover:bg-[rgba(192,221,255,0.08)] transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={user.image || 'https://via.placeholder.com/60'}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full border-2 border-[rgba(192,221,255,0.3)] object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className='flex justify-between items-start mb-1'>
                                            <h3 className="font-urbanist text-[16px] font-semibold text-[#DEEBFA] truncate pr-2">
                                                {user.name}
                                            </h3>
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className='cursor-pointer p-1.5 rounded-md bg-[rgba(192,221,255,0.08)] hover:bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.1)] transition-all duration-200'
                                                title="Edit User"
                                            >
                                                <IconEdit size={16} className='text-[#C0DDFF]' />
                                            </button>
                                        </div>
                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-2 truncate">
                                            {user.email}
                                        </p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold border ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="flex-1 cursor-pointer px-3 py-2 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 font-urbanist text-[13px] font-semibold"
                                    >
                                        View Details
                                    </button>
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleRoleUpdate(user._id, user.role)}
                                            disabled={processingId === user._id}
                                            className={`flex-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 font-urbanist text-[13px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${user.role === 'decorator'
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                                }`}
                                        >
                                            {user.role === 'decorator' ? 'Remove Role' : 'Make Decorator'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
                    <div className="bg-[#0B141F] border border-[rgba(192,221,255,0.15)] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] p-6 flex items-center justify-between z-10">
                            <h2 className="font-urbanist text-[22px] font-bold text-[#DEEBFA]">
                                {modalMode === 'add' ? 'Add New User' : 'Edit User Profile'}
                            </h2>
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="p-2 cursor-pointer rounded-lg hover:bg-[rgba(192,221,255,0.1)] transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <form onSubmit={handleUserSubmit} className="p-6 space-y-5">
                            <div className="flex justify-center mb-6">
                                <label className="relative cursor-pointer group">
                                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[rgba(192,221,255,0.3)] flex items-center justify-center overflow-hidden hover:border-[#C0DDFF] transition-colors">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <IconUpload size={30} className="text-[rgba(192,221,255,0.5)] group-hover:text-[#C0DDFF]" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-[#C0DDFF] p-1.5 rounded-full text-[#0B141F]">
                                        <IconEdit size={14} />
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist focus:outline-none focus:border-[#C0DDFF] transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist focus:outline-none focus:border-[#C0DDFF] transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">Phone Number</label>
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist focus:outline-none focus:border-[#C0DDFF] transition-all"
                                    placeholder="+880 1XXX XXXXXX"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Password {modalMode === 'edit' && <span className="text-[12px] font-normal text-gray-400">(Leave empty to keep current)</span>}
                                </label>
                                <input
                                    type="password"
                                    required={modalMode === 'add'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist focus:outline-none focus:border-[#C0DDFF] transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full cursor-pointer bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist focus:outline-none focus:border-[#C0DDFF] transition-all"
                                >
                                    <option value="user">User</option>
                                    <option value="decorator">Decorator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {formData.role === 'decorator' && (
                                <div className="flex items-center gap-3 bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.2)] rounded-lg px-4 py-3 transition-all">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            id="featuredToggle"
                                            checked={formData.isFeaturedDecorator}
                                            onChange={(e) => setFormData({ ...formData, isFeaturedDecorator: e.target.checked })}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[rgba(192,221,255,0.4)] bg-[rgba(11,20,31,0.6)] checked:border-[#C0DDFF] checked:bg-[#C0DDFF] transition-all"
                                        />
                                        <IconStar
                                            size={12}
                                            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0B141F] opacity-0 peer-checked:opacity-100 transition-opacity"
                                            fill="currentColor"
                                        />
                                    </div>
                                    <label htmlFor="featuredToggle" className="cursor-pointer select-none">
                                        <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                            Featured Decorator
                                        </p>
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)]">
                                            Highlight this decorator on the home page
                                        </p>
                                    </label>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formLoading}
                                className="w-full cursor-pointer mt-4 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[15px] py-3.5 rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formLoading ? 'Processing...' : (modalMode === 'add' ? 'Create User' : 'Update Profile')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
                    <div className="bg-[#0B141F] border border-[rgba(192,221,255,0.15)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] p-6 flex items-center justify-between">
                            <h2 className="font-urbanist text-[22px] font-bold text-[#DEEBFA]">
                                User Details
                            </h2>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="p-2 cursor-pointer rounded-lg hover:bg-[rgba(192,221,255,0.1)] transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={selectedUser.image || 'https://via.placeholder.com/80'}
                                    alt={selectedUser.name}
                                    className="w-20 h-20 rounded-full border-2 border-[rgba(192,221,255,0.3)] object-cover"
                                />
                                <div>
                                    <h3 className="font-urbanist text-[20px] font-semibold text-[#DEEBFA] mb-1">
                                        {selectedUser.name}
                                    </h3>
                                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)] mb-2">
                                        {selectedUser.email}
                                    </p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold border ${getRoleBadgeColor(selectedUser.role)}`}>
                                        {selectedUser.role}
                                    </span>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IconBriefcase size={18} className="text-[#C0DDFF]" />
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                            Specialty
                                        </p>
                                    </div>
                                    <p className="font-urbanist text-[15px] text-[#DEEBFA] font-medium">
                                        {selectedUser.specialty || 'N/A'}
                                    </p>
                                </div>


                                <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IconCurrencyDollar size={18} className="text-[#C0DDFF]" />
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                            Earnings
                                        </p>
                                    </div>
                                    <p className="font-urbanist text-[15px] text-[#DEEBFA] font-medium">
                                        ${selectedUser.totalEarnings ? selectedUser.totalEarnings.toFixed(2) : '0.00'}
                                    </p>
                                </div>

                                <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IconPhone size={18} className="text-[#C0DDFF]" />
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                            Phone Number
                                        </p>
                                    </div>
                                    <p className="font-urbanist text-[15px] text-[#DEEBFA] font-medium">
                                        {selectedUser.phoneNumber}
                                    </p>
                                </div>


                            </div>

                            {selectedUser.unavailableDates && selectedUser.unavailableDates.length > 0 && (
                                <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <IconCalendar size={18} className="text-[#C0DDFF]" />
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide">
                                            Unavailable Dates
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedUser.unavailableDates.map((date, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] rounded-lg text-[13px] text-[#DEEBFA] font-urbanist"
                                            >
                                                {new Date(date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.1)] rounded-lg p-4">
                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.50)] uppercase tracking-wide mb-2">
                                    Account Created
                                </p>
                                <p className="font-urbanist text-[14px] text-[#DEEBFA]">
                                    {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            {selectedUser.role !== 'admin' && (
                                <button
                                    onClick={() => handleRoleUpdate(selectedUser._id, selectedUser.role)}
                                    disabled={processingId === selectedUser._id}
                                    className={`w-full cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 font-urbanist text-[14px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${selectedUser.role === 'decorator'
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                        }`}
                                >
                                    {selectedUser.role === 'decorator' ? 'Remove Decorator Role' : 'Assign Decorator Role'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDecorators;