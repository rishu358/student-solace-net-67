import { Quote } from "lucide-react";
import yogaMeditation from "@/assets/yoga-meditation.jpg";

const InspirationalSection = () => {
  const quotes = [
    {
      text: "You are not alone in this journey. Every step forward, no matter how small, is progress worth celebrating.",
      author: "Mental Health Advocate"
    },
    {
      text: "Healing is not linear. Be patient with yourself as you grow and discover your inner strength.",
      author: "Wellness Coach"
    },
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Self-Care Specialist"
    }
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${yogaMeditation})` }}
      >
        <div className="absolute inset-0 bg-background/75"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Quote className="h-12 w-12 text-accent-strong mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Words of <span className="gradient-wellness bg-clip-text text-transparent">Encouragement</span>
            </h2>
            <p className="text-muted-foreground">
              Gentle reminders for your wellness journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <div 
                key={index} 
                className="bg-card/90 backdrop-blur-sm p-6 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <Quote className="h-6 w-6 text-accent-strong" />
                  <blockquote className="text-foreground italic leading-relaxed">
                    "{quote.text}"
                  </blockquote>
                  <cite className="text-sm text-muted-foreground font-medium">
                    — {quote.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspirationalSection;