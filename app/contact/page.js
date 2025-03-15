"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiUser, 
  FiMessageSquare, 
  FiInfo,
  FiCheckCircle 
} from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await axios.post("/api/sendEmail", formData);

      if(response.status === 200){
        toast.success(response.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitted(true);
      } else {
        toast.error(response?.data?.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Phone",
      value: "+252 616500191",
      color: "#4C8492",
      delay: 0.1,
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email",
      value: "info@myhome2u.com",
      color: "#F47C48",
      delay: 0.2,
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Address",
      value: "KM4 BANADIR, MOGADISHU, SOMALIA",
      color: "#27AE60",
      delay: 0.3,
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: "#", label: "Facebook", color: "#4267B2" },
    { icon: <FaTwitter size={20} />, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: <FaInstagram size={20} />, href: "#", label: "Instagram", color: "#E1306C" },
    { icon: <FaLinkedin size={20} />, href: "#", label: "LinkedIn", color: "#0077B5" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-b from-white  to-[#F7F7F9] py-28 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(#1A3B5D 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3B5D] mb-4">
            Get in <span className="text-[#F47C48]">Touch</span>
          </h1>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Have questions about finding your perfect home? We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: item.delay }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-[#F47C48] transition-all duration-300 hover:shadow-lg group"
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-center text-[#1A3B5D] mb-2">
                {item.title}
              </h3>
              <p className="text-center text-[#7A7A7A]">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-[#E0E0E0]"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-[#27AE60]/20 flex items-center justify-center mb-6">
                  <FiCheckCircle className="text-[#27AE60] text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A3B5D] mb-4">Message Sent!</h3>
                <p className="text-[#7A7A7A] mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-md bg-[#F47C48] text-white font-semibold hover:bg-[#e86d3f] transition duration-300 shadow-md"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#1A3B5D] mb-6">
                  Send us a Message
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="flex items-center text-sm font-semibold text-[#1A3B5D] mb-2">
                      <FiUser className="mr-2 text-[#F47C48]" />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border ${
                        errors.name ? "border-red-500" : "border-[#E0E0E0]"
                      } text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition-all duration-300`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-[#1A3B5D] mb-2">
                      <FiMail className="mr-2 text-[#F47C48]" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border ${
                        errors.email ? "border-red-500" : "border-[#E0E0E0]"
                      } text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition-all duration-300`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="flex items-center text-sm font-semibold text-[#1A3B5D] mb-2">
                      <FiInfo className="mr-2 text-[#F47C48]" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border ${
                        errors.subject ? "border-red-500" : "border-[#E0E0E0]"
                      } text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition-all duration-300`}
                      placeholder="Enter the subject"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="flex items-center text-sm font-semibold text-[#1A3B5D] mb-2">
                      <FiMessageSquare className="mr-2 text-[#F47C48]" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border ${
                        errors.message ? "border-red-500" : "border-[#E0E0E0]"
                      } text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#F47C48] transition-all duration-300`}
                      placeholder="Write your message"
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-md bg-[#F47C48] text-white font-semibold hover:bg-[#e86d3f] transition duration-300 shadow-md flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E0E0E0] h-[300px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254344.2773037497!2d45.173323386923845!3d2.0376307895261966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955ce6b53%3A0xbb20eaaa52cc59d9!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2sus!4v1658440631950!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
                className="rounded-md"
              ></iframe>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-[#E0E0E0]">
              <h3 className="text-xl font-semibold text-[#1A3B5D] mb-4">Business Hours</h3>
              <ul className="space-y-2 text-[#7A7A7A]">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-[#E0E0E0]">
              <h3 className="text-xl font-semibold text-[#1A3B5D] mb-4">Connect With Us</h3>
              <div className="flex justify-between">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: `${social.color}20`, color: social.color }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[#7A7A7A]">
            Need urgent assistance? Call our dedicated support line at{" "}
            <a href="tel:+252616500191" className="text-[#F47C48] font-semibold hover:underline">
              +252 616500191
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
