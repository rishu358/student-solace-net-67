import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCircle, Users, MapPin, Heart, HandHeart, Building, Home } from "lucide-react";
import ChatModal from "@/components/ChatModal";
import VolunteerModal from "@/components/VolunteerModal";
import LoginModal from "@/components/LoginModal";
import CommunityModal from "@/components/CommunityModal";
import TherapyModal from "@/components/TherapyModal";
import WorldMapTooltip from "@/components/WorldMapTooltip";
import WorldMapModal from "@/components/WorldMapModal";
import OrganizationsModal from "@/components/OrganizationsModal";

const Navigation = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [therapyOpen, setTherapyOpen] = useState(false);
  const [worldMapOpen, setWorldMapOpen] = useState(false);
  const [organizationsOpen, setOrganizationsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: "Home", href: null, icon: Home, action: scrollToTop },
    { name: "Free Chat", href: null, icon: MessageCircle, action: () => setChatOpen(true) },
    { name: "Community", href: null, icon: Users, action: () => navigate("/community") },
    { name: "Local", href: null, icon: MapPin, action: () => setWorldMapOpen(true), hasTooltip: true },
    { name: "Considering Therapy", href: null, icon: Heart, action: () => setTherapyOpen(true) },
    { name: "Volunteer", href: null, icon: HandHeart, action: () => setVolunteerOpen(true) },
    { name: "Organizations", href: null, icon: Building, action: () => setOrganizationsOpen(true) },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MindSpace</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              const buttonContent = (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="text-sm font-medium hover:text-primary"
                  onClick={item.action || undefined}
                  asChild={!item.action}
                >
                  {item.action ? (
                    <span className="flex items-center space-x-2 cursor-pointer">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </span>
                  ) : (
                    <a href={item.href} className="flex items-center space-x-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </a>
                  )}
                </Button>
              );

              if (item.hasTooltip && item.name === "Local") {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0">
                      <WorldMapTooltip />
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return buttonContent;
            })}
          </div>

          {/* Login Button */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/login")}>
              Get Support Now
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              const buttonContent = (
                <Button
                  key={item.name}
                  variant="soft"
                  size="sm"
                  className="justify-start"
                  onClick={item.action || undefined}
                  asChild={!item.action}
                >
                  {item.action ? (
                    <span className="flex items-center space-x-2 cursor-pointer">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="text-xs">{item.name}</span>
                    </span>
                  ) : (
                    <a href={item.href} className="flex items-center space-x-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="text-xs">{item.name}</span>
                    </a>
                  )}
                </Button>
              );

              if (item.hasTooltip && item.name === "Local") {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0">
                      <WorldMapTooltip />
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return buttonContent;
            })}
          </div>
        </div>
      </div>
      
      <ChatModal open={chatOpen} onOpenChange={setChatOpen} />
      <VolunteerModal open={volunteerOpen} onOpenChange={setVolunteerOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <CommunityModal open={communityOpen} onOpenChange={setCommunityOpen} />
      <TherapyModal open={therapyOpen} onOpenChange={setTherapyOpen} />
      <WorldMapModal open={worldMapOpen} onOpenChange={setWorldMapOpen} />
      <OrganizationsModal open={organizationsOpen} onOpenChange={setOrganizationsOpen} />
    </nav>
  );
};

export default Navigation;