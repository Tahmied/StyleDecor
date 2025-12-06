'use client';

import dynamic from "next/dynamic";

const ServiceCoverageMap = dynamic(
  () => import("@/components/homepage/ServiceCoverageMap"),
  { 
    ssr: false, 
    loading: () => <div className="h-[500px] bg-gray-100 rounded-3xl animate-pulse"></div> 
  }
);

export default function MapLoader() {
  return <ServiceCoverageMap />;
}