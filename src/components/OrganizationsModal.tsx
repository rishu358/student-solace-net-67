import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Globe, Star, Users } from "lucide-react";

interface OrganizationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrganizationsModal = ({ open, onOpenChange }: OrganizationsModalProps) => {
  const organizations = [
    {
      id: 1,
      name: "Crisis Text Line",
      description: "24/7 crisis support via text messaging",
      rating: 4.8,
      members: "50k+",
      contact: "Text HOME to 741741",
      website: "crisistextline.org",
      location: "National",
      type: "Crisis Support",
      verified: true
    },
    {
      id: 2,
      name: "National Alliance on Mental Illness",
      description: "Mental health advocacy and support organization",
      rating: 4.7,
      members: "100k+",
      contact: "1-800-950-NAMI",
      website: "nami.org",
      location: "National",
      type: "Advocacy",
      verified: true
    },
    {
      id: 3,
      name: "Active Minds",
      description: "Student-run mental health advocacy on college campuses",
      rating: 4.6,
      members: "25k+",
      contact: "activeminds.org/contact",
      website: "activeminds.org",
      location: "College Campuses",
      type: "Student Support",
      verified: true
    },
    {
      id: 4,
      name: "JED Campus",
      description: "Comprehensive approach to mental health on campus",
      rating: 4.9,
      members: "400+ schools",
      contact: "jedfoundation.org",
      website: "jedfoundation.org",
      location: "Campus Network",
      type: "Prevention",
      verified: true
    },
    {
      id: 5,
      name: "To Write Love on Her Arms",
      description: "Support for depression, addiction, and suicide prevention",
      rating: 4.5,
      members: "30k+",
      contact: "twloha.com/contact",
      website: "twloha.com",
      location: "National",
      type: "Support Community",
      verified: false
    },
    {
      id: 6,
      name: "Mental Health America",
      description: "Community-based mental health services and advocacy",
      rating: 4.4,
      members: "75k+",
      contact: "1-800-969-6642",
      website: "mhanational.org",
      location: "National",
      type: "Healthcare",
      verified: true
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            Partner Organizations
          </DialogTitle>
          <p className="text-muted-foreground">
            Trusted mental health organizations and resources to support your journey
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {organizations.map((org) => (
            <Card key={org.id} className="hover:shadow-card transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      {org.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs w-fit">
                      {org.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{org.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{org.members}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {org.description}
                </CardDescription>
                
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{org.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{org.contact}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{org.website}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(`https://${org.website}`, '_blank')}>
                      Visit Website
                    </Button>
                    <Button variant="soft" size="sm">
                      Get Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              Need to add your organization? <span className="text-primary cursor-pointer hover:underline">Contact us</span>
            </p>
            <Button variant="hero" size="sm">
              Emergency Support - Call 988
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationsModal;