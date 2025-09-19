import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import WorldGlobe from "@/components/WorldGlobe";
import CounselorsList from "@/components/CounselorsList";

interface WorldMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorldMapModal = ({ open, onOpenChange }: WorldMapModalProps) => {
  const [showCounselors, setShowCounselors] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<string>("");
  const centers = [
    { 
      city: "New York", 
      country: "USA", 
      available: true,
      address: "123 Broadway, Manhattan, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "London", 
      country: "UK", 
      available: true,
      address: "45 Oxford Street, London W1D 2DZ",
      phone: "+44 20 7946 0958",
      email: "london@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "Tokyo", 
      country: "Japan", 
      available: true,
      address: "1-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "Sydney", 
      country: "Australia", 
      available: true,
      address: "100 George Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      email: "sydney@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "Berlin", 
      country: "Germany", 
      available: true,
      address: "Unter den Linden 1, 10117 Berlin",
      phone: "+49 30 12345678",
      email: "berlin@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "Toronto", 
      country: "Canada", 
      available: true,
      address: "100 King Street W, Toronto ON M5X 1A9",
      phone: "+1 (416) 555-0123",
      email: "toronto@mindspace.com",
      hours: "24/7 Crisis Support"
    },
    { 
      city: "Mumbai", 
      country: "India", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "mumbai@mindspace.com",
      hours: "Coming Soon"
    },
    { 
      city: "São Paulo", 
      country: "Brazil", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "saopaulo@mindspace.com",
      hours: "Coming Soon"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-6 w-6 text-primary" />
            Mental Health Centers Worldwide
          </DialogTitle>
        </DialogHeader>
        
        {showCounselors ? (
          <CounselorsList 
            centerName={selectedCenter} 
            onBack={() => setShowCounselors(false)} 
          />
        ) : (
        <Tabs defaultValue="globe" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="globe" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Interactive Globe
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Center Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="globe" className="mt-4">
            <WorldGlobe />
          </TabsContent>
          
          <TabsContent value="list" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{centers.map((center) => (
            <Card 
              key={`${center.city}-${center.country}`}
              className={`transition-all duration-200 ${
                center.available 
                  ? 'hover:shadow-md border-primary/20' 
                  : 'opacity-60 border-muted'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {center.city}
                    </h3>
                    <p className="text-muted-foreground text-sm">{center.country}</p>
                  </div>
                  <Badge 
                    variant={center.available ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {center.available ? "Available" : "Coming Soon"}
                  </Badge>
                </div>
                
                {center.available ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{center.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-primary font-medium">{center.hours}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        Get Directions
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedCenter(`${center.city}, ${center.country}`);
                          setShowCounselors(true);
                        }}
                      >
                        Contact Now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>We're working hard to bring MindSpace to this location. Stay tuned for updates!</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
                      Notify When Available
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            ))}
            </div>
          </TabsContent>
        </Tabs>
        )}
        
        <div className="mt-6 p-4 bg-accent/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Need Immediate Help?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            If you're in crisis or need immediate support, please contact your local emergency services or use our 24/7 crisis chat.
          </p>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Emergency: 911
            </Button>
            <Button variant="default" size="sm">
              24/7 Crisis Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorldMapModal;