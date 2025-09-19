import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Heart, Users } from "lucide-react";

const ChatPreview = () => {
  const mockMessages = [
    {
      id: 1,
      type: "received",
      message: "Hi! I'm here to listen. How are you feeling today?",
      time: "2:30 PM"
    },
    {
      id: 2,
      type: "sent",
      message: "I've been feeling really anxious about my upcoming exams",
      time: "2:32 PM"
    },
    {
      id: 3,
      type: "received",
      message: "That sounds really stressful. It's completely normal to feel anxious about exams. Would you like to talk about what specifically is making you feel this way?",
      time: "2:33 PM"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Free 24/7 Chat Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with trained listeners who understand what you're going through. No judgment, just support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <div className="relative">
            <Card className="max-w-md mx-auto shadow-card">
              <CardHeader className="gradient-hero text-white">
                <CardTitle className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat with a Listener</span>
                  <div className="ml-auto flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.type === 'sent'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent text-accent-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t bg-muted/50">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg text-sm bg-background"
                      disabled
                    />
                    <Button size="sm" variant="hero">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Benefits */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-accent-strong" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Caring Listeners</h3>
                  <p className="text-muted-foreground">
                    Our trained volunteers provide emotional support and a safe space to share your thoughts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Peer Support</h3>
                  <p className="text-muted-foreground">
                    Connect with other students who understand your challenges and experiences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Available Anytime</h3>
                  <p className="text-muted-foreground">
                    Whether it's 2 AM or 2 PM, someone is always here to listen when you need support.
                  </p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full">
              Start Chatting Now - It's Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;