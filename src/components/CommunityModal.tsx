import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageCircle, Calendar, Heart, Brain, Sparkles, Shield } from "lucide-react";
import { useState } from "react";
import CommunityChatModal from "./CommunityChatModal";

interface CommunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommunityModal = ({ open, onOpenChange }: CommunityModalProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState<typeof communities[0] | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const communities = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety",
      members: 1247,
      icon: Brain,
      category: "Anxiety",
      isActive: true,
      recentActivity: "12 new posts today"
    },
    {
      id: 2,
      name: "Depression Warriors",
      description: "Together we fight depression with understanding and support",
      members: 892,
      icon: Heart,
      category: "Depression",
      isActive: true,
      recentActivity: "8 new posts today"
    },
    {
      id: 3,
      name: "Mindfulness & Meditation",
      description: "Daily mindfulness practices and meditation techniques",
      members: 1534,
      icon: Sparkles,
      category: "Wellness",
      isActive: true,
      recentActivity: "15 new posts today"
    },
    {
      id: 4,
      name: "PTSD Support Network",
      description: "Peer support for those dealing with trauma and PTSD",
      members: 623,
      icon: Shield,
      category: "Trauma",
      isActive: true,
      recentActivity: "5 new posts today"
    },
    {
      id: 5,
      name: "Student Mental Health",
      description: "Support specifically for students dealing with academic stress",
      members: 2103,
      icon: Users,
      category: "Student Life",
      isActive: true,
      recentActivity: "23 new posts today"
    },
    {
      id: 6,
      name: "Workplace Wellness",
      description: "Managing mental health in professional environments",
      members: 756,
      icon: Brain,
      category: "Work Life",
      isActive: true,
      recentActivity: "7 new posts today"
    }
  ];

  const joinCommunity = (communityId: number) => {
    const community = communities.find(c => c.id === communityId);
    if (community) {
      setSelectedCommunity(community);
      setChatOpen(true);
    }
  };

  const handleBackToCommunities = () => {
    setChatOpen(false);
    setSelectedCommunity(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-primary mr-2" />
            <DialogTitle className="text-xl">Mental Health Communities</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Find support and connect with others who understand your journey
          </p>
        </DialogHeader>

        <div className="grid gap-4 mt-6">
          {communities.map((community) => {
            const IconComponent = community.icon;
            return (
              <Card key={community.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {community.name}
                          {community.isActive && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {community.category}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="hero" 
                      size="sm"
                      onClick={() => joinCommunity(community.id)}
                    >
                      Join
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {community.members.toLocaleString()} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {community.recentActivity}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last activity: 2 hours ago
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-accent/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Community Guidelines</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Be respectful and supportive to all members</li>
            <li>• Share experiences, not medical advice</li>
            <li>• Maintain privacy and confidentiality</li>
            <li>• Report any concerning content to moderators</li>
          </ul>
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Browse All Communities
          </Button>
        </div>
      </DialogContent>
      
      <CommunityChatModal
        open={chatOpen}
        onOpenChange={setChatOpen}
        community={selectedCommunity}
        onBackToCommunities={handleBackToCommunities}
      />
    </Dialog>
  );
};

export default CommunityModal;