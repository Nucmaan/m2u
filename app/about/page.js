"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaUsers, FaRegLightbulb, FaRegHandshake, FaQuoteLeft, FaAward } from "react-icons/fa";

const AboutUs = () => {
  const defaultImage = "/images/nasri.jpg";
  const defaultImage2 = "/images/naima.jpg";
  const defaultImage3 = "/images/abdi.jpg";
  const defaultImage4 = "/images/customer.jpg";
  
  const defaultAboutImage = "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const defaultValue = "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const values = [
    {
      icon: <FaRegHandshake className="text-2xl" />,
      title: "Trust",
      description: "We believe in building lasting relationships with our clients based on trust and integrity.",
      color: "#4C8492",
      delay: 0.2,
    },
    {
      icon: <FaRegLightbulb className="text-2xl" />,
      title: "Transparency",
      description: "All processes are clear and straightforward, with no hidden fees or surprises.",
      color: "#F47C48",
      delay: 0.3,
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Professionalism",
      description: "Our team is dedicated to providing expert advice and guidance throughout your journey.",
      color: "#27AE60",
      delay: 0.4,
    },
  ];

  const stats = [
    { number: "400+", label: "Properties Listed", delay: 0.1 },
    { number: "1200+", label: "Happy Clients", delay: 0.2 },
    { number: "10+", label: "Years Experience", delay: 0.3 },
    { number: "42", label: "Team Members", delay: 0.4 },
  ];

  const teamMembers = [
    {
      image: defaultImage,
      name: "Nasri Abdi",
      position: "CEO & Founder",
      bio: "Passionate about real estate with over 10 years of experience in property management.",
      delay: 0.2,
    },
    {
      image: defaultImage3,
      name: "Abdirahman",
      position: "Chief Technology Officer",
      bio: "Tech enthusiast leading our digital transformation and online property solutions.",
      delay: 0.3,
    },
    {
      image: defaultImage2,
      name: "Naima Abdi",
      position: "Head of Marketing",
      bio: "Creative strategist with a keen eye for property trends and market opportunities.",
      delay: 0.4,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#1A3B5D] text-white py-28 px-6">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={defaultAboutImage}
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-[#1A3B5D] opacity-80"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#F47C48]">MyHome2U</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-200 leading-relaxed">
              We're not just finding properties, we're helping people discover homes where memories are made.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full"
            style={{ height: "4rem" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
          >
            <path
              fill="#F7F7F9"
              fillOpacity="1"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F7F7F9] py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Our Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#1A3B5D] mb-6">Our Story</h2>
              <div className="space-y-4 text-[#7A7A7A]">
                <p>
                  Founded in 2013, MyHome2U was born from a simple idea: property hunting should be simple, transparent, and enjoyable. We saw a market filled with complexity and stress, and we decided to change that.
                </p>
                <p>
                  Starting with just a handful of listings in Mogadishu, we've grown to become one of Somalia's most trusted property platforms, connecting thousands of people with their perfect homes.
                </p>
                <p>
                  Our journey hasn't always been easy, but our commitment to our clients has never wavered. Today, we're proud to offer a service that truly puts people first.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-[#1A3B5D]/10 rounded-full text-[#1A3B5D] font-medium"
                >
                  Trusted Service
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-[#F47C48]/10 rounded-full text-[#F47C48] font-medium"
                >
                  Customer First
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-[#4C8492]/10 rounded-full text-[#4C8492] font-medium"
                >
                  Local Expertise
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#F47C48]/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#1A3B5D]/10 rounded-full"></div>
              
              <div className="relative rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={defaultAboutImage}
                  alt="Our Story"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="py-12 px-6 bg-white rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F47C48]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#1A3B5D]/5 rounded-full transform -translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-[#1A3B5D] mb-4">
                  Our Mission & Vision
                </h2>
                <div className="w-20 h-1 bg-[#F47C48] mx-auto"></div>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[#1A3B5D]/5 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1A3B5D]/10 flex items-center justify-center mb-4">
                    <FaRegLightbulb className="text-[#1A3B5D] text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
                    Our Mission
                  </h3>
                  <p className="text-[#7A7A7A]">
                    To make property searching effortless and enjoyable, empowering people to find spaces 
                    that truly feel like home. We strive to create a transparent, secure platform where 
                    every property journey is smooth and stress-free.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#F47C48]/5 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F47C48]/10 flex items-center justify-center mb-4">
                    <FaAward className="text-[#F47C48] text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
                    Our Vision
                  </h3>
                  <p className="text-[#7A7A7A]">
                    To become Somalia's most trusted property platform, revolutionizing how people discover, 
                    purchase, and sell properties. We envision a market where every transaction is built on 
                    trust, and every client feels supported throughout their journey.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1A3B5D] mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
                These principles guide everything we do at MyHome2U
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: value.delay }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${value.color}20`, color: value.color }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3B5D] mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-[#7A7A7A] text-center">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#1A3B5D] text-white rounded-xl overflow-hidden p-12 relative"
          >
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="100" fill="white"/>
                <circle cx="100" cy="100" r="80" fill="#1A3B5D"/>
                <circle cx="100" cy="100" r="60" fill="white"/>
              </svg>
            </div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
              <div className="w-20 h-1 bg-[#F47C48] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-[#F47C48] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1A3B5D] mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
                Passionate professionals committed to transforming the property market in Somalia
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: member.delay }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-[#4C8492]/20 transform group-hover:scale-110 transition-transform duration-300"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-full border-4 border-white"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3B5D] mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#F47C48] font-medium mb-4 text-center">
                    {member.position}
                  </p>
                  <p className="text-[#7A7A7A] text-center">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-xl shadow-lg text-center relative overflow-hidden"
          >
            <div className="absolute top-6 left-6 text-[#1A3B5D]/10">
              <FaQuoteLeft size={50} />
            </div>
            
            <div className="max-w-3xl mx-auto relative z-10">
              <p className="text-xl italic text-[#7A7A7A] mb-6">
                "MyHome2U transformed our property search from a stressful chore into an exciting journey. 
                Their team went above and beyond, understanding exactly what we needed and finding us the perfect home. 
                I couldn't recommend them more highly!"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={defaultImage4}
                    alt="Client"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#1A3B5D]">Ahmed Mohamed</h4>
                  <p className="text-[#F47C48]">Homeowner, Mogadishu</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
