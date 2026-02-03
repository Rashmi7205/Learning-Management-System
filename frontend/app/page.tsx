import CategoriesSection from "@/components/home-page/CategoriesSection";
import CertificateFeatures from "@/components/home-page/CertificateFeatures";
import CoursesSection from "@/components/home-page/CoursesSection";
import FAQSection from "@/components/home-page/FAQSection";
import FeaturesSection from "@/components/home-page/FeaturesSection";
import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import HeroSection from "@/components/home-page/HeroSection";
import InstructorsSection from "@/components/home-page/InstructorsSection";
import MembershipSection from "@/components/home-page/MembershipSection";
import TestimonialsSection from "@/components/home-page/TestimonialsSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CoursesSection />
        <CategoriesSection />
        <FeaturesSection />
        <InstructorsSection />
        <CertificateFeatures/>
        <TestimonialsSection />
        <FAQSection />
        <MembershipSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
