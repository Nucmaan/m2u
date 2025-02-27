import Link from "next/link";
import Image from "next/image"; // Import Image component

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#1A3B5D", color: "#F7F7F9" }}
      className="py-6 shadow-inner"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
      
        <div className="flex items-center">
        <Link href="/" className="text-white hover:text-[#F47C48]">
        <Image src="/logo.png" alt="MyHome2U Logo" width={80} height={40} priority />
      </Link>          <span className="text-2xl font-semibold">MyHome2U</span>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <Link href="/listings" className="hover:text-[#F47C48] transition duration-300">
            Property List
          </Link>
          <Link href="/contact" className="hover:text-[#F47C48] transition duration-300">
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-[#F47C48] transition duration-300">
            About Us
          </Link>
        </div>

        <div className="text-center md:text-right">
          <span className="text-sm">
            &copy; 2024 MyHome2U. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
