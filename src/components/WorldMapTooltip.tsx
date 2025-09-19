import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const WorldMapTooltip = () => {
  const centers = [
    { city: "New York", country: "USA", available: true },
    { city: "London", country: "UK", available: true },
    { city: "Tokyo", country: "Japan", available: true },
    { city: "Sydney", country: "Australia", available: true },
    { city: "Berlin", country: "Germany", available: true },
    { city: "Toronto", country: "Canada", available: true },
    { city: "Mumbai", country: "India", available: false },
    { city: "São Paulo", country: "Brazil", available: false },
  ];

  return (
    <Card className="w-80 p-4 shadow-lg border-primary/20">
      <CardContent className="p-0">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Available Mental Health Centers
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {centers.map((center) => (
            <div 
              key={`${center.city}-${center.country}`}
              className="flex items-center justify-between p-2 rounded-md bg-accent/30 hover:bg-accent/50 transition-colors"
            >
              <div className="text-sm">
                <div className="font-medium text-foreground">{center.city}</div>
                <div className="text-muted-foreground text-xs">{center.country}</div>
              </div>
              <Badge 
                variant={center.available ? "default" : "secondary"}
                className="text-xs"
              >
                {center.available ? "Available" : "Coming Soon"}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Click "Local" to find detailed information about centers near you
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMapTooltip;