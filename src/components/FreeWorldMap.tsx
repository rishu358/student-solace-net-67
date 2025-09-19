import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Center {
  city: string;
  country: string;
  available: boolean;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: [number, number]; // [lat, lng]
}

const FreeWorldMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  const centers: Center[] = [
    { 
      city: "New York", 
      country: "USA", 
      available: true,
      address: "123 Broadway, Manhattan, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [40.7128, -74.0060]
    },
    { 
      city: "London", 
      country: "UK", 
      available: true,
      address: "45 Oxford Street, London W1D 2DZ",
      phone: "+44 20 7946 0958",
      email: "london@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [51.5074, -0.1276]
    },
    { 
      city: "Tokyo", 
      country: "Japan", 
      available: true,
      address: "1-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [35.6895, 139.6917]
    },
    { 
      city: "Sydney", 
      country: "Australia", 
      available: true,
      address: "100 George Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      email: "sydney@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [-33.8688, 151.2093]
    },
    { 
      city: "Berlin", 
      country: "Germany", 
      available: true,
      address: "Unter den Linden 1, 10117 Berlin",
      phone: "+49 30 12345678",
      email: "berlin@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [52.5200, 13.4050]
    },
    { 
      city: "Toronto", 
      country: "Canada", 
      available: true,
      address: "100 King Street W, Toronto ON M5X 1A9",
      phone: "+1 (416) 555-0123",
      email: "toronto@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [43.6532, -79.3832]
    },
    { 
      city: "Mumbai", 
      country: "India", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "mumbai@mindspace.com",
      hours: "Coming Soon",
      coordinates: [19.0760, 72.8777]
    },
    { 
      city: "São Paulo", 
      country: "Brazil", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "saopaulo@mindspace.com",
      hours: "Coming Soon",
      coordinates: [-23.5505, -46.6333]
    },
  ];

  const handleSearch = async () => {
    if (!searchQuery) return;
    
    try {
      // Use a free geocoding service (Nominatim)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        console.log('Found location:', { lat, lng });
        // Find the closest center to the searched location
        const closest = centers.reduce((prev, curr) => {
          const prevDistance = Math.sqrt(
            Math.pow(prev.coordinates[0] - lat, 2) + Math.pow(prev.coordinates[1] - lng, 2)
          );
          const currDistance = Math.sqrt(
            Math.pow(curr.coordinates[0] - lat, 2) + Math.pow(curr.coordinates[1] - lng, 2)
          );
          return prevDistance < currDistance ? prev : curr;
        });
        setSelectedCenter(closest);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted/30 px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Find Local Help & Support Near You
        </h1>
        <p className="text-muted-foreground max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
          Find the help you need, when and where you need it. MindSpace provides critical resources, including local licensed therapists, counselors, treatment centers, and a range of local support organizations, such as churches, housing assistance, food pantries, and faith-based support organizations. Find local providers and localized information from your nation down to your neighborhood.
        </p>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <div className="flex bg-white dark:bg-card rounded-lg shadow-lg border border-border/50 overflow-hidden">
            <div className="flex items-center pl-4 pr-2">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <Input
              type="text"
              placeholder="Country, City, State, Zip"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 border-0 focus:ring-0 bg-transparent"
            />
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-none"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive World Map */}
      <div className="relative w-full h-[500px] bg-white dark:bg-card rounded-lg shadow-lg border border-border/50 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 500">
          {/* Simplified World Map - Clean Blue Style */}
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          
          {/* Ocean background */}
          <rect width="1000" height="500" fill="url(#oceanGradient)" />
          
          {/* Continents in blue */}
          <g fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" opacity="0.8">
            {/* North America */}
            <path d="M50 80 Q120 60 180 80 Q220 90 250 120 L280 140 Q300 160 290 200 Q280 240 250 260 L200 250 Q150 240 120 220 Q80 200 60 180 Q40 160 50 140 Z" />
            
            {/* South America */}
            <path d="M200 280 Q240 270 280 290 Q300 310 320 340 L340 380 Q350 420 340 450 Q320 470 290 460 Q260 450 240 430 Q220 410 210 380 Q200 350 200 320 Z" />
            
            {/* Europe */}
            <path d="M450 60 Q480 50 520 60 Q550 70 580 80 L600 90 Q620 110 610 140 Q600 160 580 170 L550 160 Q520 150 490 140 Q460 130 450 110 Z" />
            
            {/* Africa */}
            <path d="M420 180 Q450 170 480 180 Q510 190 530 210 Q550 230 560 260 L570 300 Q580 340 570 380 Q560 420 540 440 Q520 450 490 440 Q460 430 440 410 Q420 390 410 360 Q400 330 400 300 Q400 270 410 240 Q415 210 420 180 Z" />
            
            {/* Asia */}
            <path d="M600 40 Q650 30 700 40 Q750 50 800 60 Q850 70 900 90 L920 120 Q930 150 925 180 Q920 210 910 240 L890 260 Q870 270 840 265 Q810 260 780 250 Q750 240 720 230 Q690 220 660 210 Q630 200 610 180 Q590 160 595 140 Q600 120 605 100 Q602 70 600 40 Z" />
            
            {/* Australia */}
            <path d="M750 360 Q780 350 810 360 Q840 370 870 380 L880 390 Q885 400 880 410 Q875 420 860 415 Q845 410 830 405 Q815 400 800 395 Q785 390 770 385 Q755 380 750 370 Z" />
          </g>

          {/* Center markers */}
          {centers.map((center, index) => {
            // Convert lat/lng to SVG coordinates (simplified projection)
            const x = ((center.coordinates[1] + 180) / 360) * 1000;
            const y = ((90 - center.coordinates[0]) / 180) * 500;
            
            return (
              <g key={`${center.city}-${center.country}`}>
                {/* Pulsing ring animation for available centers */}
                {center.available && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="#ef4444"
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}
                {/* Main marker */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={center.available ? "#ef4444" : "#94a3b8"}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedCenter(center)}
                />
                {/* City label */}
                <text
                  x={x}
                  y={y + 20}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground"
                  style={{ fontSize: '11px' }}
                >
                  {center.city}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Center Info */}
        {selectedCenter && (
          <div className="absolute bottom-4 left-4 z-10 max-w-sm">
            <Card className="shadow-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedCenter.city}
                    </h3>
                    <p className="text-muted-foreground text-sm">{selectedCenter.country}</p>
                  </div>
                  <Badge 
                    variant={selectedCenter.available ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {selectedCenter.available ? "Available" : "Coming Soon"}
                  </Badge>
                </div>
                
                {selectedCenter.available ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{selectedCenter.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{selectedCenter.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{selectedCenter.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-primary font-medium">{selectedCenter.hours}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        Get Directions
                      </Button>
                      <Button variant="default" size="sm" className="flex-1">
                        Contact Now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>We're working hard to bring MindSpace to this location.</p>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCenter(null)}
                  className="mt-2 w-full"
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/50">
          <h4 className="font-semibold text-sm mb-2">Mental Health Centers</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Available Centers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span>Coming Soon</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click markers for details
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreeWorldMap;