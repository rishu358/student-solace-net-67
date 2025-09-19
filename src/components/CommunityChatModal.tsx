import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import quoteStrength from "@/assets/quote-strength.jpg";
import quoteMindfulness from "@/assets/quote-mindfulness.jpg";
import quoteJourney from "@/assets/quote-journey.jpg";

interface Message {
  id: number;
  text?: string;
  sender: string;
  timestamp: string;
  isCurrentUser?: boolean;
  image?: string;
  likes?: number;
  type?: 'text' | 'image' | 'quote';
}

interface Community {
  id: number;
  name: string;
  category: string;
  icon: any;
}

interface CommunityChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  community: Community | null;
  onBackToCommunities: () => void;
}

const CommunityChatModal = ({ open, onOpenChange, community, onBackToCommunities }: CommunityChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Welcome to ${community?.name}! This is a safe, supportive space where we can share our journeys together. 💚`,
      sender: "Community Guide",
      timestamp: "9:45 AM",
      isCurrentUser: false,
      type: 'text',
      likes: 12
    },
    {
      id: 2,
      text: "Thank you for creating this sanctuary. I've been struggling lately, but knowing there's a place like this gives me hope.",
      sender: "Sarah M.",
      timestamp: "9:52 AM",
      isCurrentUser: false,
      type: 'text',
      likes: 8
    },
    {
      id: 3,
      image: quoteStrength,
      text: "This quote really spoke to me today. Sharing it with all of you who might need to hear it too.",
      sender: "Maya R.",
      timestamp: "10:15 AM",
      isCurrentUser: false,
      type: 'quote',
      likes: 15
    },
    {
      id: 4,
      text: "Hi everyone! 👋 New member here. I've been dealing with anxiety for years, and finally decided to reach out for community support. Looking forward to connecting with you all.",
      sender: "Alex K.",
      timestamp: "10:28 AM",
      isCurrentUser: false,
      type: 'text',
      likes: 6
    },
    {
      id: 5,
      image: quoteMindfulness,
      text: "Starting my mindfulness journey today. This reminds me to be gentle with myself.",
      sender: "Jordan P.",
      timestamp: "10:45 AM",
      isCurrentUser: false,
      type: 'quote',
      likes: 9
    },
    {
      id: 6,
      text: "Had a really tough morning, but reading everyone's messages here reminded me I'm not alone. Thank you all for sharing your stories. It takes so much courage. 💪",
      sender: "Emma L.",
      timestamp: "11:02 AM",
      isCurrentUser: false,
      type: 'text',
      likes: 11
    },
    {
      id: 7,
      image: quoteJourney,
      text: "Found this beautiful reminder. Every step counts, no matter how small. 🌱",
      sender: "Riley S.",
      timestamp: "11:20 AM",
      isCurrentUser: false,
      type: 'quote',
      likes: 13
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate community response based on the topic
      setTimeout(() => {
        const responses = getCommunityResponses(community?.category || "");
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const supporterMessage: Message = {
          id: messages.length + 2,
          text: randomResponse.text,
          sender: randomResponse.sender,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        };
        setMessages(prev => [...prev, supporterMessage]);
      }, 1000);
    }
  };

  const getCommunityResponses = (category: string) => {
    const responseMap: { [key: string]: Array<{ text: string; sender: string }> } = {
      "Anxiety": [
        { text: "I understand that feeling completely. Have you tried the breathing technique we discussed earlier?", sender: "Alex K." },
        { text: "Thank you for sharing. You're not alone in this journey.", sender: "Community Helper" },
        { text: "That takes a lot of courage to share. We're here to support you.", sender: "Emma L." }
      ],
      "Depression": [
        { text: "Your feelings are valid and it's okay to have difficult days.", sender: "Jordan P." },
        { text: "I'm here if you need someone to listen. We've all been there.", sender: "Community Helper" },
        { text: "Small steps count too. Every day you're here is a victory.", sender: "Taylor M." }
      ],
      "Wellness": [
        { text: "That's a wonderful mindfulness practice! I'll try that too.", sender: "Zen Master" },
        { text: "Thank you for sharing your wellness journey with us.", sender: "Riley S." },
        { text: "Your positive energy is inspiring to our community.", sender: "Community Helper" }
      ],
      "default": [
        { text: "Thank you for sharing your experience with our community.", sender: "Community Helper" },
        { text: "We're all here to support each other on this journey.", sender: "Supporter" },
        { text: "Your contribution means a lot to our community.", sender: "Moderator" }
      ]
    };
    return responseMap[category] || responseMap["default"];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!community) return null;

  const IconComponent = community.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col bg-gradient-to-br from-background via-muted/30 to-accent/20">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToCommunities}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10">
                <IconComponent className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-lg">{community.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {community.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  124 online
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 py-2">
          <div className="space-y-6 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
                  {!message.isCurrentUser && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-primary">
                        {message.sender}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                  )}
                  
                  <div className={`rounded-xl px-4 py-3 shadow-card transition-smooth ${
                    message.isCurrentUser 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-card border border-border/50'
                  }`}>
                    {message.type === 'quote' && message.image && (
                      <div className="mb-3">
                        <img 
                          src={message.image} 
                          alt="Inspirational quote" 
                          className="w-full rounded-lg max-h-48 object-cover shadow-soft"
                        />
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">{message.text}</div>
                    
                    {!message.isCurrentUser && (
                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-border/30">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground hover:text-primary">
                          <Heart className="h-3 w-3 mr-1" />
                          <span className="text-xs">{message.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-muted-foreground hover:text-primary">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span className="text-xs">Reply</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {message.isCurrentUser && (
                    <div className="text-xs text-muted-foreground mt-1 text-right">
                      {message.timestamp}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 pt-4 border-t border-border/50 bg-card/50 backdrop-blur-sm rounded-t-lg">
          <div className="flex gap-3 px-1">
            <Input
              placeholder={`Share your thoughts with ${community.name}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-background/80 border-border/50 focus:border-primary/50 rounded-xl px-4 py-3"
            />
            <Button 
              onClick={handleSendMessage} 
              size="sm" 
              className="px-4 rounded-xl bg-primary hover:bg-primary/90 shadow-soft"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunityChatModal;