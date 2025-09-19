import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChatModal from "@/components/ChatModal";
import FeaturesSection from "@/components/FeaturesSection";
import InspirationalSection from "@/components/InspirationalSection";
import ChatPreview from "@/components/ChatPreview";
import ResourceHub from "@/components/ResourceHub";
import CommunityPreview from "@/components/CommunityPreview";
import Footer from "@/components/Footer";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleChatOpen = () => setChatOpen(true);
  const handleResourcesClick = () => {
    // Scroll to resources section or show resources modal
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection onChatOpen={handleChatOpen} onResourcesClick={handleResourcesClick} />
        <FeaturesSection />
        <InspirationalSection />
        <ChatPreview />
        <div id="resources">
          <ResourceHub />
        </div>
        <CommunityPreview />
      </main>
      <Footer />
      <ChatModal open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Index;
