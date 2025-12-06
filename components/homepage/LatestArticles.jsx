import Btn from '@/components/Utils/Btn';
import Link from "next/link";
import HeadingLight from "../Utils/HeadingLight";

export default function LatestArticles() {
    const articles = [
        {
            id: 1,
            title: "Interior Design for Home Offices: Boost Your Productivity & Comfort",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=300&fit=crop",
            isFeatured: false
        },
        {
            id: 2,
            title: "Reviving Classic Design: Vintage Touches for Modern Homes",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
            isFeatured: false
        },
        {
            id: 3,
            title: "How to Maximize Small Spaces Without Sacrificing Style",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
            isFeatured: false
        }
    ];

    return (
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#9fadbe]">
            <HeadingLight text={'Blogs'} />
            <div className="max-w-7xl mx-auto">
                <div className="grid w-[90%] grid-cols-1 lg:max-w-full lg:w-[90%] mx-auto lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* pinned artile */}
                    <Link href={'/'}>
                        <div className="flex flex-col transition-all duration-200 ease-in hover:scale-[1.02] hover:brightness-[1.2]">

                            <div className="mb-6 rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                                    alt="Design workspace"
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold text-[#0b141f] mb-4">
                                The Psychology of Color: Choosing the Right Palette for Every Room
                            </h3>
                            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
                                Learn how different colors can affect mood and energy in your space, and how to choose the best shades for each room.
                            </p>
                            <button className="inline-flex items-center text-[#0b141f] font-medium text-lg hover:gap-3 transition-all group">
                                Read More
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </Link>


                    <div className="flex flex-col space-y-8">
                        {articles.map((article) => (
                            <Link href={'/'} key={article.id}>
                                <div className="flex flex-col border-b border-gray-200 pb-8 last:border-b-0 transition-all duration-200 ease-in hover:scale-[1.02] hover:brightness-[1.2]">
                                    <div className="flex flex-col sm:flex-row gap-6">

                                        <div className="sm:w-56 flex-shrink-0">
                                            <div className="rounded-2xl overflow-hidden h-40 sm:h-full">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl font-bold text-[#0b141f] mb-4 leading-tight">
                                                {article.title}
                                            </h3>
                                            <button className="inline-flex cursor-pointer items-center text-gray-700 hover:text-[#0b141f] font-medium hover:gap-3 transition-all group">
                                                Read More
                                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        ))}

                        <div className="flex justify-start pt-4">
                            <Btn text={'View All'} link={'/'} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}