import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, ThumbsUp, Calendar } from "lucide-react";
import communitySupport from "@/assets/community-support.jpg";

const CommunityPreview = () => {
  const forumPosts = [
    {
      title: "Study Tips for Managing Overwhelming Course Load",
      author: "StudyBuddy23",
      replies: 24,
      likes: 67,
      time: "2 hours ago",
      category: "Academic Support"
    },
    {
      title: "Anyone else struggling with social anxiety on campus?",
      author: "QuietStudent",
      replies: 18,
      likes: 43,
      time: "5 hours ago",
      category: "Mental Health"
    },
    {
      title: "Healthy coping strategies that actually work",
      author: "WellnessWarrior",
      replies: 31,
      likes: 89,
      time: "1 day ago",
      category: "Self-Care"
    }
  ];

  const upcomingEvents = [
    {
      title: "Mindfulness Monday",
      description: "Group meditation session",
      time: "Today 6:00 PM",
      participants: 23
    },
    {
      title: "Study Support Circle",
      description: "Peer study group for finals prep",
      time: "Tomorrow 3:00 PM", 
      participants: 15
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${communitySupport})` }}
      >
        <div className="absolute inset-0 bg-background/88"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Peer Support Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and find support in our moderated community forums and group activities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Stats */}
          <div className="space-y-4">
            <Card className="shadow-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-semibold text-primary">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Online Now</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Posts Today</span>
                  <span className="font-semibold">73</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Support Given</span>
                  <span className="font-semibold text-accent-strong">12,453</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent-strong" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-accent/20 rounded-lg">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-primary">{event.time}</span>
                      <span className="text-muted-foreground">{event.participants} joining</span>
                    </div>
                  </div>
                ))}
                <Button variant="wellness" size="sm" className="w-full">
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Forum Posts */}
          <div className="lg:col-span-2">
            <Card className="shadow-card bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Recent Discussions</span>
                  </div>
                  <Button variant="soft" size="sm">
                    New Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {forumPosts.map((post, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-card transition-smooth cursor-pointer bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-xs bg-accent px-2 py-1 rounded-full text-accent-foreground">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>by {post.author}</span>
                        <span>{post.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline">
                    View More Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-card bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Safe Space Guidelines</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our community is moderated by trained volunteers to ensure a supportive, respectful environment where everyone feels safe to share and seek help.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="wellness" size="sm">
                  Join Community
                </Button>
                <Button variant="outline" size="sm">
                  Read Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;