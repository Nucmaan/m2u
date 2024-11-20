import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A3B5D', color: '#F7F7F9' }} className="py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
      
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="MyHome2U Logo"
            className="h-10 w-20"
          />
          <span className="text-2xl font-semibold text-white">MyHome2U</span>
        </div>

    
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <Link href="/listings" className="text-white text-lg hover:text-[#F47C48] transition duration-300">
            Property List
          </Link>
          <Link href="/contact" className="text-white text-lg hover:text-[#F47C48] transition duration-300">
            Contact Us
          </Link>
          <Link href="/about" className="text-white text-lg hover:text-[#F47C48] transition duration-300">
            About Us
          </Link>
        </div>

      
        <div className="text-center md:text-right mt-4 md:mt-0">
          <span className="text-white text-sm">
            &copy; 2024 MyHome2U. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
