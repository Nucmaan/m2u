import { FaArrowRight } from "react-icons/fa";
import Image from "next/image"; // Import Image component

export default function BlogSection() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Best Home Renovation Tips for 2024",
      description:
        "Looking to renovate your home in 2024? Here are some of the top home renovation tips and trends to consider.",
      image: "https://images.pexels.com/photos/10482793/pexels-photo-10482793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Property for Rent",
      description:
        "Choosing the right property to rent can be overwhelming. This guide will help you find the perfect home for your needs.",
      image: "https://images.pexels.com/photos/9119732/pexels-photo-9119732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
    {
      id: 3,
      title: "5 Affordable Ways to Style Your Home",
      description:
        "You don’t need to break the bank to make your home stylish. Here are 5 affordable ways to give your home a fresh look.",
      image: "https://images.pexels.com/photos/12969293/pexels-photo-12969293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "#",
    },
  ];

  return (
    <div className="pt-12 pb-16 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#1A3B5D] mb-4">
          Our Latest Blogs
        </h2>
        <p className="text-center text-[#7A7A7A] mb-8">
          Stay updated with the latest trends, tips, and insights.
        </p>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-[#E0E0E0] hover:shadow-xl transition duration-300"
            >
              {/* Blog Image */}
              <Image
                src={post.image}
                alt={post.title}
                width={500} // Set appropriate width
                height={300} // Set appropriate height
                className="w-full h-48 object-cover"
              />

              {/* Blog Details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-[#1A3B5D] mb-4">
                  {post.title}
                </h3>
                <p className="text-sm text-[#7A7A7A] mb-6">{post.description}</p>

                {/* Read More Button */}
                <a
                  href={post.link}
                  className="text-[#4C8492] hover:text-[#3b6d78] flex items-center font-medium"
                >
                  <span className="mr-2">Read More</span>
                  <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
