import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, Download, Clock, Star } from "lucide-react";
import yogaMeditation from "@/assets/yoga-meditation.jpg";

const ResourceHub = () => {
  const resources = [
    {
      type: "Guide",
      title: "Managing Exam Anxiety",
      description: "Practical strategies to cope with academic stress and anxiety during exam periods.",
      duration: "10 min read",
      rating: 4.8,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600"
    },
    {
      type: "Video",
      title: "Mindfulness for Students",
      description: "Learn simple mindfulness techniques you can practice between classes.",
      duration: "15 min watch",
      rating: 4.9,
      icon: Video,
      color: "bg-purple-100 text-purple-600"
    },
    {
      type: "Audio",
      title: "Sleep Better Meditation",
      description: "Guided meditation to help you relax and improve your sleep quality.",
      duration: "20 min listen",
      rating: 4.7,
      icon: Headphones,
      color: "bg-green-100 text-green-600"
    },
    {
      type: "Toolkit",
      title: "Emergency Coping Kit",
      description: "Quick techniques for when you're feeling overwhelmed or having a crisis.",
      duration: "Instant access",
      rating: 4.9,
      icon: Download,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${yogaMeditation})` }}
      >
        <div className="absolute inset-0 bg-background/90"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Grow at Your Own Pace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of self-help guides, wellness videos, and coping tools designed specifically for college students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer bg-card/95 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{resource.type}</span>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  
                  <Button variant="soft" size="sm" className="w-full">
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories */}
        <div className="text-center space-y-6">
          <h3 className="text-xl font-semibold">Resource Categories</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Anxiety & Stress",
              "Depression Support", 
              "Academic Pressure",
              "Sleep & Rest",
              "Relationships",
              "Self-Care",
              "Crisis Support",
              "Mindfulness"
            ].map((category) => (
              <Button key={category} variant="outline" size="sm" className="bg-card/80 backdrop-blur-sm">
                {category}
              </Button>
            ))}
          </div>
          
          <Button variant="wellness" size="lg">
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;