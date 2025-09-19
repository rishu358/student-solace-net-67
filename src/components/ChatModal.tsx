import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'supporter';
  timestamp: string;
}

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatModal = ({ open, onOpenChange }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to listen. What's on your mind today?",
      sender: 'supporter',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const supporterResponses = [
    "That sounds really challenging. Can you tell me more about how you're feeling?",
    "I hear you, and your feelings are completely valid. You're not alone in this.",
    "Thank you for sharing that with me. It takes courage to open up about difficult things.",
    "What kind of support do you think would help you right now?",
    "It's okay to feel overwhelmed sometimes. Let's take this one step at a time.",
    "You're doing the best you can, and that's enough. How can I support you today?",
    "I appreciate you trusting me with this. What would make you feel a little better right now?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate supporter response after a delay
    setTimeout(() => {
      const randomResponse = supporterResponses[Math.floor(Math.random() * supporterResponses.length)];
      const supporterMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'supporter',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, supporterMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>Free Support Chat</span>
          </DialogTitle>
          <DialogDescription>
            You're connected with a trained listener. This is a safe, anonymous space.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • This is a demonstration of our chat support
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;