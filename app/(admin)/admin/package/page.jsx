'use client'
import { IconEdit, IconLink, IconPhoto, IconPlus, IconTrash, IconUpload, IconVideo, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loader from '../../../../components/Utils/Loader';
import api from '../../../../lib/axios';

const ImageUploader = ({ label, subLabel, image, onImageSelect, onRemove, id, isVideoThumb = false }) => {
    return (
        <div className="space-y-2">
            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                {label} {id === 'mainImage' && <span className="text-[#ff5252]">*</span>}
            </label>
            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)] mb-3">
                {subLabel}
            </p>

            {image ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[rgba(192,221,255,0.2)] group">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        onClick={onRemove}
                        type="button"
                        className="absolute top-2 right-2 p-2 bg-[#ff5252] rounded-full hover:bg-[#ff7070] transition-colors shadow-lg cursor-pointer"
                    >
                        <IconX size={16} className="text-white" />
                    </button>
                    {isVideoThumb && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-[rgba(11,20,31,0.6)] p-3 rounded-full backdrop-blur-sm">
                                <IconVideo size={24} className="text-[#C0DDFF]" />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <label className="block">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageSelect}
                        className="hidden"
                    />
                    <div className="border-2 border-dashed border-[rgba(192,221,255,0.3)] rounded-xl p-8 hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-[rgba(192,221,255,0.1)] rounded-full flex items-center justify-center">
                            {isVideoThumb ? <IconVideo size={24} className="text-[#C0DDFF]" /> : <IconUpload size={24} className="text-[#C0DDFF]" />}
                        </div>
                        <div className="text-center">
                            <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                Upload {isVideoThumb ? 'Thumbnail' : 'Image'}
                            </p>
                            <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                JPG, PNG (Max 5MB)
                            </p>
                        </div>
                    </div>
                </label>
            )}
        </div>
    );
};

const PackageModal = ({ modalMode, packageData, setShowModal, refreshPackages }) => {
    const [formLoading, setFormLoading] = useState(false);
    
    const [formData, setFormData] = useState(() => {
        if (modalMode === 'edit' && packageData) {
            return {
                packageName: packageData.packageName || '',
                price: packageData.price || '',
                description: packageData.description || '',
                serviceLink: packageData.serviceLink || '',
                videoUrl: packageData.videoUrl || '',
            };
        }
        return {
            packageName: '',
            price: '',
            description: '',
            serviceLink: '',
            videoUrl: '',
        };
    });

    const [mainImage, setMainImage] = useState(() => {
        if (modalMode === 'edit' && packageData) {
            return { file: null, preview: packageData.mainImage };
        }
        return { file: null, preview: null };
    });

    const [videoThumbnail, setVideoThumbnail] = useState(() => {
        if (modalMode === 'edit' && packageData) {
            return { file: null, preview: packageData.videoThumbnail || null };
        }
        return { file: null, preview: null };
    });
    
    const [existingThumbnails, setExistingThumbnails] = useState(() => {
        if (modalMode === 'edit' && packageData) {
            return packageData.thumbnails || [];
        }
        return [];
    });

    const [newThumbFiles, setNewThumbFiles] = useState([]);
    const [newThumbPreviews, setNewThumbPreviews] = useState([]);
    const [deletedThumbnails, setDeletedThumbnails] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage({ file, preview: URL.createObjectURL(file) });
        }
    };

    const handleVideoThumbnail = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoThumbnail({ file, preview: URL.createObjectURL(file) });
        }
    };

    const handleGallerySelect = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingThumbnails.length + newThumbFiles.length + files.length;
        
        if (totalImages > 6) {
            Swal.fire({
                icon: 'error',
                title: 'Limit Exceeded',
                text: 'You can only have a maximum of 6 gallery images.',
                background: '#0B141F',
                color: '#DEEBFA'
            });
            return;
        }

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setNewThumbFiles([...newThumbFiles, ...files]);
        setNewThumbPreviews([...newThumbPreviews, ...newPreviews]);
    };

    const removeExistingThumbnail = (url) => {
        setExistingThumbnails(prev => prev.filter(item => item !== url));
        setDeletedThumbnails(prev => [...prev, url]);
    };

    const removeNewThumbnail = (index) => {
        setNewThumbFiles(prev => prev.filter((_, i) => i !== index));
        setNewThumbPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        const data = new FormData();
        data.append('packageName', formData.packageName);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('serviceLink', formData.serviceLink);
        data.append('videoUrl', formData.videoUrl);

        if (mainImage.file) data.append('mainImage', mainImage.file);
        if (videoThumbnail.file) data.append('videoThumbnail', videoThumbnail.file);

        newThumbFiles.forEach(file => {
            data.append('thumbnails', file);
        });

        try {
            let response;
            if (modalMode === 'add') {
                response = await api.post(`/api/v1/package/create`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                data.append('packageId', packageData._id);
                deletedThumbnails.forEach(url => {
                    data.append('deleteThumbnails', url);
                });
                response = await api.post(`/api/v1/package/edit`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log(response);
            }

            setFormLoading(false);
            Swal.fire({
                title: modalMode === 'add' ? 'Package Created!' : 'Package Updated!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                background: '#0B141F',
                color: '#DEEBFA'
            }).then(() => {
                refreshPackages();
                setShowModal(false);
            });

        } catch (error) {
            console.error('Operation failed:', error);
            setFormLoading(false);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Something went wrong',
                icon: 'error',
                background: '#0B141F',
                color: '#DEEBFA'
            });
        }
    };

    if (formLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-4xl w-full min-h-[400px] flex flex-col items-center justify-center">
                    <Loader />
                    <h4 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mt-4">Processing...</h4>
                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)] mt-1">Uploading files and saving data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[rgba(192,221,255,0.05)] [&::-webkit-scrollbar-thumb]:bg-[rgba(192,221,255,0.2)] [&::-webkit-scrollbar-thumb]:rounded-full">
                
                <div className="sticky top-0 bg-[#0B141F] border-b border-[rgba(192,221,255,0.15)] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                        {modalMode === 'add' ? 'Create New Package' : 'Edit Package'}
                    </h3>
                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full cursor-pointer transition-colors">
                        <IconX size={24} className="text-[#DEEBFA]" />
                    </button>
                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                Package Name <span className="text-[#ff5252]">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                name="packageName"
                                value={formData.packageName}
                                onChange={handleChange}
                                placeholder="e.g., Gold Premium"
                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                Price (৳) <span className="text-[#ff5252]">*</span>
                            </label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="5000"
                                className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe what this package offers..."
                            className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 px-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 resize-none placeholder:text-[rgba(192,221,255,0.4)]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                                Service Link
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="serviceLink"
                                    value={formData.serviceLink}
                                    onChange={handleChange}
                                    placeholder="External link..."
                                    className="w-full bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.2)] rounded-lg py-3 pl-10 pr-4 text-[#DEEBFA] font-urbanist text-[14px] focus:outline-none focus:border-[#C0DDFF] focus:ring-2 focus:ring-[rgba(192,221,255,0.2)] transition-all duration-300 placeholder:text-[rgba(192,221,255,0.4)]"
                                />
                                <IconLink size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(192,221,255,0.5)]" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[rgba(192,221,255,0.1)]">
                        <ImageUploader 
                            id="mainImage"
                            label="Main Cover Image" 
                            subLabel="Appears on the card front"
                            image={mainImage.preview}
                            onImageSelect={handleMainImage}
                            onRemove={() => setMainImage({ file: null, preview: null })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-urbanist text-[14px] font-semibold text-[#DEEBFA]">
                            Gallery Thumbnails <span className="text-[#DEEBFA] opacity-50 font-normal">(Max 6)</span>
                        </label>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {existingThumbnails.map((url, index) => (
                                <div key={`exist-${index}`} className="relative h-28 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)]">
                                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingThumbnail(url)}
                                        className="absolute top-1 right-1 p-1.5 bg-[#ff5252] rounded-full hover:bg-[#ff7070] transition-colors shadow-lg cursor-pointer"
                                    >
                                        <IconX size={12} className="text-white" />
                                    </button>
                                </div>
                            ))}

                            {newThumbPreviews.map((url, index) => (
                                <div key={`new-${index}`} className="relative h-28 rounded-lg overflow-hidden border border-[#C0DDFF] border-dashed">
                                    <img src={url} alt="New Upload" className="w-full h-full object-cover opacity-80" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewThumbnail(index)}
                                        className="absolute -top-1 -right-1 p-1.5 bg-[#ff5252] rounded-full hover:bg-[#ff7070] transition-colors shadow-lg cursor-pointer"
                                    >
                                        <IconX size={12} className="text-white" />
                                    </button>
                                </div>
                            ))}

                            {(existingThumbnails.length + newThumbFiles.length) < 6 && (
                                <label className="h-28 border-2 border-dashed border-[rgba(192,221,255,0.3)] rounded-lg hover:border-[#C0DDFF] hover:bg-[rgba(192,221,255,0.05)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleGallerySelect}
                                        className="hidden"
                                    />
                                    <IconPlus size={24} className="text-[#C0DDFF]" />
                                    <span className="font-urbanist text-[11px] text-[rgba(222,235,250,0.70)]">Add More</span>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[rgba(192,221,255,0.1)]">
                        <button
                            type='button'
                            onClick={() => setShowModal(false)}
                            className="flex-1 cursor-pointer bg-[rgba(192,221,255,0.1)] border-2 border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[15px] py-3.5 rounded-lg hover:bg-[rgba(192,221,255,0.15)] hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="flex-1 cursor-pointer bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[15px] py-3.5 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {modalMode === 'add' ? 'Create Package' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        const loadPackages = async () => {
            try {
                const response = await api.get(`/api/v1/package/packages`);
                setPackages(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
                setLoading(false);
            }
        };
        
        loadPackages();
    }, []);

    const refreshPackages = async () => {
        try {
            const response = await api.get(`/api/v1/package/packages`);
            setPackages(response.data.data);
        } catch (error) {
            console.error('Failed to fetch packages:', error);
        }
    };

    const handleDelete = async (packageId) => {
        console.log(packageId);
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff5252',
            cancelButtonColor: '#0B141F',
            confirmButtonText: 'Yes, delete it!',
            background: '#0B141F',
            color: '#DEEBFA'
        });

        if (result.isConfirmed) {
            try {
                await api.post(`/api/v1/package/delete`, { packageId });
                console.log(packageId);
                setPackages(packages.filter(pkg => pkg._id !== packageId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Package has been deleted.',
                    icon: 'success',
                    background: '#0B141F',
                    color: '#DEEBFA'
                });
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete package.', 'error');
            }
        }
    };

    const openAddModal = () => {
        setModalMode('add');
        setSelectedPackage(null);
        setShowModal(true);
    };

    const openEditModal = (pkg) => {
        setModalMode('edit');
        setSelectedPackage(pkg);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B141F] lg:pl-64">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                                Manage Featured Packages
                            </h1>
                        </div>
                    </div>
                    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center rounded-2xl border border-[rgba(192,221,255,0.1)] bg-[rgba(192,221,255,0.02)]">
                        <Loader />
                        <p className="font-urbanist text-[15px] text-[rgba(222,235,250,0.60)] mt-4">Loading packages...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B141F] lg:pl-64">
            <div className="p-4 sm:p-6 lg:p-8">

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                            Manage Featured Packages
                        </h1>
                        <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                            Create bundles, set prices, and manage gallery images
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-gradient-to-r cursor-pointer from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-bold text-[14px] px-6 py-3 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300 flex items-center gap-2"
                    >
                        <IconPlus size={20} />
                        Create New Package
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.length > 0 ? (packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl overflow-hidden hover:border-[#C0DDFF] transition-all duration-300 group flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden bg-black/40">
                                <img
                                    src={pkg.mainImage}
                                    alt={pkg.packageName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-[rgba(11,20,31,0.9)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(192,221,255,0.2)]">
                                    <span className="font-urbanist text-[14px] font-bold text-[#C0DDFF]">
                                        ৳{pkg.price}
                                    </span>
                                </div>
                                {pkg.thumbnails?.length > 0 && (
                                    <div className="absolute bottom-4 left-4 bg-[rgba(11,20,31,0.7)] backdrop-blur-sm px-2 py-1 rounded-md border border-[rgba(192,221,255,0.1)] flex items-center gap-1">
                                        <IconPhoto size={12} className="text-[#C0DDFF]" />
                                        <span className="font-urbanist text-[10px] text-[#DEEBFA] font-bold">+{pkg.thumbnails.length}</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-2 line-clamp-1">
                                    {pkg.packageName}
                                </h3>
                                <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.80)] mb-5 line-clamp-2 flex-1">
                                    {pkg.description || "No description provided."}
                                </p>

                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => openEditModal(pkg)}
                                        className="flex-1 cursor-pointer bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] text-[#DEEBFA] font-urbanist font-semibold text-[13px] py-2.5 rounded-lg hover:bg-[rgba(192,221,255,0.15)] hover:border-[rgba(192,221,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <IconEdit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="flex-1 cursor-pointer bg-[rgba(255,82,82,0.1)] border border-[rgba(255,82,82,0.3)] text-[#ff5252] font-urbanist font-semibold text-[13px] py-2.5 rounded-lg hover:bg-[rgba(255,82,82,0.15)] hover:border-[#ff5252] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <IconTrash size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <div onClick={openAddModal} className="col-span-full cursor-pointer flex flex-col items-center justify-center py-20 bg-[rgba(192,221,255,0.02)] rounded-2xl border border-dashed border-[rgba(192,221,255,0.1)]">
                            <div className="w-16 h-16 bg-[rgba(192,221,255,0.05)] rounded-full flex items-center justify-center mb-4">
                                <IconPlus size={32} className="text-[rgba(192,221,255,0.4)]" />
                            </div>
                            <p className="font-urbanist text-[16px] text-[#DEEBFA] font-semibold">No packages found</p>
                            <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.50)] mt-1">Get started by creating your first package</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <PackageModal 
                    modalMode={modalMode} 
                    packageData={selectedPackage} 
                    setShowModal={setShowModal} 
                    refreshPackages={refreshPackages}
                />
            )}
        </div>
    );
};

export default ManagePackages;