"use client";

import Image from "next/image";
import { FaBell, FaTag, FaMobileAlt, FaHeadset } from "react-icons/fa";

const DownloadApp = () => {
  return (
    <section className="bg-[#F7F7F9] py-16 px-6 sm:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div data-aos="fade-right">

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3B5D] mb-5 leading-tight">
            Register on Our App &amp; Enjoy Exclusive Benefits
          </h2>
          <p className="text-[#555] mb-6 text-lg">
            Download our app today for a seamless property search experience with premium features.
          </p>

          <div className="space-y-5">
            <FeatureItem 
              icon={<FaBell className="text-[#4C8492] text-3xl" />} 
              text="Get Instant Alerts on New Deals & Offers" 
            />
            <FeatureItem 
              icon={<FaTag className="text-[#F47C48] text-3xl" />} 
              text="Unlock Exclusive Discounts & Special Offers" 
            />
            <FeatureItem 
              icon={<FaMobileAlt className="text-[#27AE60] text-3xl" />} 
              text="Browse Properties Anytime, Anywhere" 
            />
            <FeatureItem 
              icon={<FaHeadset className="text-[#1A3B5D] text-3xl" />} 
              text="24/7 Dedicated Customer Support" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-[#1A3B5D] text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:opacity-80 transition duration-300">
            Get it on Google Play
          </button>
          
          <button className="bg-[#1A3B5D] text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:opacity-80 transition duration-300">
            Download on the App Store
          </button>
        </div>

        </div>

        <div className="flex justify-center" data-aos="fade-left">
          <Image
            src="/images/downloadApp.jpg" 
            alt="Mobile App Preview"
            width={500}
            height={400}
          />
        </div>

      </div>
    </section>
  );
};

// Feature Item Component
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300">
    {icon}
    <p className="text-[#333] text-lg font-medium">{text}</p>
  </div>
);

export default DownloadApp;
