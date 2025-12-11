'use client'
import { IconEdit, IconPhoto, IconPlus, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';

const DynamicInputList = ({ label, placeholder, items, setItems }) => {
    const addItem = () => {
        setItems([...items, '']);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    return (
        <div className="space-y-2">
            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                {label}
            </label>
            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] mb-3">
                Add items one by one for better organization
            </p>

            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => updateItem(index, e.target.value)}
                                placeholder={`${placeholder} ${index + 1}`}
                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-10 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-urbanist text-[13px] font-semibold text-[rgba(192,221,255,0.5)]">
                                {index + 1}.
                            </span>
                        </div>
                        <button
                            onClick={() => removeItem(index)}
                            className="p-3 bg-[rgba(255,82,82,0.1)] border border-[rgba(255,82,82,0.3)] text-[#ff5252] rounded-lg hover:bg-[rgba(255,82,82,0.15)] hover:border-[#ff5252] transition-all duration-300"
                            title="Remove item"
                        >
                            <IconTrash size={18} />
                        </button>
                    </div>
                ))}

                <button
                    onClick={addItem}
                    className="w-full bg-[rgba(192,221,255,0.05)] border-2 border-dashed border-[rgba(192,221,255,0.3)] text-[#C0DDFF] font-urbanist font-semibold text-[14px] py-3 rounded-lg hover:bg-[rgba(192,221,255,0.1)] hover:border-[#C0DDFF] transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <IconPlus size={18} />
                    Add {label.includes('Features') ? 'Feature' : 'Item'}
                </button>
            </div>
        </div>
    );
};

const ManageServices = () => {
    const [features, setFeatures] = useState(['']);
    const [includes, setIncludes] = useState(['']);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const dummyServices = [
        {
            "_id": "693957c4f3d58eb340e2436b",
            "serviceName": "Elegant Wedding Decoration",
            "description": "Transform your special day with stunning arrangements",
            "longDescription": "Complete wedding decoration service with premium materials",
            "duration": "8 - 10 Hours",
            "serviceType": "On-site",
            "features": ["Premium floral arrangements", "Custom color schemes", "Professional setup team"],
            "includes": ["Initial design consultation", "All decorative materials", "Professional installation"],
            "cost": 3500,
            "unit": "per service",
            "serviceCategory": "Wedding",
            "images": [
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400"
            ]
        },
        {
            "_id": "693957c4f3d58eb340e2436c",
            "serviceName": "Corporate Event Setup",
            "description": "Professional decoration for corporate gatherings",
            "longDescription": "Premium corporate event decoration with modern aesthetics",
            "duration": "6 - 8 Hours",
            "serviceType": "On-site",
            "features": ["Stage design", "Lighting setup", "Corporate branding"],
            "includes": ["Venue consultation", "Setup and teardown", "On-site coordination"],
            "cost": 4200,
            "unit": "per service",
            "serviceCategory": "Corporate",
            "images": [
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400"
            ]
        },
        {
            "_id": "693957c4f3d58eb340e2436d",
            "serviceName": "Birthday Party Package",
            "description": "Fun and vibrant decorations for birthday celebrations",
            "longDescription": "Complete birthday party decoration with themed elements",
            "duration": "4 - 5 Hours",
            "serviceType": "On-site",
            "features": ["Balloon arrangements", "Themed decorations", "Photo booth setup"],
            "includes": ["Balloons and banners", "Table decorations", "Cleanup service"],
            "cost": 800,
            "unit": "per service",
            "serviceCategory": "Birthday",
            "images": [
                "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
                "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400"
            ]
        }
    ];

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setSelectedImages([...selectedImages, ...newPreviews]);
    };

    const removeImage = (index) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const openAddModal = () => {
        setModalMode('add');
        setSelectedImages([]);
        setFeatures(['']);
        setIncludes(['']);
        setShowModal(true);
    };

    const openEditModal = () => {
        setModalMode('edit');
        setSelectedImages([]);
        setFeatures(['Premium floral arrangements', 'Custom color schemes']);
        setIncludes(['Initial design consultation', 'All decorative materials']); 
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-[#0B141F] lg:pl-64 pt-16">
            <div className="p-4 sm:p-6 lg:p-8">

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                            Manage Services
                        </h1>
                        <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                            Add, edit, or remove decoration services
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] px-6 py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 flex items-center gap-2"
                    >
                        <IconPlus size={20} />
                        Add New Service
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyServices.map((service) => (
                        <div
                            key={service._id}
                            className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[#C0DDFF] transition-all duration-300 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.images?.[0] || 'https://via.placeholder.com/400'}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(192,221,255,0.2)]">
                                    <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                        ৳{service.cost}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-3">
                                    <span className="px-3 py-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.25)] rounded-full font-urbanist text-[11px] font-semibold text-[#C0DDFF]">
                                        {service.serviceCategory}
                                    </span>
                                </div>
                                <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-2">
                                    {service.serviceName}
                                </h3>
                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)] mb-5 line-clamp-2">
                                    {service.description}
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={openEditModal}
                                        className="flex-1 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[13px] py-2.5 rounded-lg hover:bg-[rgba(192,221,255,0.15)] hover:border-[rgba(192,221,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <IconEdit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        className="flex-1 bg-[rgba(255,82,82,0.1)] border border-[rgba(255,82,82,0.3)] text-[#ff5252] font-urbanist font-semibold text-[13px] py-2.5 rounded-lg hover:bg-[rgba(255,82,82,0.15)] hover:border-[#ff5252] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <IconTrash size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[rgba(192,221,255,0.05)] [&::-webkit-scrollbar-thumb]:bg-[rgba(192,221,255,0.2)] [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                {modalMode === 'add' ? 'Add New Service' : 'Edit Service'}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors"
                            >
                                <IconX size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Service Name <span className="text-[#ff5252]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Elegant Wedding Decoration"
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Service Category <span className="text-[#ff5252]">*</span>
                                    </label>
                                    <select className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300">
                                        <option value="">Select category</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Corporate">Corporate Event</option>
                                        <option value="Birthday">Birthday Party</option>
                                        <option value="Home">Home Decoration</option>
                                        <option value="Seasonal">Seasonal</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Short Description <span className="text-[#ff5252]">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Brief description of the service..."
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 resize-none placeholder:text-[rgba(192,221,255,0.4)]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Long Description <span className="text-[#ff5252]">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Detailed description of the service..."
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 resize-none placeholder:text-[rgba(192,221,255,0.4)]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Cost (৳) <span className="text-[#ff5252]">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="2500"
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                        Duration <span className="text-[#ff5252]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 8 - 10 Hours"
                                        className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                    Service Images <span className="text-[#ff5252]">*</span>
                                </label>
                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] mb-3">
                                    Upload multiple images (JPG, PNG, or GIF - Max 5MB each)
                                </p>

                                <div className="space-y-3">
                                    {selectedImages.length === 0 ? (
                                        <label className="block">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                            />
                                            <div className="border-2 border-dashed border-[rgba(192,221,255,0.3)] rounded-xl p-8 hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 cursor-pointer">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <div className="w-16 h-16 bg-[rgba(192,221,255,0.1)] rounded-full flex items-center justify-center">
                                                        <IconUpload size={32} className="text-[#C0DDFF]" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-urbanist text-[15px] font-semibold text-[#DEEBFA] mb-1">
                                                            Click to upload images
                                                        </p>
                                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)]">
                                                            or drag and drop multiple files here
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IconPhoto size={20} className="text-[rgba(192,221,255,0.7)]" />
                                                        <span className="font-urbanist text-[12px] text-[rgba(222,235,250,0.70)]">
                                                            Select multiple images at once
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ) : (
                                        <div className="bg-[rgba(192,221,255,0.05)] border border-[rgba(192,221,255,0.15)] rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="font-urbanist text-[13px] font-semibold text-[#DEEBFA]">
                                                    Selected Images ({selectedImages.length})
                                                </p>
                                                <button
                                                    onClick={() => setSelectedImages([])}
                                                    className="font-urbanist text-[12px] text-[#ff5252] hover:text-[#ff7070] transition-colors font-semibold"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                                                {selectedImages.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <div className="relative h-28 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)]">
                                                            <img
                                                                src={image}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => removeImage(index)}
                                                            className="absolute -top-2 -right-2 p-1.5 bg-[#ff5252] rounded-full hover:bg-[#ff7070] transition-colors shadow-lg border-2 border-[#0B141F]"
                                                        >
                                                            <IconX size={14} className="text-white" />
                                                        </button>
                                                        <p className="font-urbanist text-[11px] text-[rgba(222,235,250,0.60)] text-center mt-1">
                                                            Image {index + 1}
                                                        </p>
                                                    </div>
                                                ))}
                                                <label className="h-28 border-2 border-dashed border-[rgba(192,221,255,0.3)] rounded-lg hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handleImageSelect}
                                                        className="hidden"
                                                    />
                                                    <IconPlus size={24} className="text-[#C0DDFF]" />
                                                    <span className="font-urbanist text-[11px] text-[rgba(222,235,250,0.70)]">Add More</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <DynamicInputList
                                label="Key Features"
                                placeholder="Enter feature"
                                items={features}
                                setItems={setFeatures}
                            />

                            <DynamicInputList
                                label="What's Included"
                                placeholder="Enter item"
                                items={includes}
                                setItems={setIncludes}
                            />

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-[rgba(192,221,255,0.1)] border-2 border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[15px] py-3.5 rounded-lg hover:bg-[rgba(192,221,255,0.15)] hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[15px] py-3.5 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {modalMode === 'add' ? 'Add Service' : 'Update Service'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;