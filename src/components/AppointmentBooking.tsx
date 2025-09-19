import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  price: string;
  image: string;
}

interface AppointmentBookingProps {
  counselor: Counselor;
  centerName: string;
  onBack: () => void;
}

const AppointmentBooking = ({ counselor, centerName, onBack }: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [reason, setReason] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const sessionTypes = [
    "Individual Therapy",
    "Couples Therapy", 
    "Family Therapy",
    "Group Session",
    "Consultation"
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !sessionType) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate booking process
    setIsBooked(true);
    toast.success("Appointment booked successfully!");
  };

  if (isBooked) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Appointment Confirmed!
          </h3>
          <p className="text-muted-foreground">
            Your session with {counselor.name} has been scheduled
          </p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session:</span>
                <span className="font-medium">{sessionType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost:</span>
                <span className="font-medium">{counselor.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onBack}>
            Book Another Session
          </Button>
          <Button>
            Add to Calendar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Book Appointment</h3>
          <p className="text-sm text-muted-foreground">{centerName}</p>
        </div>
      </div>

      {/* Counselor Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={counselor.image} alt={counselor.name} />
              <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">{counselor.name}</h4>
              <p className="text-primary text-sm">{counselor.specialization}</p>
            </div>
            <Badge variant="outline">{counselor.price}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="time">Available Times</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="session-type">Session Type</Label>
              <Select value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Visit (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe what you'd like to discuss..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-20"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime || !sessionType}
            >
              Book Appointment - {counselor.price}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;