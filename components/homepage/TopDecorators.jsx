"use client";

import { Award, Star } from "lucide-react";
import { useState } from "react";
import Cta from "../Utils/Cta";

export default function TopDecorators() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Decorators" },
    { id: "wedding", label: "Wedding Experts" },
    { id: "event", label: "Event Specialists" },
    { id: "home", label: "Home Decor" }
  ];

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

  const filteredDecorators = activeCategory === "all" 
    ? decorators 
    : decorators.filter(d => d.category === activeCategory);

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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 cursor-pointer py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#9fadbe] text-[#0b141f] shadow-lg scale-105"
                  : "bg-[#1a2937] text-gray-300 hover:bg-[#253646] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDecorators.map((decorator, index) => (
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    {decorator.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({decorator.reviews} reviews)
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

                {/* <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{decorator.projectsCompleted}+ Projects</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{decorator.location}</span>
                  </div>
                </div> */}

                <div className="flex gap-3">
                  <button className="flex-1 cursor-pointer py-3 bg-[#9fadbe] hover:bg-[#8a9dae] text-[#0b141f] rounded-full font-bold transition-all hover:shadow-lg">
                    View Profile
                  </button>
                  <button className="px-5 cursor-pointer py-3 bg-[#253646] hover:bg-[#2d3f52] text-white rounded-full font-bold transition-all">
                    Book
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-[#9fadbe] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        
        <Cta href={'/'} text={'View All Decors'} styles={'mt-8 mx-auto'}/>
      </div>
    </div>
  );
}

// Dummy data - in production, this would come from your server
const decorators = [
  {
    id: 1,
    name: "Jhankar Mahbub",
    title: "Wedding Decoration Expert",
    image: "/Images/decorators/jhankar.jpg",
    rating: 4.9,
    reviews: 127,
    specialties: ["Weddings", "Floral Design", "Luxury Events"],
    projectsCompleted: 150,
    location: "New York",
    category: "wedding",
    featured: true
  },
  {
    id: 2,
    name: "Azizul Islam Milton",
    title: "Event Specialist",
    image: "/Images/decorators/milton.jpg",
    rating: 4.8,
    reviews: 98,
    specialties: ["Corporate Events", "Stage Design", "Lighting"],
    projectsCompleted: 200,
    location: "Los Angeles",
    category: "event",
    featured: true
  },
  {
    id: 3,
    name: "Talha Tarique",
    title: "Home Decor Consultant",
    image: "/Images/decorators/talha.jpg",
    rating: 5.0,
    reviews: 145,
    specialties: ["Interior Design", "Seasonal Decor", "Minimalist"],
    projectsCompleted: 180,
    location: "San Francisco",
    category: "home",
    featured: false
  },
  {
    id: 4,
    name: "Sumaiya Kabir",
    title: "Luxury Wedding Designer",
    image: "/Images/decorators/tandra.jpg",
    rating: 4.9,
    reviews: 156,
    specialties: ["Destination Weddings", "Luxury Setups", "Beach Themes"],
    projectsCompleted: 120,
    location: "Miami",
    category: "wedding",
    featured: true
  },
  {
    id: 5,
    name: "Ahmad Tarique ",
    title: "Cultural Event Specialist",
    image: "/Images/decorators/tarique.jpg",
    rating: 4.7,
    reviews: 89,
    specialties: ["Traditional Ceremonies", "Cultural Fusion", "Vibrant Colors"],
    projectsCompleted: 95,
    location: "Chicago",
    category: "event",
    featured: false
  },
  {
    id: 6,
    name: "Ferdous Zihad",
    title: "Modern Home Stylist",
    image: "/Images/decorators/zihad.jpg",
    rating: 4.8,
    reviews: 112,
    specialties: ["Contemporary", "Scandinavian", "Smart Homes"],
    projectsCompleted: 140,
    location: "Seattle",
    category: "home",
    featured: false
  }
];