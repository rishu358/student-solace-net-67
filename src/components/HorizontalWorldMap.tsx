import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface Center {
  city: string;
  country: string;
  available: boolean;
  address: string;
  phone: string;
  email: string;
  hours: string;
  position: { top: string; left: string };
}

const HorizontalWorldMap = () => {
  const [hoveredCenter, setHoveredCenter] = useState<Center | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const centers: Center[] = [
    { 
      city: "New York", 
      country: "USA", 
      available: true,
      address: "123 Broadway, Manhattan, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "45%", left: "22%" }
    },
    { 
      city: "London", 
      country: "UK", 
      available: true,
      address: "45 Oxford Street, London W1D 2DZ",
      phone: "+44 20 7946 0958",
      email: "london@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "38%", left: "52%" }
    },
    { 
      city: "Tokyo", 
      country: "Japan", 
      available: true,
      address: "1-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "42%", left: "85%" }
    },
    { 
      city: "Sydney", 
      country: "Australia", 
      available: true,
      address: "100 George Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      email: "sydney@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "75%", left: "88%" }
    },
    { 
      city: "Berlin", 
      country: "Germany", 
      available: true,
      address: "Unter den Linden 1, 10117 Berlin",
      phone: "+49 30 12345678",
      email: "berlin@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "35%", left: "54%" }
    },
    { 
      city: "Toronto", 
      country: "Canada", 
      available: true,
      address: "100 King Street W, Toronto ON M5X 1A9",
      phone: "+1 (416) 555-0123",
      email: "toronto@mindspace.com",
      hours: "24/7 Crisis Support",
      position: { top: "40%", left: "20%" }
    },
    { 
      city: "Mumbai", 
      country: "India", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "mumbai@mindspace.com",
      hours: "Coming Soon",
      position: { top: "58%", left: "72%" }
    },
    { 
      city: "São Paulo", 
      country: "Brazil", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "saopaulo@mindspace.com",
      hours: "Coming Soon",
      position: { top: "70%", left: "32%" }
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg overflow-hidden">
      {/* World Map Background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath d='M150 200 Q200 150 250 200 T350 200 Q400 180 450 200 T550 200 Q600 190 650 200 T750 200 Q800 180 850 200' stroke='%23cbd5e1' stroke-width='2' fill='none'/%3E%3Cpath d='M100 250 Q150 220 200 250 T300 250 Q350 230 400 250 T500 250 Q550 240 600 250 T700 250 Q750 230 800 250' stroke='%23cbd5e1' stroke-width='2' fill='none'/%3E%3Cpath d='M200 300 Q250 270 300 300 T400 300 Q450 280 500 300 T600 300 Q650 290 700 300 T800 300' stroke='%23cbd5e1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Continents outline */}
        <svg className="w-full h-full" viewBox="0 0 1000 500">
          {/* North America */}
          <path d="M50 100 Q150 80 250 120 L280 200 Q200 220 120 180 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
          
          {/* Europe */}
          <path d="M450 80 Q520 70 580 100 L600 150 Q550 160 480 140 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
          
          {/* Asia */}
          <path d="M600 60 Q750 50 900 100 L920 200 Q800 220 650 180 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
          
          {/* Africa */}
          <path d="M420 160 Q500 150 550 200 L580 350 Q520 360 450 320 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
          
          {/* South America */}
          <path d="M200 250 Q280 240 320 290 L340 400 Q280 420 220 380 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
          
          {/* Australia */}
          <path d="M750 350 Q820 340 870 370 L880 400 Q840 410 780 390 Z" 
                fill="hsl(var(--muted))" opacity="0.6" />
        </svg>
      </div>

      {/* Center Markers */}
      {centers.map((center, index) => (
        <div
          key={`${center.city}-${center.country}`}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
            center.available ? 'hover:scale-125' : 'opacity-60'
          }`}
          style={{ 
            top: center.position.top, 
            left: center.position.left 
          }}
          onMouseEnter={(e) => {
            setHoveredCenter(center);
            handleMouseMove(e);
          }}
          onMouseLeave={() => setHoveredCenter(null)}
          onMouseMove={handleMouseMove}
        >
          {/* Pulsing Ring */}
          <div className={`absolute inset-0 rounded-full animate-ping ${
            center.available ? 'bg-primary' : 'bg-muted-foreground'
          } opacity-30`} />
          
          {/* Main Marker */}
          <div className={`w-4 h-4 rounded-full border-2 border-background shadow-lg ${
            center.available 
              ? 'bg-primary hover:bg-primary/80' 
              : 'bg-muted-foreground'
          }`} />
        </div>
      ))}

      {/* Tooltip */}
      {hoveredCenter && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <Card className="shadow-lg border-primary/20 max-w-sm">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    {hoveredCenter.city}
                  </h4>
                  <p className="text-xs text-muted-foreground">{hoveredCenter.country}</p>
                </div>
                <Badge 
                  variant={hoveredCenter.available ? "default" : "secondary"}
                  className="text-xs"
                >
                  {hoveredCenter.available ? "Available" : "Coming Soon"}
                </Badge>
              </div>
              
              {hoveredCenter.available ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{hoveredCenter.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{hoveredCenter.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{hoveredCenter.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-primary font-medium text-xs">{hoveredCenter.hours}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Coming soon to this location!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Available Centers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span>Coming Soon</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Hover over markers for details
        </p>
      </div>
    </div>
  );
};

export default HorizontalWorldMap;