import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Users, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Activity,
  Target,
  Clock
} from "lucide-react";
import ChatModal from "@/components/ChatModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    {
      title: "Chat Sessions",
      value: "12",
      change: "+3 this week",
      icon: MessageCircle,
      color: "text-blue-600"
    },
    {
      title: "Community Posts",
      value: "8",
      change: "+2 this week",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Resources Used",
      value: "15",
      change: "+5 this week",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      title: "Wellness Score",
      value: "78%",
      change: "+12% this month",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      type: "chat",
      title: "Completed anxiety support chat",
      time: "2 hours ago",
      icon: MessageCircle
    },
    {
      type: "resource",
      title: "Read 'Managing Exam Stress' guide",
      time: "1 day ago",
      icon: BookOpen
    },
    {
      type: "community",
      title: "Posted in Depression Support group",
      time: "2 days ago",
      icon: Users
    },
    {
      type: "goal",
      title: "Completed daily mindfulness goal",
      time: "3 days ago",
      icon: Target
    }
  ];

  const upcomingEvents = [
    {
      title: "Mindfulness Monday Session",
      time: "Today, 6:00 PM",
      type: "Group Session"
    },
    {
      title: "Study Support Circle",
      time: "Tomorrow, 3:00 PM",
      type: "Peer Support"
    },
    {
      title: "Therapy Appointment",
      time: "Friday, 2:00 PM",
      type: "Individual"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MindSpace Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Sarah</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    variant="hero" 
                    className="h-20 flex-col"
                    onClick={() => setChatOpen(true)}
                  >
                    <MessageCircle className="h-6 w-6 mb-2" />
                    Start Chat Session
                  </Button>
                  <Button 
                    variant="wellness" 
                    className="h-20 flex-col"
                    onClick={() => navigate("/community")}
                  >
                    <Users className="h-6 w-6 mb-2" />
                    Join Community
                  </Button>
                  <Button variant="soft" className="h-20 flex-col">
                    <BookOpen className="h-6 w-6 mb-2" />
                    Browse Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="text-lg">SM</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">Sarah Miller</h3>
                  <p className="text-sm text-muted-foreground">Student at University</p>
                  <Badge variant="outline" className="mt-2">
                    Active Member
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-accent/20 rounded-lg">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wellness Tip */}
            <Card className="bg-gradient-wellness">
              <CardContent className="p-6">
                <h3 className="font-semibold text-accent-foreground mb-2">Daily Wellness Tip</h3>
                <p className="text-sm text-accent-foreground/80">
                  Take 5 minutes today to practice deep breathing. It can help reduce stress and improve focus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatModal open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Dashboard;