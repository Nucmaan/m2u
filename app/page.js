import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/ListingProcess";
import PropertyListing from "@/components/PropertyListing";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <PropertyListing />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
}
