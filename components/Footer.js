import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: "#", label: "Facebook" },
    { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin size={20} />, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { href: "/listings", label: "Property List" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
 
  ];

  return (
    <footer className="bg-[#1A3B5D] text-white">
      {/* Wave Separator */}
      <div className="w-full overflow-hidden">
        <svg
          className="relative block w-full"
          style={{ height: "4rem" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image 
                src="/logo.png" 
                alt="MyHome2U Logo" 
                width={80} 
                height={40} 
                priority 
                className="transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-2xl font-semibold group-hover:text-[#F47C48] transition-colors duration-300">
                MyHome2U
              </span>
            </Link>
            <p className="text-gray-300 mt-4 max-w-xs">
              Your trusted partner in finding the perfect home. We make property hunting simple and enjoyable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F47C48]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-[#F47C48] transition-colors duration-300 block transform hover:translate-x-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F47C48]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-[#F47C48]" />
                <span>123 Property Street, Real Estate City, 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-[#F47C48]" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-[#F47C48]" />
                <span>info@myhome2u.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F47C48]">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#F47C48] transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <form className="space-y-2">
              <label htmlFor="newsletter" className="text-gray-300">Subscribe to our newsletter</label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F47C48] text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F47C48] text-white rounded-r-md hover:bg-[#e86d3f] transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-300">
            &copy; {currentYear} MyHome2U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
