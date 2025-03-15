"use client";
import { motion } from "framer-motion";
import { FaBolt, FaEye, FaShieldAlt, FaCheckCircle, FaUserFriends, FaHandshake } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Rent your property 5x faster than traditional rental platforms, with our streamlined process.",
    color: "#F47C48",
  },
  {
    icon: <FaEye className="w-8 h-8" />,
    title: "100% Transparent",
    description: "No hidden charges or surprises. Direct communication between tenants and landlords.",
    color: "#4C8492",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Secure & Protected",
    description: "Get peace of mind with Allianz protection and lawyer-approved digital agreements.",
    color: "#27AE60",
  },
  {
    icon: <FaCheckCircle className="w-8 h-8" />,
    title: "Verified Properties",
    description: "All properties are thoroughly verified to ensure quality and authenticity.",
    color: "#1A3B5D",
  },
  {
    icon: <FaUserFriends className="w-8 h-8" />,
    title: "Expert Support",
    description: "Our dedicated team is available 24/7 to assist you with any queries.",
    color: "#9B51E0",
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    title: "Fair Dealings",
    description: "We ensure fair and transparent dealings between all parties involved.",
    color: "#F2994A",
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-16 bg-[#F7F7F9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(#1A3B5D 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1A3B5D] mb-4">
            Why Choose MyHome2U?
          </h2>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            We provide the best experience in finding your perfect home with these amazing features
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-[#F47C48] relative overflow-hidden">
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top right, ${feature.color}, transparent 70%)`,
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-[#1A3B5D] mb-4 group-hover:text-[#F47C48] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[#7A7A7A]">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div 
                  className="absolute -bottom-1 -right-1 w-12 h-12 transform rotate-45 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: feature.color }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
