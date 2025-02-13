"use client";

import Image from "next/image";
import { FaBell, FaTag, FaMobileAlt, FaHeadset } from "react-icons/fa";

const DownloadApp = () => {
  return (
    <section className="bg-[#F7F7F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8  ">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3B5D] mb-4" >
            Register on Our App &amp; Unlock Exclusive Benefits
          </h2>
          <p className="text-[#7A7A7A] mb-6">
            Download our app today and enjoy a seamless experience with top-notch features.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaBell className="text-[#4C8492] text-3xl" />
              <p className="text-[#333333] text-lg font-medium">
                Real-time Alerts on New Deals & Offers
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaTag className="text-[#F47C48] text-3xl" />
              <p className="text-[#333333] text-lg font-medium">
                Enjoy Exclusive Discounts & Special Offers
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaMobileAlt className="text-[#27AE60] text-3xl" />
              <p className="text-[#333333] text-lg font-medium">
                Easy Access to Listings Anytime, Anywhere
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaHeadset className="text-[#1A3B5D] text-3xl" />
              <p className="text-[#333333] text-lg font-medium">
                24/7 Quick Support & Assistance
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/downloadApp.jpg" 
            alt="Mobile App Preview"
            width={500}
            height={400}
            className=""
          />
        </div>
        

      </div>
    </section>
  );
};

export default DownloadApp;
