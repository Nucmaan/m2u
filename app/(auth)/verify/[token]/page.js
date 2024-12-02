import VerifyButton from "@/components/VerifyButton";

export default async function VerifyPage({ params }) {
  const { token } = await params;

  return (
    <div className="flex items-center justify-center h-screen bg-[#F7F7F9]">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-[#1A3B5D] mb-4">
          Verify Your Account
        </h2>
        <p className="text-[#7A7A7A] mb-6">
          Click the button below to complete your account verification process.
        </p>
        
        <VerifyButton token={token} />
      </div>
    </div>
  );
}
