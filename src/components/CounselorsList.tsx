import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Video, Calendar, Clock } from "lucide-react";
import AppointmentBooking from "./AppointmentBooking";
import VideoCallModal from "./VideoCallModal";

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  availability: string;
  price: string;
  image: string;
  languages: string[];
  nextAvailable: string;
}

interface CounselorsListProps {
  centerName: string;
  onBack: () => void;
}

const CounselorsList = ({ centerName, onBack }: CounselorsListProps) => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Anxiety & Depression",
      rating: 4.9,
      experience: "8 years",
      availability: "Available Now",
      price: "$80/session",
      image: "/placeholder.svg",
      languages: ["English", "Spanish"],
      nextAvailable: "Today 2:00 PM"
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specialization: "Trauma Therapy",
      rating: 4.8,
      experience: "12 years",
      availability: "Available Now",
      price: "$95/session",
      image: "/placeholder.svg",
      languages: ["English", "Mandarin"],
      nextAvailable: "Today 3:30 PM"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Family Counseling",
      rating: 4.7,
      experience: "6 years", 
      availability: "Busy",
      price: "$75/session",
      image: "/placeholder.svg",
      languages: ["English", "Spanish", "Portuguese"],
      nextAvailable: "Tomorrow 10:00 AM"
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialization: "Addiction Recovery",
      rating: 4.9,
      experience: "15 years",
      availability: "Available Now",
      price: "$100/session",
      image: "/placeholder.svg",
      languages: ["English"],
      nextAvailable: "Today 4:00 PM"
    }
  ];

  const handleBookAppointment = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setShowBooking(true);
  };

  const handleVideoCall = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setShowVideoCall(true);
  };

  if (showBooking && selectedCounselor) {
    return (
      <AppointmentBooking
        counselor={selectedCounselor}
        centerName={centerName}
        onBack={() => setShowBooking(false)}
      />
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Available Counselors</h3>
            <p className="text-sm text-muted-foreground">{centerName}</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Centers
          </Button>
        </div>

        <div className="grid gap-4">
          {counselors.map((counselor) => (
            <Card key={counselor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={counselor.image} alt={counselor.name} />
                    <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{counselor.name}</h4>
                        <p className="text-primary font-medium">{counselor.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{counselor.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{counselor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge 
                          variant={counselor.availability === "Available Now" ? "default" : "secondary"}
                          className="mb-2"
                        >
                          {counselor.availability}
                        </Badge>
                        <p className="text-lg font-semibold">{counselor.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Next available: {counselor.nextAvailable}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {counselor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBookAppointment(counselor)}
                      disabled={counselor.availability === "Busy"}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleVideoCall(counselor)}
                      disabled={counselor.availability === "Busy"}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showVideoCall && selectedCounselor && (
        <VideoCallModal
          open={showVideoCall}
          onOpenChange={setShowVideoCall}
          counselor={selectedCounselor}
        />
      )}
    </>
  );
};

export default CounselorsList;