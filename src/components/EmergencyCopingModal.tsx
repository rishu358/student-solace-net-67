import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Heart, Brain, Phone, Clock, Zap, Shield, Sparkles } from "lucide-react";

interface EmergencyCopingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmergencyCopingModal = ({ open, onOpenChange }: EmergencyCopingModalProps) => {
  const quickTechniques = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      time: "2 min",
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Box Breathing",
      description: "Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat 4 times",
      time: "2 min",
      icon: Heart,
      color: "text-red-600", 
      bgColor: "bg-red-100"
    },
    {
      title: "Cold Water Reset",
      description: "Splash cold water on face/wrists or hold ice cubes to activate your nervous system",
      time: "1 min",
      icon: Zap,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release each muscle group from toes to head, holding for 5 seconds each",
      time: "5 min",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support in English and Spanish",
      available: "Always"
    },
    {
      name: "Crisis Text Line", 
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      available: "Always"
    },
    {
      name: "Campus Counseling Center",
      number: "Your Campus Number",
      description: "Professional counselors familiar with student issues",
      available: "Business Hours"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate medical or psychiatric emergencies",
      available: "Always"
    }
  ];

  const copingStrategies = [
    "Reach out to a trusted friend, family member, or counselor",
    "Go to a public place or stay with someone you trust", 
    "Engage in gentle physical activity like walking or stretching",
    "Practice mindful breathing or meditation",
    "Listen to calming music or nature sounds",
    "Write down your thoughts and feelings in a journal",
    "Use positive self-talk and remind yourself this feeling will pass",
    "Remove yourself from stressful situations when possible"
  ];

  const warningSigns = [
    "Thoughts of self-harm or suicide",
    "Feeling completely hopeless or trapped",
    "Severe anxiety or panic that won't subside",
    "Inability to care for yourself or others",
    "Hearing voices or seeing things others don't",
    "Extreme mood swings or behavior changes",
    "Substance abuse as a coping mechanism",
    "Complete withdrawal from friends and activities"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center">
            <Shield className="h-6 w-6 mr-2 text-red-600" />
            Emergency Coping Kit
          </DialogTitle>
          <p className="text-muted-foreground text-center">Immediate help for overwhelming moments</p>
        </DialogHeader>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick">Quick Help</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Resources</TabsTrigger>
            <TabsTrigger value="coping">Coping Strategies</TabsTrigger>
            <TabsTrigger value="warning">Warning Signs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="space-y-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-sm font-semibold text-red-800">
                  If you're having thoughts of self-harm, please reach out for help immediately.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {quickTechniques.map((technique, index) => {
                const Icon = technique.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-lg ${technique.bgColor} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${technique.color}`} />
                        </div>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {technique.time}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{technique.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{technique.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="crisis" className="space-y-4">
            <div className="grid gap-4">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <p className="text-lg font-mono text-primary">{resource.number}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {resource.available}
                        </span>
                        <Button size="sm" className="mt-2 ml-2">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="coping" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {copingStrategies.map((strategy, index) => (
                <div key={index} className="flex items-start p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-sm">{strategy}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="warning" className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> If you or someone you know is experiencing these signs, 
                please seek professional help immediately.
              </p>
            </div>
            
            <div className="grid gap-2">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-start p-3 bg-red-50 border border-red-100 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-red-800">{sign}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4 border-t">
          <Button onClick={() => onOpenChange(false)}>
            Close Emergency Kit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyCopingModal;