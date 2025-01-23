import Image from "next/image";

const AboutUs = () => {
  const defaultImage = "/images/nasri.jpg";
  const defaultAboutImage = "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const defaultValue = "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <section className="bg-[#F7F7F9] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* About Us Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3B5D] mb-4">
            About Us
          </h2>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            Welcome to MyHome2U! We connect people with their dream properties.
            Whether you&apos;re looking to rent or buy, our platform offers a seamless
            and personalized experience to find the perfect home.
          </p>
        </div>

        {/* Mission Section */}
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2">
            <Image
              src={defaultAboutImage}
              alt="Mission Image"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
              Our Mission
            </h3>
            <p className="text-[#7A7A7A]">
              Our mission is to make property searching effortless and enjoyable.
              We aim to empower people to find a space that truly feels like
              home, with transparent processes and a trusted network of agents.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
              Our Values
            </h3>
            <ul className="space-y-2 text-[#7A7A7A]">
              <li>
                🏡 <span className="font-medium text-[#1A3B5D]">Trust:</span> We
                believe in building lasting relationships with our clients based
                on trust.
              </li>
              <li>
                ✨ <span className="font-medium text-[#1A3B5D]">Transparency:</span>{" "}
                All processes are clear and straightforward, with no hidden fees
                or surprises.
              </li>
              <li>
                💼 <span className="font-medium text-[#1A3B5D]">Professionalism:</span>{" "}
                Our team is dedicated to providing expert advice and guidance
                throughout your journey.
              </li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2">
            <Image
              src={defaultValue}
              alt="Values Image"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
            Meet Our Team
          </h3>
          <p className="text-[#7A7A7A] max-w-2xl mx-auto mb-8">
            Our team consists of dedicated professionals who are passionate about
            helping you find the ideal property. Get in touch with us to
            experience our commitment to excellence.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Team Member 1 */}
            <div className="w-32 text-center">
              <Image
                src={defaultImage}
                alt="Team Member"
                width={150}
                height={150}
                className="w-24 h-24 mx-auto rounded-full mb-2 border-2 border-[#4C8492]"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">Nasri</h4>
              <p className="text-sm text-[#7A7A7A]">CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="w-32 text-center">
              <Image
                src={defaultImage}
                alt="Team Member"
                width={150}
                height={150}
                className="w-24 h-24 mx-auto rounded-full mb-2 border-2 border-[#4C8492]"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">Xasan</h4>
              <p className="text-sm text-[#7A7A7A]">CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="w-32 text-center">
              <Image
                src={defaultImage}
                alt="Team Member"
                width={150}
                height={150}
                className="w-24 h-24 mx-auto rounded-full mb-2 border-2 border-[#4C8492]"
              />
              <h4 className="text-lg font-semibold text-[#1A3B5D]">Ramsey</h4>
              <p className="text-sm text-[#7A7A7A]">Head of Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
