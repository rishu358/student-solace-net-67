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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

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
      available: true,
      address: "Bandra Kurla Complex, Mumbai 400051",
      phone: "+91 22 1234 5678",
      email: "mumbai@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [72.8777, 19.0760]
    },
    { 
      city: "Delhi", 
      country: "India", 
      available: true,
      address: "Connaught Place, New Delhi 110001",
      phone: "+91 11 2345 6789",
      email: "delhi@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [77.2090, 28.6139]
    },
    { 
      city: "Bangalore", 
      country: "India", 
      available: true,
      address: "MG Road, Bangalore 560001",
      phone: "+91 80 3456 7890",
      email: "bangalore@mindspace.com",
      hours: "24/7 Crisis Support",
      coordinates: [77.5946, 12.9716]
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

  const getCurrentLocation = () => {
    return new Promise<[number, number]>((resolve, reject) => {
      console.log('Checking geolocation support...');
      
      if (!navigator.geolocation) {
        console.error('Geolocation not supported');
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      console.log('Requesting location permission...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location obtained:', position.coords);
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          resolve(coords);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Failed to get your location. ';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    });
  };

  const showRoute = async (destination: [number, number]) => {
    if (!map.current || !mapboxToken) {
      console.log('Map or token not available:', { map: !!map.current, token: !!mapboxToken });
      return;
    }

    console.log('Starting route calculation to:', destination);
    setIsLoadingRoute(true);
    
    try {
      console.log('Getting user location...');
      const userCoords = await getCurrentLocation();
      console.log('User location obtained:', userCoords);
      
      // Add user location marker
      const userMarker = document.createElement('div');
      userMarker.className = 'w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg animate-pulse';
      
      new mapboxgl.Marker(userMarker)
        .setLngLat(userCoords)
        .addTo(map.current);

      console.log('Fetching route from Mapbox Directions API...');
      // Get route from Mapbox Directions API
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords[0]},${userCoords[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxToken}`;
      console.log('Directions API URL:', directionsUrl);
      
      const response = await fetch(directionsUrl);
      console.log('Directions API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Directions API failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Directions API data:', data);
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        console.log('Route found, adding to map...');
        
        // Add route to map
        if (map.current.getSource('route')) {
          map.current.removeLayer('route');
          map.current.removeSource('route');
        }
        
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry
          }
        });
        
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 5
          }
        });
        
        // Fit map to show entire route
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend(userCoords);
        bounds.extend(destination);
        
        map.current.fitBounds(bounds, {
          padding: 50,
          duration: 2000
        });
        
        console.log('Route successfully added to map');
        alert(`Route found! Distance: ${(route.distance / 1000).toFixed(1)} km, Duration: ${Math.round(route.duration / 60)} minutes`);
      } else {
        throw new Error('No routes found');
      }
    } catch (error) {
      console.error('Failed to get directions:', error);
      alert(`Failed to get directions: ${error.message}. Please check your location permissions and internet connection.`);
    } finally {
      setIsLoadingRoute(false);
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => showRoute(selectedCenter.coordinates)}
                      disabled={isLoadingRoute}
                    >
                      {isLoadingRoute ? 'Loading Route...' : 'Get Directions'}
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