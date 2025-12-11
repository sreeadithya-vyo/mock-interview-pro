import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, FileText, Video, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const processingSteps = [
  { icon: Video, label: "Processing video recording...", duration: 2000 },
  { icon: FileText, label: "Generating transcript...", duration: 3000 },
  { icon: BarChart3, label: "Analyzing performance...", duration: 2000 },
];

export default function TranscriptProcessing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const totalDuration = processingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = (elapsed / totalDuration) * 100;
      setProgress(Math.min(newProgress, 100));

      // Update current step
      let accumulated = 0;
      for (let i = 0; i < processingSteps.length; i++) {
        accumulated += processingSteps[i].duration;
        if (elapsed < accumulated) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/interview/new/player");
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  const CurrentIcon = processingSteps[currentStep]?.icon || Loader2;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse">
          <CurrentIcon className="w-12 h-12 text-primary-foreground" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Processing Your Interview
        </h1>
        <p className="text-muted-foreground mb-8">
          {processingSteps[currentStep]?.label || "Almost done..."}
        </p>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{Math.round(progress)}% complete</span>
            <span>
              Step {currentStep + 1} of {processingSteps.length}
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          {processingSteps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                index === currentStep
                  ? "border-primary bg-primary/5 shadow-soft"
                  : index < currentStep
                  ? "border-success/50 bg-success/5"
                  : "border-border bg-card"
              }`}
            >
              <step.icon
                className={`w-6 h-6 mx-auto mb-2 ${
                  index === currentStep
                    ? "text-primary"
                    : index < currentStep
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <p
                className={`text-xs ${
                  index === currentStep
                    ? "text-primary font-medium"
                    : index < currentStep
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              >
                {index < currentStep ? "Done" : index === currentStep ? "In Progress" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
