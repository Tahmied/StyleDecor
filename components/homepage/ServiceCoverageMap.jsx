"use client";

import "leaflet/dist/leaflet.css";
import { ArrowRight, Clock, MapPin, Navigation, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function FlyToArea({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 13, { duration: 1.2 });
  }
  return null;
}

const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path fill="#0b141f" stroke="#fff" stroke-width="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 1.996.471 3.882 1.305 5.547l10.39 21.265a.75.75 0 001.31 0l10.39-21.265A12.434 12.434 0 0025 12.5C25 5.596 19.404 0 12.5 0z"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

export default function ServiceCoverageMap() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [activeCoords, setActiveCoords] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const mapRef = useRef(null);

  const handleAreaClick = (area) => {
    setSelectedArea(area.id);
    setActiveCoords(area.coordinates);
    
 
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#9fadbe]">
      <div className="max-w-7xl mx-auto">
      
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0b141f] mb-4">
            Where We Serve
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Bringing beautiful decorations to your doorstep across multiple locations
          </p>
        </div>

       
        <div ref={mapRef} className="mb-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-[500px] md:h-[600px] relative">
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={11}
              scrollWheelZoom={false}
              dragging={true}
              doubleClickZoom={true}
              className="h-full w-full z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FlyToArea coords={activeCoords} />

              <Marker icon={customIcon} position={[40.7128, -74.006]}>
                <Popup>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Main Office</h3>
                    <p className="text-sm text-gray-600">Downtown District</p>
                    <p className="text-xs text-gray-500 mt-2">Central Hub - Open 24/7</p>
                  </div>
                </Popup>
              </Marker>

              {coverageAreas.map((area) => (
                <div key={area.id}>
                  <Circle
                    center={area.coordinates}
                    radius={area.radiusMeters}
                    pathOptions={{
                      color: hoveredArea === area.id ? "#0b141f" : "#9fadbe",
                      fillColor: "#9fadbe",
                      fillOpacity: 0,
                      weight: hoveredArea === area.id ? 3 : 2,
                    }}
                  />
                  <Marker
                    position={area.coordinates}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => {
                        setSelectedArea(area.id);
                        setActiveCoords(area.coordinates);
                      },
                    }}
                  >
                    <Popup>
                      <div className="p-3 min-w-[200px]">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{area.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{area.region}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Navigation className="h-3 w-3" />
                          <span>{area.radius} coverage</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <Clock className="h-3 w-3" />
                          <span>{area.responseTime} response</span>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            area.available
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {area.available ? "Available Now" : "Book Ahead"}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              ))}
            </MapContainer>

            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow-lg px-4 py-2 rounded-full text-sm font-semibold z-[1000] flex items-center gap-2 border border-gray-200">
              <Navigation className="h-4 w-4 text-gray-700" />
              <span className="text-gray-700">Drag to explore • Click markers</span>
            </div>


            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl p-4 z-[1000] border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                <span className="text-xs font-semibold text-gray-700">Main Office</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow"></div>
                <span className="text-xs font-semibold text-gray-700">Service Areas</span>
              </div>
            </div>
          </div>
        </div>


        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((area) => (
              <div
                key={area.id}
                onMouseEnter={() => setHoveredArea(area.id)}
                onMouseLeave={() => setHoveredArea(null)}
                onClick={() => handleAreaClick(area)}
                className={`
                  group relative overflow-hidden rounded-3xl cursor-pointer
                  transition-all duration-300 hover:shadow-2xl
                  ${selectedArea === area.id ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
                `}
              >
               
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b141f] to-[#1a2937]" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                <div className="relative p-6 min-h-[280px] flex flex-col">

                  <div className="flex justify-end mb-4">
                    <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-end space-y-3">
                    <h4 className="text-2xl font-bold text-white leading-tight">
                      {area.name}
                    </h4>
                    <p className="text-gray-200 text-sm">
                      {area.region}
                    </p>

                    <div className="space-y-2 text-sm text-gray-300 mb-8">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4" />
                        <span>{area.radius} coverage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{area.responseTime} response</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>{area.completedProjects} projects</span>
                      </div>
                    </div>

                    <div className="inline-block">
                      <span className={`px-4 py-2 backdrop-blur-sm rounded-full text-white text-sm font-semibold border ${
                        area.available 
                          ? 'bg-green-500/20 border-green-300/30' 
                          : 'bg-orange-500/20 border-orange-300/30'
                      }`}>
                        {area.available ? '● Available Now' : '● Book Ahead'}
                      </span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="mt-2 px-6 py-2 bg-white text-[#0b141f] rounded-full font-bold text-sm hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                        View on Map
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Coverage areas demo data
 const coverageAreas = [
  {
    id: 1,
    name: "Gulshan, Dhaka",
    region: "Central District",
    available: true,
    radius: "15 miles",
    radiusMeters: 24140,
    responseTime: "Same day",
    completedProjects: 342,
    coordinates: [23.7925, 90.4078],
  },
  {
    id: 2,
    name: "Tahmieds House, Jashore",
    region: "Northern Region",
    available: true,
    radius: "20 miles",
    radiusMeters: 32186,
    responseTime: "24 hours",
    completedProjects: 256,
    coordinates: [23.1675203, 89.2217594],
  },
  {
    id: 3,
    name: "Sonadanga, Khulna",
    region: "Western Area",
    available: false,
    radius: "18 miles",
    radiusMeters: 28968,
    responseTime: "48 hours",
    completedProjects: 189,
    coordinates: [22.8158, 89.5463],
  },
  {
    id: 4,
    name: "Zindabazar, Sylhet",
    region: "Eastern Region",
    available: true,
    radius: "25 miles",
    radiusMeters: 40233,
    responseTime: "Same day",
    completedProjects: 412,
    coordinates: [24.8949, 91.8687],
  },
  {
    id: 5,
    name: "Shaheb Bazar, Rajshahi",
    region: "Southern District",
    available: true,
    radius: "22 miles",
    radiusMeters: 35405,
    responseTime: "24 hours",
    completedProjects: 298,
    coordinates: [24.3636, 88.6241],
  },
  {
    id: 6,
    name: "Rupatali, Barishal",
    region: "Outer Ring",
    available: false,
    radius: "30 miles",
    radiusMeters: 48280,
    responseTime: "2-3 days",
    completedProjects: 134,
    coordinates: [22.6955, 90.3526],
  },
];