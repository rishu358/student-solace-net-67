import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TherapyQuestionnaire from "./TherapyQuestionnaire";
import LoginModal from "./LoginModal";
import { Heart, CheckCircle } from "lucide-react";

interface TherapyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TherapyModal = ({ open, onOpenChange }: TherapyModalProps) => {
  const [step, setStep] = useState<'intro' | 'questionnaire' | 'completed'>('intro');
  const [showLogin, setShowLogin] = useState(false);

  const startQuestionnaire = () => {
    setStep('questionnaire');
  };

  const completeQuestionnaire = () => {
    setStep('completed');
  };

  const proceedToLogin = () => {
    setShowLogin(true);
    onOpenChange(false);
  };

  const resetModal = () => {
    setStep('intro');
    setShowLogin(false);
  };

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetModal();
    }
    onOpenChange(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {step === 'intro' && (
            <>
              <DialogHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  <DialogTitle className="text-xl">Considering Therapy?</DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Let's start with a brief assessment to better understand your needs
                </p>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto mb-4 gradient-hero rounded-full flex items-center justify-center">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">You're Taking a Brave Step</h3>
                    <p className="text-muted-foreground">
                      Seeking help is a sign of strength, not weakness. Our brief assessment will help us understand how we can best support you.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-accent/30">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-sm">Anonymous</h4>
                    <p className="text-xs text-muted-foreground">Your responses are confidential</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/30">
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-sm">Quick</h4>
                    <p className="text-xs text-muted-foreground">Takes less than 3 minutes</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/30">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-sm">Supportive</h4>
                    <p className="text-xs text-muted-foreground">No judgment, just understanding</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={startQuestionnaire} variant="hero" size="lg">
                    Start Assessment
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    This assessment is not a diagnostic tool and does not replace professional consultation
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 'questionnaire' && (
            <TherapyQuestionnaire onComplete={completeQuestionnaire} />
          )}

          {step === 'completed' && (
            <>
              <DialogHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  <DialogTitle className="text-xl">Assessment Complete</DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Thank you for taking the time to share with us
                </p>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">You're Not Alone</h3>
                  <p className="text-muted-foreground mb-4">
                    Based on your responses, connecting with mental health resources could be beneficial. 
                    Create an account to access personalized recommendations and support.
                  </p>
                </div>

                <div className="bg-accent/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create your account to access personalized resources</li>
                    <li>• Connect with qualified mental health professionals</li>
                    <li>• Join supportive community groups</li>
                    <li>• Access self-help tools and resources</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={proceedToLogin} variant="hero" size="lg">
                    Create Account & Get Support
                  </Button>
                  <Button variant="outline" onClick={() => handleModalClose(false)}>
                    Maybe Later
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  If you're experiencing thoughts of self-harm, please contact emergency services or a crisis helpline immediately.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
};

export default TherapyModal;