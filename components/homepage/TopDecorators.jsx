"use client";
import api from "@/lib/axios";
import { Award, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopDecorators() {
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        const response = await api.get('/api/v1/users/topDecor');
        if (response.data.success) {
          const formattedDecorators = response.data.data.map(d => ({
            id: d._id,
            name: d.name,
            title: "Professional Decorator", 
            image: d.image || "/Images/decorators/default.jpg", 
            rating: d.rating || 0,
            reviews: d.totalRatings || 0,
            specialties: d.specialty === "All" 
              ? ["Weddings", "Events", "Home"] 
              : [d.specialty], 
            featured: d.isFeaturedDecorator
          }));
          setDecorators(formattedDecorators);
        }
      } catch (error) {
        console.error("Failed to fetch top decorators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecorators();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-600 text-gray-600"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="w-full py-24 bg-[#0B141F] flex justify-center">
         <p className="text-[#deebfacc] text-xl font-urbanist animate-pulse">Loading Top Decorators...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0B141F]">
      <div className="max-w-[1300px] w-[90%] mx-auto max-[400px]:w-full">
      
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#deebfacc] mb-4">
            Meet Our Top Decorators
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Talented professionals ready to bring your vision to life with creativity and excellence
          </p>
        </div>

        {decorators.length === 0 ? (
           <div className="text-center text-gray-400 py-10">
             No featured decorators found at the moment.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {decorators.map((decorator) => (
              <div
                key={decorator.id}
                className="group relative bg-[#1a2937] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {decorator.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-[#9fadbe] text-[#0b141f] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Award className="h-3 w-3" />
                    Featured
                  </div>
                )}

                <div className="relative h-72 overflow-hidden">
                  <img
                    src={decorator.image}
                    alt={decorator.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2937] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {decorator.name}
                    </h3>
                    <p className="text-[#9fadbe] font-medium">
                      {decorator.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {renderStars(decorator.rating)}
                    </div>
                    <span className="text-gray-300 font-semibold">
                      {decorator.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#253646] text-gray-300 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-[#9fadbe] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}