'use client';

import { useState } from 'react';

// Dummy data - replace with database fetch later
const PROJECTS_DATA = [
  {
    id: 1,
    mainImage: '/images/section-four/project-one-pinned.png',
    packageType: 'Home Decor',
    price: '$10,000 BDT',
    videoThumbnail: '/images/section-four/fourth-video-thumbnail.png',
    thumbnails: [
      '/images/section-four/project-one-pinned.png',
      '/images/section-four/other-project-one-imgs1.png',
      '/images/section-four/other-project-one-imgs1.png',
      '/images/section-four/other-project-one-imgs2.png',
      '/images/section-four/other-project-one-imgs3.png',
      '/images/section-four/other-project-one-imgs-3.png',
    ],
    reversed: false,
  },
  {
    id: 2,
    mainImage: '/images/section-four/project-one-pinned.png',
    packageType: 'Home Decor',
    price: '$10,000 BDT',
    videoThumbnail: '/images/section-four/fourth-video-thumbnail.png',
    thumbnails: [
      '/images/section-four/project-one-pinned.png',
      '/images/section-four/other-project-one-imgs1.png',
      '/images/section-four/other-project-one-imgs1.png',
      '/images/section-four/other-project-one-imgs2.png',
      '/images/section-four/other-project-one-imgs3.png',
      '/images/section-four/other-project-one-imgs-3.png',
    ],
    reversed: true,
  },
];

const ProjectSection = ({ project, index }) => {
  const [activeImage, setActiveImage] = useState(project.mainImage);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (thumbnail, idx) => {
    if (idx === activeIndex) return;
    setActiveImage(thumbnail);
    setActiveIndex(idx);
  };

  return (
    <section
      className={`relative overflow-hidden py-8 ${
        project.reversed ? 'bg-transparent pt-12' : 'bg-[#0B141F]'
      }`}
    >
      <div className="relative mx-auto w-[90%] overflow-hidden">
        {/* Overlay Shadow - only for first section */}
        {!project.reversed && (
          <img
            src="/images/section-four/fourth-overlay-shadow.png"
            alt=""
            className="absolute left-1/2 -translate-x-1/2 w-full pointer-events-none"
          />
        )}

        {/* Heading - only for first section */}
        {index === 0 && (
          <h2
            className="font-['Urbanist'] font-normal text-[40px] md:text-[60px] lg:text-[90px] text-center capitalize mb-8"
            style={{
              background:
                'linear-gradient(90deg, #0B141F 0%, #BAC9DD 33.17%, #BAC9DD 60.1%, #0B141F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Featured Projects
          </h2>
        )}

        {/* Project Container */}
        <div
          className={`max-w-[1300px] mx-auto flex flex-col md:flex-row ${
            project.reversed ? 'md:flex-row-reverse' : ''
          } justify-around items-center gap-4`}
        >
          {/* Left - Main Image */}
          <div className="relative w-full md:w-auto">
            <img
              src={activeImage}
              alt="Project"
              className="pinned-project-img w-full max-w-[985px] rounded-[15px] md:rounded-[25px] cursor-pointer block object-cover"
              style={{
                clipPath: 'url(#projectClip)',
              }}
            />

            {/* Package Info Button */}
            <button className="project-pinned-pic-btn flex flex-col items-center justify-center w-[31%] h-[16%] bg-[rgba(255,255,255,0.94)] rounded-[900px] absolute bottom-[13px] left-0 border-none outline-none cursor-pointer hover:scale-105 hover:brightness-110 transition-all">
              <p className="package-type font-['Urbanist'] font-semibold text-[#0B141F]">
                {project.packageType}
              </p>
              <p className="package-price font-['Urbanist'] font-medium text-[#293B52]">
                {project.price}
              </p>
            </button>

            {/* Details Button */}
            <button className="project-details-page-indicator-btn absolute top-[10px] right-[10px] bg-[rgba(255,255,255,0.9)] border-none outline-none cursor-pointer px-[20px] py-[12px] rounded-[50px] flex items-center gap-[8px] z-[9999] hover:scale-105 hover:brightness-115 transition-all">
              <span className="project-button-text font-['Urbanist'] text-[14px] font-medium text-[#0B141F] relative right-[5px]">
                Click for details
              </span>
              <img
                src="/images/hero/button-arrow.svg"
                alt=""
                className="cta-btn-arrow h-[40px] w-[40px] relative left-[10px]"
              />
            </button>
          </div>

          {/* Right - Thumbnail Grid */}
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

        {/* Video Container */}
        <div className="fourth-video-container flex justify-center items-center rounded-[25px] max-w-[1300px] mx-auto mt-20 relative">
          <img
            src={project.videoThumbnail}
            alt="Video"
            className="fourth-video-thumbnail rounded-[25px] w-full max-w-[1320px] max-h-[566px]"
          />
          <div className="fourth-video-overlay absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-4 cursor-pointer">
            <p
              className="video-overlay-text font-['ClashDisplay-Regular'] font-normal text-[185px] text-center uppercase select-none brightness-[1.4]"
              style={{
                backgroundImage: `url(${project.videoThumbnail})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PLAY
            </p>
            <img
              src="/images/section-four/video-play-icon.svg"
              alt="Play"
              className="video-play-icon w-auto h-auto"
            />
            <p
              className="video-overlay-text font-['ClashDisplay-Regular'] font-normal text-[185px] text-center uppercase select-none brightness-[1.4]"
              style={{
                backgroundImage: `url(${project.videoThumbnail})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              VIDEO
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Base styles for pinned image */
        .pinned-project-img {
          width: 100%;
          height: 566px;
          min-height: 566px;
          aspect-ratio: 985 / 566;
        }

        /* Package info button base styles */
        .package-type {
          font-size: 18px;
          line-height: 1.2;
        }

        .package-price {
          font-size: 18px;
          line-height: 1.2;
        }

        /* Responsive Styles */
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

        /* Fix for 1270px to 1100px */
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

        /* Fix for 1100px to 1025px */
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
  return (
    <>
      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="projectClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.0442 C0,0.0198 0.0114,0 0.0254,0 H0.9746 C0.9886,0 1,0.0198 1,0.0442 V0.9558 C1,0.9802 0.9886,1 0.9746,1 H0.5,0.3493 C0.334,1 0.322,0.9764 0.3242,0.9497 L0.3267,0.9165 C0.332,0.8508 0.3025,0.7923 0.2644,0.7923 H0.0254 C0.0114,0.7923 0,0.7725 0,0.7481 V0.5,0.0442 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Render all projects */}
      {PROJECTS_DATA.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </>
  );
}