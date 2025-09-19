import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Star, Users } from "lucide-react";
import { useState } from "react";

interface MindfulnessVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MindfulnessVideoModal = ({ open, onOpenChange }: MindfulnessVideoModalProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: "1",
      title: "5-Minute Morning Mindfulness",
      description: "Perfect for starting your day with clarity and focus. Gentle breathing exercises.",
      duration: "5 min",
      rating: 4.9,
      views: "2.3K",
      thumbnail: "🌅",
      difficulty: "Beginner"
    },
    {
      id: "2", 
      title: "Study Break Meditation",
      description: "Quick reset between study sessions. Helps clear mental fog and restore concentration.",
      duration: "10 min",
      rating: 4.8,
      views: "1.8K",
      thumbnail: "📚",
      difficulty: "Beginner"
    },
    {
      id: "3",
      title: "Stress Relief Breathing",
      description: "Advanced breathing techniques for exam stress and anxiety management.",
      duration: "12 min",
      rating: 4.9,
      views: "3.1K", 
      thumbnail: "🌬️",
      difficulty: "Intermediate"
    },
    {
      id: "4",
      title: "Body Scan for Students",
      description: "Release physical tension from sitting and studying. Full body awareness practice.",
      duration: "15 min",
      rating: 4.7,
      views: "1.5K",
      thumbnail: "🧘‍♂️",
      difficulty: "Beginner"
    },
    {
      id: "5",
      title: "Mindful Walking Break",
      description: "Practice mindfulness while walking around campus or your study space.",
      duration: "8 min",
      rating: 4.8,
      views: "2.7K",
      thumbnail: "🚶‍♀️",
      difficulty: "Beginner"
    }
  ];

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    // Here you would typically integrate with a video player
    // For now, we'll show a placeholder
  };

  if (selectedVideo) {
    const video = videos.find(v => v.id === selectedVideo);
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{video?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-6xl">{video?.thumbnail}</div>
                <p className="text-lg font-semibold">Video Player</p>
                <p className="text-muted-foreground">Duration: {video?.duration}</p>
                <Button size="lg" className="mt-4">
                  <Play className="h-5 w-5 mr-2" />
                  Play Video
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                ← Back to Videos
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
          <DialogTitle className="text-2xl text-center">Mindfulness Videos for Students</DialogTitle>
          <p className="text-muted-foreground text-center">Choose a video that fits your schedule and needs</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{video.thumbnail}</div>
                  <div className="text-right text-xs space-y-1">
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {video.difficulty}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{video.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{video.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span>{video.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{video.views}</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleVideoSelect(video.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
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

export default MindfulnessVideoModal;