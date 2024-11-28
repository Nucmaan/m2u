
const AboutUs = () => {
  return (
    <section className="bg-[#F7F7F9] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3B5D] mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to MyHome2U! We connect people with their dream properties. Whether you're looking to rent or buy, our platform offers a seamless and personalized experience to find the perfect home.
          </p>
        </div>
    
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Mission Image"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to make property searching effortless and enjoyable. We aim to empower people to find a space that truly feels like home, with transparent processes and a trusted network of agents.
            </p>
          </div>
        </div>

        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">Our Values</h3>
            <ul className="space-y-2 text-gray-600">
              <li>🏡 <span className="font-medium">Trust:</span> We believe in building lasting relationships with our clients based on trust.</li>
              <li>✨ <span className="font-medium">Transparency:</span> All processes are clear and straightforward, with no hidden fees or surprises.</li>
              <li>💼 <span className="font-medium">Professionalism:</span> Our team is dedicated to providing expert advice and guidance throughout your journey.</li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2">
            <img
              src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Values Image"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

    
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">Meet Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team consists of dedicated professionals who are passionate about helping you find the ideal property. Get in touch with us to experience our commitment to excellence.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-32 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-2"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">Nasri</h4>
              <p className="text-sm text-gray-500">CEO</p>
            </div>
            <div className="w-32 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-2"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">xasan</h4>
              <p className="text-sm text-gray-500">CTO</p>
            </div>
            <div className="w-32 text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-2"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">Naano</h4>
              <p className="text-sm text-gray-500">Head of Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
