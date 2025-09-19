import { MessageCircle, Users, BookOpen, Heart, Shield, Clock, Headphones, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import therapyRoom from "@/assets/therapy-room.jpg";

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: MessageCircle,
      title: "Free Emotional Support",
      description: "Connect with trained listeners anytime, anywhere. Our caring community is here to listen without judgment.",
      highlight: "24/7 Available"
    },
    {
      icon: Headphones,
      title: "Professional Therapy",
      description: "Access licensed therapists for deeper support. Affordable sessions tailored to your needs and schedule.",
      highlight: "Licensed Therapists"
    },
    {
      icon: Users,
      title: "Peer Support Groups",
      description: "Join supportive communities of students facing similar challenges. Share experiences and grow together.",
      highlight: "Student Community"
    }
  ];

  const supportFeatures = [
    { icon: Shield, text: "100% Confidential" },
    { icon: Clock, text: "Available 24/7" },
    { icon: Heart, text: "Judgment-Free Zone" },
    { icon: BookOpen, text: "Mental Health Resources" }
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${therapyRoom})` }}
      >
        <div className="absolute inset-0 bg-background/90"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Everything You Need for 
            <span className="gradient-hero bg-clip-text text-transparent"> Mental Wellness</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From instant peer support to professional therapy, we provide comprehensive mental health resources designed specifically for college students.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1 bg-accent rounded-full text-xs font-medium text-accent-foreground mb-2">
                  {feature.highlight}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Features */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Why Students Trust MindSpace</h3>
            <p className="text-muted-foreground">Safe, accessible, and designed with your needs in mind</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inspirational Quote Box */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-wellness p-8 rounded-2xl shadow-soft max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-accent-foreground mb-4">
              "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
            </blockquote>
            <cite className="text-sm font-medium text-accent-foreground/80">- Mental Health Advocate</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;