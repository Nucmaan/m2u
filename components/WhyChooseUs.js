import { FaBolt, FaEye, FaShieldAlt } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <div className="pt-5 pb-8 bg-[#F7F7F9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Speed */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
            <FaBolt className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Speed</h3>
            <p className="text-gray-600 mt-2">
              Rent your property 5x faster than traditional rental platforms,
              hassle-free!
            </p>
          </div>

          {/* Transparent */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
            <FaEye className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Transparent</h3>
            <p className="text-gray-600 mt-2">
              Enjoy zero hidden charges and surprises. Tenants and landlords
              deal directly.
            </p>
          </div>

          {/* Safe */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
            <FaShieldAlt className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Safe</h3>
            <p className="text-gray-600 mt-2">
              Get peace of mind with Allianz protection and a lawyer-approved
              digital tenancy agreement signing service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
