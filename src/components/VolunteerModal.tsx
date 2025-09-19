import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HandHeart, Clock, Users, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VolunteerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VolunteerModal = ({ open, onOpenChange }: VolunteerModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    experience: "",
    availability: "",
    motivation: "",
    background: false,
    training: false,
    commitment: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.motivation) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and motivation are required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.background || !formData.training || !formData.commitment) {
      toast({
        title: "Please accept all requirements",
        description: "All checkboxes must be checked to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in volunteering. We'll be in touch soon with next steps.",
    });
    
    // Reset form and close modal
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      experience: "",
      availability: "",
      motivation: "",
      background: false,
      training: false,
      commitment: false
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HandHeart className="h-5 w-5 text-accent-strong" />
            <span>Become a Volunteer Listener</span>
          </DialogTitle>
          <DialogDescription>
            Join our community of trained volunteers providing peer support to students in need.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Select onValueChange={(value) => handleInputChange('age', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-21">18-21</SelectItem>
                    <SelectItem value="22-25">22-25</SelectItem>
                    <SelectItem value="26-30">26-30</SelectItem>
                    <SelectItem value="30+">30+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Experience & Availability */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Experience & Availability</span>
            </h3>

            <div>
              <Label htmlFor="experience">Previous Experience</Label>
              <Select onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No formal experience</SelectItem>
                  <SelectItem value="peer">Peer support experience</SelectItem>
                  <SelectItem value="volunteer">Previous volunteer work</SelectItem>
                  <SelectItem value="professional">Professional background</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="availability">Weekly Availability</Label>
              <Select onValueChange={(value) => handleInputChange('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How many hours per week?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-5">2-5 hours</SelectItem>
                  <SelectItem value="5-10">5-10 hours</SelectItem>
                  <SelectItem value="10-15">10-15 hours</SelectItem>
                  <SelectItem value="15+">15+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Your Motivation</span>
            </h3>
            
            <div>
              <Label htmlFor="motivation">Why do you want to volunteer? *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                placeholder="Tell us what motivates you to help others and support mental health..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Requirements</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="background"
                  checked={formData.background}
                  onCheckedChange={(checked) => handleInputChange('background', checked as boolean)}
                />
                <Label htmlFor="background" className="text-sm leading-relaxed">
                  I consent to a background check and understand it's required for volunteer positions
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="training"
                  checked={formData.training}
                  onCheckedChange={(checked) => handleInputChange('training', checked as boolean)}
                />
                <Label htmlFor="training" className="text-sm leading-relaxed">
                  I commit to completing the required 20-hour training program
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="commitment"
                  checked={formData.commitment}
                  onCheckedChange={(checked) => handleInputChange('commitment', checked as boolean)}
                />
                <Label htmlFor="commitment" className="text-sm leading-relaxed">
                  I can commit to volunteering for at least 6 months
                </Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;