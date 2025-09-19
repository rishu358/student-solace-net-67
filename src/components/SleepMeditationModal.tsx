import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Clock, Star, Volume2, Moon, Waves, Leaf, Cloud } from "lucide-react";
import { useState } from "react";

interface SleepMeditationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SleepMeditationModal = ({ open, onOpenChange }: SleepMeditationModalProps) => {
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioTracks = [
    {
      id: "1",
      title: "Deep Sleep Body Scan",
      description: "Progressive relaxation from head to toe. Perfect for releasing study tension.",
      duration: "20 min",
      rating: 4.9,
      plays: "5.2K",
      icon: Moon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      type: "Guided Meditation"
    },
    {
      id: "2",
      title: "Ocean Waves & Breathing",
      description: "Natural ocean sounds combined with gentle breathing guidance for deeper sleep.",
      duration: "25 min", 
      rating: 4.8,
      plays: "3.8K",
      icon: Waves,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      type: "Nature Sounds"
    },
    {
      id: "3",
      title: "Forest Rain Meditation",
      description: "Gentle rain sounds in a peaceful forest setting with soft meditation guidance.",
      duration: "18 min",
      rating: 4.7,
      plays: "4.1K",
      icon: Leaf,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      type: "Nature Sounds"
    },
    {
      id: "4",
      title: "Anxiety Release Sleep",
      description: "Specifically designed for students dealing with exam stress and worry.",
      duration: "22 min",
      rating: 4.9,
      plays: "6.3K",
      icon: Cloud,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100", 
      type: "Anxiety Relief"
    },
    {
      id: "5",
      title: "Study Recovery Rest",
      description: "Reset your mind after long study sessions with this restorative meditation.",
      duration: "15 min",
      rating: 4.8,
      plays: "2.9K",
      icon: Moon,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      type: "Recovery"
    }
  ];

  const handleAudioSelect = (audioId: string) => {
    setSelectedAudio(audioId);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Here you would integrate with an actual audio player
  };

  if (selectedAudio) {
    const audio = audioTracks.find(a => a.id === selectedAudio);
    const Icon = audio?.icon || Moon;
    
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{audio?.title}</DialogTitle>
            <p className="text-muted-foreground">{audio?.description}</p>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Audio Player */}
            <div className="bg-gradient-to-br from-muted/30 to-muted/60 p-8 rounded-lg text-center space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-full ${audio?.bgColor} flex items-center justify-center`}>
                <Icon className={`h-10 w-10 ${audio?.color}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{audio?.title}</h3>
                <p className="text-sm text-muted-foreground">{audio?.duration}</p>
              </div>
              
              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button size="lg" onClick={togglePlayback}>
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Progress Bar Placeholder */}
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-0 transition-all duration-1000"></div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                {isPlaying ? "Playing..." : "Press play to begin your sleep meditation"}
              </p>
            </div>
            
            {/* Sleep Tips */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💡 Sleep Tips</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use headphones or earbuds for the best experience</li>
                <li>• Dim your lights and put away electronic devices</li>
                <li>• Lie down comfortably and close your eyes</li>
                <li>• Don't worry if you fall asleep during the meditation</li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedAudio(null)}>
                ← Back to Audios
              </Button>
              <Button onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Sleep Better Meditation</DialogTitle>
          <p className="text-muted-foreground text-center">Choose an audio meditation to help you relax and sleep better</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {audioTracks.map((audio) => {
            const Icon = audio.icon;
            return (
              <Card key={audio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${audio.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${audio.color}`} />
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{audio.type}</span>
                  </div>
                  <CardTitle className="text-lg">{audio.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{audio.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{audio.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{audio.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="h-3 w-3" />
                      <span>{audio.plays}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleAudioSelect(audio.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SleepMeditationModal;