import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Calendar,
  Search,
  TrendingUp,
  Clock,
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageCircle,
  Shield,
  BookOpen
} from "lucide-react";
import communitySupport from "@/assets/community-support.jpg";

const Community = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const communityStats = [
    { label: "Active Members", value: "2,847", icon: Users },
    { label: "Posts Today", value: "73", icon: MessageSquare },
    { label: "Support Given", value: "12,453", icon: Heart },
    { label: "Events This Month", value: "24", icon: Calendar }
  ];

  const featuredGroups = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety",
      members: 1247,
      category: "Mental Health",
      isActive: true,
      recentActivity: "12 new posts today",
      moderator: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      name: "Student Mental Health",
      description: "Support specifically for students dealing with academic stress",
      members: 2103,
      category: "Student Life",
      isActive: true,
      recentActivity: "23 new posts today",
      moderator: "Alex Chen"
    },
    {
      id: 3,
      name: "Mindfulness & Meditation",
      description: "Daily mindfulness practices and meditation techniques",
      members: 1534,
      category: "Wellness",
      isActive: true,
      recentActivity: "15 new posts today",
      moderator: "Maya Patel"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Study Tips for Managing Overwhelming Course Load",
      author: "StudyBuddy23",
      group: "Student Mental Health",
      replies: 24,
      likes: 67,
      time: "2 hours ago",
      preview: "I've been struggling with my course load this semester and wanted to share some strategies that have been helping me..."
    },
    {
      id: 2,
      title: "Anyone else struggling with social anxiety on campus?",
      author: "QuietStudent",
      group: "Anxiety Support Circle",
      replies: 18,
      likes: 43,
      time: "5 hours ago",
      preview: "I find it really hard to make friends and participate in class discussions. Looking for advice from others who understand..."
    },
    {
      id: 3,
      title: "Healthy coping strategies that actually work",
      author: "WellnessWarrior",
      group: "Mindfulness & Meditation",
      replies: 31,
      likes: 89,
      time: "1 day ago",
      preview: "After years of trial and error, here are the coping strategies that have made the biggest difference in my mental health journey..."
    }
  ];

  const upcomingEvents = [
    {
      title: "Mindfulness Monday",
      description: "Group meditation session",
      time: "Today 6:00 PM",
      participants: 23,
      type: "Virtual"
    },
    {
      title: "Study Support Circle",
      description: "Peer study group for finals prep",
      time: "Tomorrow 3:00 PM", 
      participants: 15,
      type: "Hybrid"
    },
    {
      title: "Mental Health Awareness Workshop",
      description: "Understanding anxiety and depression",
      time: "Friday 7:00 PM",
      participants: 45,
      type: "Virtual"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Community</h1>
                <p className="text-muted-foreground">Connect, share, and grow together</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="hero">Join Community</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communitySupport})` }}
        >
          <div className="absolute inset-0 bg-background/85"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              You're Not Alone in This Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and young adults supporting each other through life's challenges. 
              Share your story, find your tribe, and grow together in a safe, moderated environment.
            </p>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {communityStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="groups" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Featured Support Groups</h3>
              <p className="text-muted-foreground">Find your community and connect with others who understand</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-card transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{group.category}</Badge>
                      </div>
                      {group.isActive && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {group.members.toLocaleString()} members
                        </span>
                        <span className="text-green-600">{group.recentActivity}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Moderated by {group.moderator}</span>
                      </div>
                      
                      <Button className="w-full" variant="hero">
                        Join Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Recent Discussions</h3>
              <p className="text-muted-foreground">Join the conversation and share your experiences</p>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>in {post.group}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.group.split(' ')[0]}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{post.preview}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes} likes</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Join Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Upcoming Events</h3>
              <p className="text-muted-foreground">Join group activities and workshops</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.participants} participants</span>
                        </div>
                        <Badge variant="outline" className="w-fit">
                          {event.type}
                        </Badge>
                      </div>
                      
                      <Button className="w-full" variant="wellness">
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Guidelines */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Safe Space Guidelines</h3>
                <p className="text-muted-foreground">
                  Our community is built on respect, empathy, and mutual support
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Community Values
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be respectful and supportive to all members</li>
                    <li>• Share experiences, not medical advice</li>
                    <li>• Maintain privacy and confidentiality</li>
                    <li>• Use content warnings for sensitive topics</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Getting Started
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Introduce yourself in the welcome thread</li>
                    <li>• Read group rules before posting</li>
                    <li>• Start with commenting before creating posts</li>
                    <li>• Report any concerning content to moderators</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="hero">
                  Read Full Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;