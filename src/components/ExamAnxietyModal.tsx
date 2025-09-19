import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Brain, Heart, Zap } from "lucide-react";

interface ExamAnxietyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExamAnxietyModal = ({ open, onOpenChange }: ExamAnxietyModalProps) => {
  const tips = [
    {
      icon: Brain,
      title: "Mind Preparation",
      tip: "Start studying 2-3 weeks before exams. Break material into small, manageable chunks.",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Time Management",
      tip: "Use the Pomodoro technique: 25 minutes study, 5 minutes break. Repeat 4 times, then longer break.",
      color: "text-green-600"
    },
    {
      icon: Heart,
      title: "Breathing Technique",
      tip: "Practice 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8. Repeat 3-4 times when anxious.",
      color: "text-red-600"
    },
    {
      icon: Zap,
      title: "Quick Energy Boost",
      tip: "Take short walks, drink water, and eat brain foods like nuts, berries, and dark chocolate.",
      color: "text-yellow-600"
    }
  ];

  const quickTechniques = [
    "Arrive early to your exam location to avoid rushing",
    "Read all questions before starting to prioritize",
    "If you feel overwhelmed, pause and take 3 deep breaths",
    "Start with easier questions to build confidence",
    "Remember: Some anxiety is normal and can actually help focus"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Managing Exam Anxiety</DialogTitle>
          <p className="text-muted-foreground text-center">Practical strategies to stay calm and focused</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Tips */}
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${tip.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Techniques */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Quick Exam Day Techniques
            </h3>
            <ul className="space-y-2">
              {quickTechniques.map((technique, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-sm">{technique}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Save for Later
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              Got It, Thanks!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamAnxietyModal;