'use client';

import Heading from '@/components/Utils/Heading';
import Loader from '@/components/Utils/Loader';
import api from '@/lib/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProjectSection = ({ project, index }) => {
  const [activeImage, setActiveImage] = useState(project.mainImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const [packages, setPackages] = useState([]);

  const handleThumbnailClick = (thumbnail, idx) => {
    if (idx === activeIndex) return;
    setActiveImage(thumbnail);
    setActiveIndex(idx);
  };


  return (
    <section
      className={`relative overflow-hidden pb-12 ${project.reversed ? 'bg-transparent pt-12 pb-12' : 'bg-[#0B141F]'
        }`}
    >
      <div className="relative mx-auto w-[90%] overflow-hidden">

        {!project.reversed && (
          <img
            src="/Images/section-four/fourth-overlay-shadow.png"
            alt=""
            className="absolute left-1/2 -translate-x-1/2 w-full pointer-events-none"
          />
        )}

        {index === 0 && (
          <div className='py-8'>
            <Heading text={'Featured Packages'} />
          </div>

        )}

        <div
          className={`max-w-[1300px] mx-auto flex flex-col md:flex-row ${project.reversed ? 'md:flex-row-reverse' : ''
            } justify-around items-center gap-4`}
        >
          <div className="relative w-full md:w-auto">
            <img
              src={activeImage}
              alt="Project"
              className="pinned-project-img w-full max-w-[985px] rounded-[15px] md:rounded-[25px] cursor-pointer block object-cover"
              style={{
                clipPath: 'url(#projectClip)',
              }}
            />

            <button className="project-pinned-pic-btn flex flex-col items-center justify-center w-[31%] h-[16%] bg-[#9FADBE] rounded-[900px] absolute bottom-[13px] left-0 border-none outline-none cursor-pointer hover:scale-[1.01] hover:brightness-110 transition-all">
              <p className="package-type font-['Urbanist'] font-semibold text-[#0B141F]">
                {project.packageName}
              </p>
              <p className="package-price font-['Urbanist'] font-medium text-[#0B141F]">
                {project.price}
              </p>
            </button>

            <Link href={project.serviceLink}>
              <button className="project-details-page-indicator-btn absolute top-[10px] right-[10px] bg-[#9FADBE] border-none outline-none cursor-pointer px-[20px] py-[10px] rounded-[50px] flex items-center gap-[5px] z-[9999] hover:scale-105 hover:brightness-115 transition-all">
                <span className="project-button-text font-urbanist text-[15px] font-medium text-[#0B141F]">
                  Order Now
                </span>
                <img
                  src="/Images/section-four/button-arrow.svg"
                  alt=""
                  className="cta-btn-arrow h-[40px] w-[40px] relative left-[10px]"
                />
              </button>
            </Link>
          </div>

          <div className="fourth-right grid grid-cols-2 items-center gap-4">
            {project.thumbnails.map((thumbnail, idx) => (
              <div
                key={idx}
                className="other-project-imgs relative cursor-pointer"
                onClick={() => handleThumbnailClick(thumbnail, idx)}
              >
                <img
                  src={thumbnail}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-[149px] h-[177px] rounded-[12px] object-cover"
                />
                {idx !== activeIndex && (
                  <div className="thumbnail-overlay absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] rounded-[12px] cursor-pointer transition-opacity duration-200 z-[1] hover:opacity-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
       
        .pinned-project-img {
          width: 100%;
          height: 566px;
          min-height: 566px;
          aspect-ratio: 985 / 566;
        }

     

        .package-type {
          font-size: 18px;
          line-height: 1.2;
        }

        .package-price {
          font-size: 18px;
          line-height: 1.2;
        }

        
        @media (max-width: 1350px) {
          .fourth-video-thumbnail {
            width: 90%;
          }
          .video-overlay-text {
            font-size: 155px;
          }
        }

        @media (max-width: 1300px) {
          .video-overlay-text {
            font-size: 135px;
          }
        }

        
        @media (max-width: 1270px) and (min-width: 1101px) {
          .pinned-project-img {
            width: 100% !important;
            height: 515px !important;
            min-height: 515px !important;
          }
          .fourth-right img {
            width: auto;
            height: 160px;
          }
          .video-play-icon {
            width: 180px;
            height: auto;
          }
        }

        @media (max-width: 1100px) and (min-width: 1025px) {
          .pinned-project-img {
            width: 100% !important;
            height: 450px !important;
            min-height: 450px !important;
          }
          .fourth-right img {
            width: auto;
            height: 135px;
          }
          .video-play-icon {
            width: 180px;
            height: auto;
          }
        }

        @media (max-width: 1200px) {
          .video-play-icon {
            width: 120px;
            height: auto;
          }
          .video-overlay-text {
            font-size: 130px;
          }
          .project-pinned-pic-btn {
            width: 30%;
            height: 15%;
            padding: 6px 10px;
            gap: 6px;
          }
          .package-type {
            font-size: 15px;
          }
          .package-price {
            font-size: 13px;
          }
        }

        @media (max-width: 1080px) {
          .video-overlay-text {
            font-size: 120px;
          }
        }

        @media (max-width: 1024px) {
          .pinned-project-img {
            width: 600px !important;
            height: 350px !important;
            min-height: 350px !important;
            max-width: 600px !important;
          }
          .fourth-right img {
            width: 100%;
            max-height: 110px;
          }
        }

        @media (max-width: 980px) {
          .video-play-icon {
            width: 90px;
          }
          .video-overlay-text {
            font-size: 100px;
          }
        }

        @media (max-width: 880px) {
          .pinned-project-img {
            width: 500px !important;
            height: 350px !important;
            min-height: 350px !important;
            max-width: 500px !important;
          }
        }

        @media (max-width: 840px) {
          .video-overlay-text {
            font-size: 80px;
          }
        }

        @media (max-width: 767px) {
          .pinned-project-img {
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            max-width: 985px !important;
          }
          .project-pinned-pic-btn {
            gap: 2px;
            bottom: 5px;
            left: 0;
          }
          .package-type {
            font-size: 11px;
          }
          .package-price {
            font-size: 11px;
          }
          .video-play-icon {
            width: 70px;
          }
          .fourth-right img {
            width: 100%;
            max-height: 171px;
            height: 100%;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .pinned-project-img {
            clip-path: none !important;
          }
          .project-pinned-pic-btn {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .package-type {
            font-size: 10px;
          }
          .package-price {
            font-size: 10px;
          }
        }

        @media (min-width: 600px) and (max-width: 767px) {
          .cta-btn-arrow {
            width: min-content;
          }
        }

        @media (max-width: 600px) {
          .project-pinned-pic-btn {
            display: none;
          }
          .pinned-project-img {
            clip-path: none !important;
          }
          .fourth-right img {
            width: 200px;
            height: 300px;
          }
          .video-overlay-text {
            font-size: 50px;
          }
          .project-details-page-indicator-btn img {
            height: 30px !important;
            width: 30px !important;
          }
          .project-details-page-indicator-btn {
            padding: 7px 15px;
          }
        }

        @media (max-width: 425px) {
          .video-play-icon {
            width: 60px;
          }
          .video-overlay-text {
            font-size: 40px;
          }
          .project-button-text {
            font-size: 12px;
          }
          .project-details-page-indicator-btn {
            padding: 2px 4px;
          }
          .project-details-page-indicator-btn img {
            left: -1px;
          }
          .project-button-text {
            right: -4px;
          }
        }

        @media (max-width: 400px) {
          .video-overlay-text {
            font-size: 35px;
          }
        }

        @media (max-width: 375px) {
          .fourth-right img {
            width: 140px;
            height: 150px;
          }
        }

        @media (max-width: 360px) {
          .fourth-video-thumbnail {
            width: 100%;
          }
        }

        @media (max-width: 330px) {
          .fourth-right {
            scale: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/api/v1/package/packages');
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="projectClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.0442 C0,0.0198 0.0114,0 0.0254,0 H0.9746 C0.9886,0 1,0.0198 1,0.0442 V0.9558 C1,0.9802 0.9886,1 0.9746,1 H0.5,0.3493 C0.334,1 0.322,0.9764 0.3242,0.9497 L0.3267,0.9165 C0.332,0.8508 0.3025,0.7923 0.2644,0.7923 H0.0254 C0.0114,0.7923 0,0.7725 0,0.7481 V0.5,0.0442 Z" />
          </clipPath>
        </defs>
      </svg>

      {packages.map((pkg, index) => {
        const projectData = {
          ...pkg,
          id: pkg._id,
          price: `৳${pkg.price.toLocaleString()} BDT`,
          reversed: index % 2 !== 0
        };

        return (
          <ProjectSection
            key={pkg._id}
            project={projectData}
            index={index}
          />
        );
      })}
    </>
  );
}