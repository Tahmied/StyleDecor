'use client'
import api from '@/lib/axios';
import {
    IconCheck,
    IconEdit,
    IconLoader,
    IconPhoto,
    IconPlus,
    IconSearch,
    IconTrash,
    IconX
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [imagePreview, setImagePreview] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        longDescription: '',
        price: '',
        duration: '',
        location: '',
        images: [],
        features: [''],
        includes: ['']
    });

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        const filtered = services.filter(service =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredServices(filtered);
    }, [searchQuery, services]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await api.get(`${processe.env.BACKEND_URI}/api/v1/admin/services`);
            setServices(response.data.data || []);
            setFilteredServices(response.data.data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    const handleAddFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const handleRemoveFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const handleAddInclude = () => {
        setFormData({ ...formData, includes: [...formData.includes, ''] });
    };

    const handleRemoveInclude = (index) => {
        const newIncludes = formData.includes.filter((_, i) => i !== index);
        setFormData({ ...formData, includes: newIncludes });
    };

    const handleIncludeChange = (index, value) => {
        const newIncludes = [...formData.includes];
        newIncludes[index] = value;
        setFormData({ ...formData, includes: newIncludes });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: '',
            description: '',
            longDescription: '',
            price: '',
            duration: '',
            location: '',
            images: [],
            features: [''],
            includes: ['']
        });
        setImagePreview([]);
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('longDescription', formData.longDescription);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('duration', formData.duration);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
            formDataToSend.append('includes', JSON.stringify(formData.includes.filter(i => i.trim())));

            formData.images.forEach((image) => {
                formDataToSend.append('images', image);
            });

            await api.post(`${processe.env.BACKEND_URI}/api/v1/admin/add-service`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setShowAddModal(false);
            resetForm();
            fetchServices();
        } catch (error) {
            console.error('Error adding service:', error);
            alert('Failed to add service');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditClick = (service) => {
        setSelectedService(service);
        setFormData({
            name: service.name,
            type: service.type,
            description: service.description,
            longDescription: service.longDescription || '',
            price: service.price,
            duration: service.duration,
            location: service.location,
            images: [],
            features: service.features || [''],
            includes: service.includes || ['']
        });
        setImagePreview(service.gallery || []);
        setShowEditModal(true);
    };

    const handleEditService = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('serviceId', selectedService._id);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('longDescription', formData.longDescription);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('duration', formData.duration);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
            formDataToSend.append('includes', JSON.stringify(formData.includes.filter(i => i.trim())));

            if (formData.images.length > 0) {
                formData.images.forEach((image) => {
                    formDataToSend.append('images', image);
                });
            }

            await api.put(`${processe.env.BACKEND_URI}/api/v1/admin/edit-service`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setShowEditModal(false);
            resetForm();
            fetchServices();
        } catch (error) {
            console.error('Error editing service:', error);
            alert('Failed to edit service');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
    };

    const handleDeleteService = async () => {
        setSubmitting(true);
        try {
            await api.delete(`${processe.env.BACKEND_URI}/api/v1/admin/delete-service`, {
                data: { serviceId: selectedService._id }
            });
            setShowDeleteModal(false);
            setSelectedService(null);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] lg:pl-64 pt-16 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader size={48} className="text-[#C0DDFF] animate-spin" />
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.80)]">Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B141F] lg:pl-64 pt-16">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                                Manage Services
                            </h1>
                            <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                                Add, edit, or remove services from your catalog
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowAddModal(true);
                            }}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] px-6 py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <IconPlus size={20} />
                            Add New Service
                        </button>
                    </div>

                    <div className="relative">
                        <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]" />
                        <input
                            type="text"
                            placeholder="Search services by name or type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-lg py-3 pl-12 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div
                            key={service._id}
                            className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.image || service.gallery?.[0] || 'https://via.placeholder.com/400'}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                        ৳{service.price}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-3">
                                    <span className="px-2.5 py-1 bg-[rgba(192,221,255,0.15)] border border-[rgba(192,221,255,0.3)] rounded-full font-urbanist text-[11px] font-semibold text-[#C0DDFF]">
                                        {service.type}
                                    </span>
                                </div>

                                <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-2">
                                    {service.name}
                                </h3>

                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] mb-4 line-clamp-2">
                                    {service.description}
                                </p>

                                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[rgba(192,221,255,0.15)]">
                                    <span className="font-urbanist text-[12px] text-[rgba(222,235,250,0.70)]">
                                        Duration: {service.duration}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(service)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#C0DDFF] font-urbanist font-semibold text-[13px] py-2.5 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300"
                                    >
                                        <IconEdit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(service)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.2)] text-[#F44336] font-urbanist font-semibold text-[13px] py-2.5 px-4 rounded-lg hover:bg-[rgba(244,67,54,0.15)] transition-all duration-300"
                                    >
                                        <IconTrash size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <IconPhoto size={64} className="text-[rgba(192,221,255,0.3)] mx-auto mb-4" />
                        <h3 className="font-urbanist text-[20px] font-bold text-[#DEEBFA] mb-2">
                            No services found
                        </h3>
                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                            {searchQuery ? 'Try adjusting your search' : 'Start by adding your first service'}
                        </p>
                    </div>
                )}
            </div>

            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] px-6 py-4 flex items-center justify-between">
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                {showEditModal ? 'Edit Service' : 'Add New Service'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    resetForm();
                                }}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <form onSubmit={showEditModal ? handleEditService : handleAddService} className="p-6">
                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Service Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        placeholder="e.g., Elegant Wedding Decoration"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Service Type *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        required
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        placeholder="e.g., Wedding Decoration"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Short Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={3}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 resize-none"
                                    placeholder="Brief description of the service"
                                />
                            </div>

                            <div className="space-y-2 mb-5">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Detailed Description *
                                </label>
                                <textarea
                                    value={formData.longDescription}
                                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                    required
                                    rows={5}
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300 resize-none"
                                    placeholder="Detailed description of the service"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Price (৳) *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        placeholder="2500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        placeholder="e.g., 8-10 hours"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                        placeholder="e.g., On-site Service"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Service Images *
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="service-images"
                                    />
                                    <label
                                        htmlFor="service-images"
                                        className="flex flex-col items-center justify-center w-full bg-[rgba(11,20,31,0.6)] border-2 border-dashed border-[rgba(192,221,255,0.2)] rounded-lg py-8 px-4 cursor-pointer hover:border-[#C0DDFF] transition-all duration-300"
                                    >
                                        <IconPhoto size={48} className="text-[rgba(192,221,255,0.5)] mb-3" />
                                        <p className="font-urbanist text-[14px] text-[#DEEBFA] mb-1">
                                            Click to upload images
                                        </p>
                                        <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                            PNG, JPG up to 10MB (Multiple files)
                                        </p>
                                    </label>
                                </div>
                                {imagePreview.length > 0 && (
                                    <div className="grid grid-cols-4 gap-3 mt-3">
                                        {imagePreview.map((preview, index) => (
                                            <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)]">
                                                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 mb-5">
                                <div className="flex items-center justify-between">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Features
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddFeature}
                                        className="flex items-center gap-1 text-[#C0DDFF] font-urbanist text-[12px] font-semibold hover:text-[#DEEBFA] transition-colors"
                                    >
                                        <IconPlus size={16} />
                                        Add Feature
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="flex-1 bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2 px-3 text-[#DEEBFA] font-urbanist text-[13px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                placeholder="Enter feature"
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFeature(index)}
                                                    className="p-2 text-[#F44336] hover:bg-[rgba(244,67,54,0.1)] rounded-lg transition-colors"
                                                >
                                                    <IconX size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center justify-between">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Whats Included
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddInclude}
                                        className="flex items-center gap-1 text-[#C0DDFF] font-urbanist text-[12px] font-semibold hover:text-[#DEEBFA] transition-colors"
                                    >
                                        <IconPlus size={16} />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.includes.map((include, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={include}
                                                onChange={(e) => handleIncludeChange(index, e.target.value)}
                                                className="flex-1 bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-2 px-3 text-[#DEEBFA] font-urbanist text-[13px] focus:outline-none focus:border-[#C0DDFF] focus:ring-1 focus:ring-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                placeholder="Enter included item"
                                            />
                                            {formData.includes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveInclude(index)}
                                                    className="p-2 text-[#F44336] hover:bg-[rgba(244,67,54,0.1)] rounded-lg transition-colors"
                                                >
                                                    <IconX size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] py-3 px-4 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <IconLoader size={20} className="animate-spin" />
                                            {showEditModal ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        <>
                                            <IconCheck size={20} />
                                            {showEditModal ? 'Update Service' : 'Add Service'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-[rgba(244,67,54,0.1)] border border-[rgba(244,67,54,0.2)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTrash size={32} className="text-[#F44336]" />
                            </div>
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA] mb-2">
                                Delete Service?
                            </h3>
                            <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.70)]">
                                Are you sure you want to delete {selectedService?.name}? This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedService(null);
                                }}
                                disabled={submitting}
                                className="flex-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[14px] py-3 px-4 rounded-lg hover:bg-[rgba(192,221,255,0.15)] transition-all duration-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteService}
                                disabled={submitting}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#F44336] text-white font-urbanist font-bold text-[14px] py-3 px-4 rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <IconLoader size={20} className="animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <IconTrash size={20} />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;