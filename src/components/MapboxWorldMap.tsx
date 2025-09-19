import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
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
  coordinates: [number, number]; // [lng, lat]
}

const MapboxWorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
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
      coordinates: [-74.0060, 40.7128]
    },
    { 
      city: "London", 
      country: "UK", 
      available: true,
      address: "45 Oxford Street, London W1D 2DZ",
      phone: "+44 20 7946 0958",
      email: "london@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [-0.1276, 51.5074]
    },
    { 
      city: "Tokyo", 
      country: "Japan", 
      available: true,
      address: "1-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [139.6917, 35.6895]
    },
    { 
      city: "Sydney", 
      country: "Australia", 
      available: true,
      address: "100 George Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      email: "sydney@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [151.2093, -33.8688]
    },
    { 
      city: "Berlin", 
      country: "Germany", 
      available: true,
      address: "Unter den Linden 1, 10117 Berlin",
      phone: "+49 30 12345678",
      email: "berlin@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [13.4050, 52.5200]
    },
    { 
      city: "Toronto", 
      country: "Canada", 
      available: true,
      address: "100 King Street W, Toronto ON M5X 1A9",
      phone: "+1 (416) 555-0123",
      email: "toronto@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [-79.3832, 43.6532]
    },
    { 
      city: "Mumbai", 
      country: "India", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "mumbai@mindspace.com",
      hours: "Coming Soon",
      coordinates: [72.8777, 19.0760]
    },
    { 
      city: "São Paulo", 
      country: "Brazil", 
      available: false,
      address: "Coming Soon",
      phone: "Coming Soon",
      email: "saopaulo@mindspace.com",
      hours: "Coming Soon",
      coordinates: [-46.6333, -23.5505]
    },
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 2,
      center: [0, 20],
      projection: 'mercator'
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add markers for each center
      centers.forEach((center) => {
        const el = document.createElement('div');
        el.className = `cursor-pointer w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${
          center.available ? 'bg-blue-500' : 'bg-gray-400'
        }`;
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat(center.coordinates)
          .addTo(map.current!);

        el.addEventListener('click', () => {
          setSelectedCenter(center);
          map.current?.flyTo({
            center: center.coordinates,
            zoom: 10,
            duration: 2000
          });
        });
      });

      setMapInitialized(true);
    });
  };

  useEffect(() => {
    if (mapboxToken && !mapInitialized) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleSearch = async () => {
    if (!searchQuery || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-muted/30 rounded-lg p-8">
        <div className="text-center mb-6">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Setup Required</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            To use the interactive world map, please enter your Mapbox public token. 
            You can get one for free at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
        
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => mapboxToken && initializeMap()}
            disabled={!mapboxToken}
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <MapPin className="h-5 w-5 text-blue-500 mt-2.5 ml-2" />
          <Input
            type="text"
            placeholder="Country, City, State, Zip"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 border-0 focus:ring-0"
          />
          <Button 
            onClick={handleSearch}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Selected Center Info */}
      {selectedCenter && (
        <div className="absolute bottom-4 left-4 z-10 max-w-sm">
          <Card className="shadow-lg">
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
                  <p className="text-muted-foreground">{selectedCenter.address}</p>
                  <p className="text-muted-foreground">{selectedCenter.phone}</p>
                  <p className="text-primary font-medium">{selectedCenter.hours}</p>
                  
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
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Mental Health Centers</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Available Centers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span>Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxWorldMap;