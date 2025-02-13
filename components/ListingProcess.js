"use client";

import Image from "next/image";
import { FaCalendarCheck, FaFileSignature, FaHandshake } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-[#F7F7F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Image */}
        <div className="flex justify-center">
          <Image
            src="/images/cyclepr.jpeg"
            alt="Woman using phone"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column - Steps */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3B5D] mb-6">
            How to List &amp; Book a Property
          </h2>

          {/* Step 1 */}
          <div className="flex items-center gap-4 mb-6">
            <FaCalendarCheck className="text-[#4C8492] text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-[#333333]">
                Schedule a Visit
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Choose a property and pick a convenient date to visit. Our agents will guide you through the process.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 mb-6">
            <FaFileSignature className="text-[#F47C48] text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-[#333333]">
                Sign the Contract
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Once you&apos;ve found your dream home, review and sign the agreement to secure your property.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4">
            <FaHandshake className="text-[#27AE60] text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-[#333333]">
                Finalize the Deal
              </h3>
              <p className="text-[#7A7A7A] text-sm">
                Complete the payment process and move into your new home. It&apos;s that easy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
