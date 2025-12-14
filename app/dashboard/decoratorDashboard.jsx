'use client'
import {
    IconCalendar,
    IconCheck,
    IconClock,
    IconCurrencyTaka,
    IconMapPin,
    IconPackage,
    IconReceipt,
    IconUser
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../lib/axios';

const DecoratorDashboard = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [assignedProjects, setProjects] = useState([])
    const [earningsData, setEarningData] = useState({})
    const [todaySchedule, setTodaysSchedule] = useState([])
    const [decorPay, setDecorPay] = useState([])

    useEffect(() => {
        const getAssignedProjects = async () => {
            const res = await api.get('/api/v1/booking/MyServiceBookings')
            setProjects(res.data.data)
            return res.data.data
        }
        const getDecorStates = async () => {
            const res = await api.get('/api/v1/users/getDecorStates')
            setEarningData(res.data.data)
            return res.data.data
        }
        const getTodaysSchedule = async () => {
            const res = await api.get('/api/v1/booking/getTodaysDecorSchedule')
            setTodaysSchedule(res.data.data)
            return res.data.data
        }
        const fetchDecorPay = async () => {
            const res = await api.get('/api/v1/payment/myDecorPay')
            setDecorPay(res.data.data)
            return res.data.data
        }

        getAssignedProjects()
        getDecorStates()
        getTodaysSchedule()
        fetchDecorPay()
    }, [])

    console.log(decorPay);

    const statusOptions = [
        'Assigned',
        'Planning Phase',
        'Materials Prepared',
        'On the Way to Venue',
        'Setup in Progress',
        'Completed'
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Assigned': 'bg-[rgba(33,150,243,0.15)] border-[rgba(33,150,243,0.3)] text-[#2196F3]',
            'Planning Phase': 'bg-[rgba(156,39,176,0.15)] border-[rgba(156,39,176,0.3)] text-[#9C27B0]',
            'Materials Prepared': 'bg-[rgba(3,169,244,0.15)] border-[rgba(3,169,244,0.3)] text-[#03A9F4]',
            'On the Way to Venue': 'bg-[rgba(255,193,7,0.15)] border-[rgba(255,193,7,0.3)] text-[#FFC107]',
            'Setup in Progress': 'bg-[rgba(255,87,34,0.15)] border-[rgba(255,87,34,0.3)] text-[#FF5722]',
            'Completed': 'bg-[rgba(76,175,80,0.15)] border-[rgba(76,175,80,0.3)] text-[#4CAF50]'
        };
        return colors[status] || colors['Assigned'];
    };

    const handleUpdateStatus = (project) => {
        setSelectedProject(project);
        setShowStatusModal(true);
    };

    const handleStatusChange = async (newStatus) => {
        await api.post('/api/v1/users/updateBookingStutes', {
            bookingId: selectedProject._id,
            status: newStatus
        })

        setProjects(currentProjects =>
            currentProjects.map(project =>
                project._id === selectedProject._id
                    ? { ...project, status: newStatus }
                    : project
            )
        );

        Swal.fire({
            title: 'Status updated!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            setShowStatusModal(false)
            setSelectedProject(null)
        })
    };


    return (
        <div className="min-h-screen bg-[#0B141F] py-8 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="font-urbanist text-[32px] md:text-[40px] font-bold text-[#DEEBFA] mb-2">
                        Decorator Dashboard
                    </h1>
                    <p className="font-urbanist text-[16px] text-[rgba(222,235,250,0.70)]">
                        Manage your projects and track your progress
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                    <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-lg">
                                <IconCurrencyTaka size={24} className="text-white" />
                            </div>
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] mb-1">Total Earnings</p>
                        <p className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                            ৳{earningsData.totalEarnings}
                        </p>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-xl p-5">
                        <div className="p-2.5 bg-gradient-to-r from-[#2196F3] to-[#1976D2] rounded-lg w-fit mb-3">
                            <IconCurrencyTaka size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] mb-1">This Month</p>
                        <p className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                            ৳{earningsData.thisMonthEarnings}
                        </p>
                    </div>

                    <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-xl p-5">
                        <div className="p-2.5 bg-gradient-to-r from-[#9C27B0] to-[#7B1FA2] rounded-lg w-fit mb-3">
                            <IconCheck size={24} className="text-white" />
                        </div>
                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)] mb-1">Completed Projects</p>
                        <p className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                            {earningsData.completedProjectsCount}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                    My Assigned Projects
                                </h2>
                                <div className="px-3 py-1.5 bg-[rgba(192,221,255,0.1)] border border-[rgba(192,221,255,0.2)] rounded-full">
                                    <span className="font-urbanist text-[13px] font-semibold text-[#C0DDFF]">
                                        {assignedProjects.length} Active
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {
                                    assignedProjects.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-[rgba(192,221,255,0.15)] rounded-xl bg-[rgba(192,221,255,0.02)]">
                                        <div className="p-4 bg-[rgba(192,221,255,0.05)] rounded-full mb-4">
                                            <IconPackage size={48} className="text-[rgba(192,221,255,0.3)]" />
                                        </div>
                                        <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-1">
                                            No Projects Assigned
                                        </h3>
                                        <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)] text-center max-w-xs">
                                            You don't have any active decoration projects at the moment. New assignments will appear here.
                                        </p>
                                    </div>
                                    ): ('')
                                }
                                {assignedProjects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.15)] rounded-xl overflow-hidden hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4 p-4">
                                            <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden border border-[rgba(192,221,255,0.2)]">
                                                <img
                                                    src={project.customerImage}
                                                    alt={project.serviceName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className="font-urbanist text-[18px] font-bold text-[#DEEBFA] mb-1">
                                                            {project.serviceName}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-[rgba(222,235,250,0.70)] mb-2">
                                                            <IconUser size={16} />
                                                            <span className="font-urbanist text-[13px]">{project.customerName}</span>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full border font-urbanist text-[11px] font-semibold whitespace-nowrap ${getStatusColor(project.status)}`}>
                                                        {project.status}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-[rgba(222,235,250,0.70)]">
                                                        <IconCalendar size={16} className="text-[#C0DDFF]" />
                                                        <span className="font-urbanist text-[13px]">
                                                            {new Date(project.eventDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    {
                                                        project.eventLocation ? (
                                                            <div className="flex items-center gap-2 text-[rgba(222,235,250,0.70)]">
                                                                <IconMapPin size={16} className="text-[#C0DDFF]" />
                                                                <span className="font-urbanist text-[13px]">{project.eventLocation}</span>
                                                            </div>
                                                        ) : ('')
                                                    }
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[rgba(192,221,255,0.15)]">
                                                    <div>
                                                        <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.60)] mb-1">
                                                            Project Value
                                                        </p>
                                                        <p className="font-urbanist text-[20px] font-bold text-[#C0DDFF]">
                                                            ৳{project.servicePrice
                                                            }
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUpdateStatus(project)}
                                                        className="w-full sm:w-auto bg-gradient-to-r from-[#C0DDFF] to-[#A0B8D4] text-[#0B141F] font-urbanist font-semibold text-[13px] px-5 py-2.5 rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-[rgba(192,221,255,0.3)] transition-all duration-300"
                                                    >
                                                        Update Status
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                       
                       
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6 mt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <IconReceipt size={24} className="text-[#C0DDFF]" />
                                <h2 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                    Received Payment
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[rgba(192,221,255,0.1)] text-[rgba(222,235,250,0.6)] font-urbanist text-[13px] uppercase tracking-wider">
                                            <th className="p-4 font-medium">Service</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Transaction ID</th>
                                            <th className="p-4 font-medium text-right">Amount</th>
                                            <th className="p-4 font-medium text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-urbanist text-[14px] text-[#DEEBFA]">
                                        {decorPay.length > 0 ? (
                                            decorPay.map((payment) => (
                                                <tr key={payment._id} className="border-b border-[rgba(192,221,255,0.05)] hover:bg-[rgba(192,221,255,0.02)] transition-colors">
                                                    <td className="p-4 font-semibold">{payment.serviceName}</td>
                                                    <td className="p-4">
                                                        {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="p-4 font-mono text-[13px] text-[rgba(222,235,250,0.7)]">
                                                        {payment.transactionId}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <span className="text-[#C0DDFF] font-bold">
                                                            ৳{payment.amount.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${payment.status === 'paid'
                                                                ? 'bg-[rgba(76,175,80,0.15)] text-[#4CAF50] border-[rgba(76,175,80,0.3)]'
                                                                : 'bg-[rgba(244,67,54,0.15)] text-[#F44336] border-[rgba(244,67,54,0.3)]'
                                                            }`}>
                                                            {payment.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-[rgba(222,235,250,0.6)]">
                                                    No payment history found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[rgba(192,221,255,0.05)] backdrop-blur-sm border border-[rgba(192,221,255,0.15)] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <IconClock size={24} className="text-[#C0DDFF]" />
                                <h2 className="font-urbanist text-[20px] font-bold text-[#DEEBFA]">
                                    Todays Schedule
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {todaySchedule.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-[rgba(11,20,31,0.6)] border border-[rgba(192,221,255,0.15)] rounded-lg p-4 hover:border-[rgba(192,221,255,0.3)] transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-urbanist text-[14px] font-semibold text-[#C0DDFF] mb-1">
                                                    {item.eventTime}
                                                </p>
                                                <h4 className="font-urbanist text-[15px] font-bold text-[#DEEBFA] mb-1">
                                                    {item.serviceName}
                                                </h4>
                                                <p className="font-urbanist text-[12px] text-[rgba(222,235,250,0.60)]">
                                                    {item.customerName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {todaySchedule.length === 0 && (
                                <div className="text-center py-8">
                                    <IconCalendar size={48} className="text-[rgba(192,221,255,0.3)] mx-auto mb-3" />
                                    <p className="font-urbanist text-[14px] text-[rgba(222,235,250,0.60)]">
                                        No schedule for today
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showStatusModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B141F] border-2 border-[rgba(192,221,255,0.2)] rounded-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-urbanist text-[24px] font-bold text-[#DEEBFA]">
                                Update Project Status
                            </h3>
                            <button
                                onClick={() => {
                                    setShowStatusModal(false);
                                    setSelectedProject(null);
                                }}
                                className="p-2 hover:bg-[rgba(192,221,255,0.1)] rounded-full transition-colors"
                            >
                                <IconPackage size={24} className="text-[#DEEBFA]" />
                            </button>
                        </div>

                        <div className="mb-6 p-4 bg-[rgba(192,221,255,0.08)] border border-[rgba(192,221,255,0.2)] rounded-lg">
                            <h4 className="font-urbanist text-[16px] font-semibold text-[#DEEBFA] mb-1">
                                {selectedProject.serviceName}
                            </h4>
                            <p className="font-urbanist text-[13px] text-[rgba(222,235,250,0.70)]">
                                Client: {selectedProject.clientName}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="font-urbanist text-[14px] font-semibold text-[#DEEBFA] mb-3">
                                Select new status:
                            </p>
                            {statusOptions.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`w-full text-left px-4 py-3 rounded-lg border font-urbanist text-[14px] font-semibold transition-all duration-300 ${selectedProject.status === status
                                        ? 'bg-[rgba(192,221,255,0.15)] border-[#C0DDFF] text-[#C0DDFF]'
                                        : 'bg-[rgba(11,20,31,0.6)] border-[rgba(192,221,255,0.15)] text-[rgba(222,235,250,0.80)] hover:border-[rgba(192,221,255,0.3)] hover:bg-[rgba(192,221,255,0.08)]'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecoratorDashboard;