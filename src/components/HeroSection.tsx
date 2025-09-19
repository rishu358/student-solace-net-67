import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, Clock } from "lucide-react";
import mindfulnessSpace from "@/assets/mindfulness-space.jpg";

interface HeroSectionProps {
  onChatOpen: () => void;
  onResourcesClick: () => void;
}

const HeroSection = ({ onChatOpen, onResourcesClick }: HeroSectionProps) => {
  
  const scrollToResources = () => {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onResourcesClick();
    }
  };
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mindfulnessSpace})` }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-7xl font-extrabold text-foreground leading-tight animate-fade-in">
                <span className="relative">
                  Break the Silence,
                  <div className="absolute -top-2 -right-8 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium animate-pulse">
                    SAFE
                  </div>
                </span>
                <br />
                <span className="gradient-hero bg-clip-text text-transparent drop-shadow-lg">
                  Start the Conversation
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with trained listeners, access affordable therapy, and grow at your own pace with our supportive community designed for college students.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-card">
                <MessageCircle className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Free 24/7 Chat</h3>
                  <p className="text-sm text-muted-foreground">Caring listeners available anytime</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-card">
                <Shield className="h-6 w-6 text-accent-strong" />
                <div>
                  <h3 className="font-semibold">Confidential & Safe</h3>
                  <p className="text-sm text-muted-foreground">Anonymous support you can trust</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-base" onClick={onChatOpen}>
                Start Free Chat Now
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="wellness" size="lg" className="text-base" onClick={scrollToResources}>
                Explore Resources
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>100% Confidential</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="aspect-[4/3] max-w-lg mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-full h-full bg-card/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-card space-y-6">
                {/* Inspirational Quote */}
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <blockquote className="text-sm italic text-muted-foreground px-3">
                    "You are not alone in this journey. Every step forward is progress worth celebrating."
                  </blockquote>
                </div>
                
                {/* Features Preview */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-accent-strong">100%</div>
                    <div className="text-xs text-muted-foreground">Anonymous</div>
                  </div>
                </div>
                
                <h3 className="text-base font-semibold text-center">Start Your Journey</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;