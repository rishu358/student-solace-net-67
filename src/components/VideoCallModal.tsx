import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare,
  Settings,
  Monitor,
  Camera
} from "lucide-react";
import { toast } from "sonner";

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  image: string;
}

interface VideoCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  counselor: Counselor;
}

const VideoCallModal = ({ open, onOpenChange, counselor }: VideoCallModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    setIsConnecting(true);
    
    // Request camera and microphone permissions
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // Simulate connection delay
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        toast.success("Connected to video call!");
      }, 2000);
    } catch (error) {
      toast.error("Unable to access camera/microphone. Please check permissions.");
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setCallDuration(0);
    onOpenChange(false);
    toast.success("Call ended");
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast.success(videoEnabled ? "Camera off" : "Camera on");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast.success(audioEnabled ? "Microphone muted" : "Microphone unmuted");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="bg-black relative h-[600px] flex flex-col">
          {/* Header */}
          <DialogHeader className="p-4 bg-black/80 text-white relative z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={counselor.image} alt={counselor.name} />
                  <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-white">{counselor.name}</span>
                  <p className="text-white/70 text-sm">{counselor.specialization}</p>
                </div>
              </DialogTitle>
              
              {isConnected && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  {formatDuration(callDuration)}
                </Badge>
              )}
            </div>
          </DialogHeader>

          {/* Video Area */}
          <div className="flex-1 relative flex items-center justify-center">
            {!isConnected ? (
              <Card className="max-w-md mx-auto bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-8 text-center text-white">
                  {isConnecting ? (
                    <div className="space-y-4">
                      <div className="animate-spin mx-auto">
                        <Video className="h-12 w-12" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Connecting...</h3>
                        <p className="text-white/70">
                          Setting up your video call with {counselor.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={counselor.image} alt={counselor.name} />
                          <AvatarFallback className="text-2xl">
                            {counselor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Ready to start your session?
                        </h3>
                        <p className="text-white/70 mb-6">
                          You're about to start a video call with {counselor.name}
                        </p>
                        
                        <Button 
                          onClick={handleStartCall}
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Start Video Call
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Main video (counselor) */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={counselor.image} alt={counselor.name} />
                      <AvatarFallback className="text-4xl">
                        {counselor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-lg">{counselor.name}</p>
                    <p className="text-white/70">Connected</p>
                  </div>
                </div>
                
                {/* Picture-in-picture (user) */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg border-2 border-white/20 flex items-center justify-center">
                  {videoEnabled ? (
                    <div className="text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">You</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <VideoOff className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Camera Off</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          {isConnected && (
            <div className="p-4 bg-black/80 flex items-center justify-center gap-4">
              <Button
                variant={audioEnabled ? "secondary" : "destructive"}
                size="lg"
                onClick={toggleAudio}
                className="rounded-full h-12 w-12 p-0"
              >
                {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={videoEnabled ? "secondary" : "destructive"}
                size="lg"
                onClick={toggleVideo}
                className="rounded-full h-12 w-12 p-0"
              >
                {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <Monitor className="h-5 w-5" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                onClick={handleEndCall}
                className="rounded-full h-12 w-12 p-0 ml-4"
              >
                <Phone className="h-5 w-5 rotate-[135deg]" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal;