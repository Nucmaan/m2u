"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBell, FaTag, FaMobileAlt, FaHeadset, FaGooglePlay, FaApple } from "react-icons/fa";

const features = [
  {
    icon: <FaBell className="text-3xl" />,
    text: "Get Instant Alerts on New Deals & Offers",
    color: "#4C8492",
    delay: 0.2,
  },
  {
    icon: <FaTag className="text-3xl" />,
    text: "Unlock Exclusive Discounts & Special Offers",
    color: "#F47C48",
    delay: 0.3,
  },
  {
    icon: <FaMobileAlt className="text-3xl" />,
    text: "Browse Properties Anytime, Anywhere",
    color: "#27AE60",
    delay: 0.4,
  },
  {
    icon: <FaHeadset className="text-3xl" />,
    text: "24/7 Dedicated Customer Support",
    color: "#1A3B5D",
    delay: 0.5,
  },
];

const FeatureItem = ({ icon, text, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="group"
  >
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#F47C48]">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        {icon}
      </div>
      <p className="text-[#333] text-lg font-medium group-hover:text-[#F47C48] transition-colors duration-300">
        {text}
      </p>
    </div>
  </motion.div>
);

const DownloadApp = () => {
  return (
    <section className="bg-[#F7F7F9] py-20 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(#1A3B5D 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-[#1A3B5D] leading-tight"
            >
              Get the MyHome2U App
              <span className="text-[#F47C48]"> Today!</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#555] text-lg sm:text-xl"
            >
              Download our app today for a seamless property search experience with premium features.
            </motion.p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button className="group bg-[#1A3B5D] text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:bg-[#16324A] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
              <FaGooglePlay className="text-2xl group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </button>
            
            <button className="group bg-[#F47C48] text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
              <FaApple className="text-2xl group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3B5D]/10 to-[#F47C48]/10 rounded-full blur-3xl transform -rotate-12"></div>
          
          {/* App Preview Image */}
          <div className="relative transform hover:scale-105 transition-transform duration-500 hover:rotate-2">
            <Image
              src="/images/downloadApp.jpg" 
              alt="Mobile App Preview"
              width={500}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
            >
              <FaBell className="text-[#F47C48] text-2xl" />
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
            >
              <FaTag className="text-[#4C8492] text-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadApp;
