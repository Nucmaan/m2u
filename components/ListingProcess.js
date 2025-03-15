"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaCalendarCheck, 
  FaFileSignature, 
  FaHandshake, 
  FaCamera, 
  FaClipboardList, 
  FaUserCheck 
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCamera className="w-6 h-6" />,
    title: "List Your Property",
    description: "Take high-quality photos and provide detailed information about your property.",
    color: "#4C8492",
    delay: 0.2,
  },
  {
    icon: <FaClipboardList className="w-6 h-6" />,
    title: "Property Verification",
    description: "Our team verifies your property details to ensure accuracy and authenticity.",
    color: "#F47C48",
    delay: 0.3,
  },
  {
    icon: <FaCalendarCheck className="w-6 h-6" />,
    title: "Schedule Viewings",
    description: "Coordinate with potential buyers/tenants for property viewings at convenient times.",
    color: "#27AE60",
    delay: 0.4,
  },
  {
    icon: <FaUserCheck className="w-6 h-6" />,
    title: "Screen Applicants",
    description: "Review and select qualified applicants with our comprehensive screening process.",
    color: "#9B51E0",
    delay: 0.5,
  },
  {
    icon: <FaFileSignature className="w-6 h-6" />,
    title: "Sign Agreement",
    description: "Complete the digital paperwork with our secure and easy-to-use platform.",
    color: "#F2994A",
    delay: 0.6,
  },
  {
    icon: <FaHandshake className="w-6 h-6" />,
    title: "Close the Deal",
    description: "Finalize the transaction and hand over the property with our support.",
    color: "#1A3B5D",
    delay: 0.7,
  },
];

const ListingProcess = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F7F7F9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(#1A3B5D 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1A3B5D] mb-4">
            List Your Property in 6 Easy Steps
          </h2>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Our streamlined process makes it simple to list and manage your property
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="group"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#F47C48] relative">
                  {/* Step Number */}
                  <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#F47C48] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A3B5D] group-hover:text-[#F47C48] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Interactive Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A3B5D]/10 to-[#F47C48]/10 rounded-full blur-3xl"></div>

            {/* Main Image */}
            <div className="relative">
              <Image
                src="/images/calltv.jpg"
                alt="Property listing process"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
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
                <FaHandshake className="text-[#F47C48] text-2xl" />
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
                <FaFileSignature className="text-[#4C8492] text-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-3 bg-[#F47C48] text-white rounded-md hover:bg-[#e86d3f] transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
            <span>List Your Property Now</span>
            <FaCamera className="text-xl" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ListingProcess;
