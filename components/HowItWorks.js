"use client";
import { motion } from "framer-motion";
import { FaSearch, FaHome, FaKey, FaUserCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="w-8 h-8" />,
    title: "Search Properties",
    description: "Browse through our extensive collection of verified properties that match your preferences.",
    color: "#4C8492",
  },
  {
    icon: <FaHome className="w-8 h-8" />,
    title: "Choose Your Home",
    description: "Select your ideal home from our curated listings with detailed information and virtual tours.",
    color: "#F47C48",
  },
  {
    icon: <FaUserCheck className="w-8 h-8" />,
    title: "Meet the Agent",
    description: "Connect with our verified agents who will guide you through the property details and viewing process.",
    color: "#27AE60",
  },
  {
    icon: <FaKey className="w-8 h-8" />,
    title: "Get Your Keys",
    description: "Complete the necessary paperwork and transactions securely to move into your new home.",
    color: "#1A3B5D",
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1A3B5D] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Follow these simple steps to find and secure your dream home with MyHome2U
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:border-[#F47C48] transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#F47C48] text-white flex items-center justify-center font-bold text-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <div style={{ color: step.color }}>{step.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#1A3B5D] mb-4 text-center group-hover:text-[#F47C48] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#7A7A7A] text-center">
                  {step.description}
                </p>

                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-[#F47C48] transform -translate-y-1/2" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 