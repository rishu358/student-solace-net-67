import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";

interface TherapyQuestionnaireProps {
  onComplete: () => void;
}

const TherapyQuestionnaire = ({ onComplete }: TherapyQuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      question: "How often have you been feeling down, depressed, or hopeless in the past two weeks?",
      options: [
        { value: "never", label: "Not at all" },
        { value: "several", label: "Several days" },
        { value: "more", label: "More than half the days" },
        { value: "nearly", label: "Nearly every day" }
      ]
    },
    {
      id: 1,
      question: "How often have you had little interest or pleasure in doing things?",
      options: [
        { value: "never", label: "Not at all" },
        { value: "several", label: "Several days" },
        { value: "more", label: "More than half the days" },
        { value: "nearly", label: "Nearly every day" }
      ]
    },
    {
      id: 2,
      question: "How would you rate your current stress level?",
      options: [
        { value: "low", label: "Low - I feel calm and relaxed" },
        { value: "moderate", label: "Moderate - Some stress but manageable" },
        { value: "high", label: "High - Often feeling overwhelmed" },
        { value: "severe", label: "Severe - Constantly stressed and anxious" }
      ]
    },
    {
      id: 3,
      question: "Are you currently receiving any mental health support?",
      options: [
        { value: "none", label: "No support currently" },
        { value: "informal", label: "Support from friends/family only" },
        { value: "professional", label: "Seeing a mental health professional" },
        { value: "considering", label: "Considering professional help" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-xl">Mental Health Assessment</CardTitle>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-relaxed">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button
              onClick={onComplete}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              Complete Assessment
              <Heart className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-4 border-t">
          This assessment is for informational purposes only and does not replace professional medical advice.
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyQuestionnaire;