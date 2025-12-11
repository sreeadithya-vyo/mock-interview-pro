import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Play,
  Pause,
  SkipForward,
  Flag,
  Square,
  Clock,
  MessageSquare,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const mockQuestions = [
  "Tell me about a time when you had to work under pressure to meet a tight deadline. How did you handle it?",
  "Describe a situation where you had to collaborate with a difficult team member. What approach did you take?",
  "Can you walk me through a complex technical problem you solved recently?",
  "How do you prioritize tasks when you have multiple competing deadlines?",
  "Tell me about a time you received critical feedback. How did you respond?",
];

export default function InterviewRoom() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        setQuestionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulated transcript updates
  useEffect(() => {
    if (isRecording && !isPaused) {
      const transcriptInterval = setInterval(() => {
        const responses = [
          "So, in that situation, I approached it by...",
          "The main challenge was to balance the priorities...",
          "I communicated with the team to ensure alignment...",
          "We ended up delivering ahead of schedule...",
        ];
        setTranscript((prev) => [
          ...prev,
          responses[Math.floor(Math.random() * responses.length)],
        ]);
      }, 5000);
      return () => clearInterval(transcriptInterval);
    }
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Your interview is now being recorded.",
      });
    } catch (error) {
      toast({
        title: "Permission denied",
        description: "Please allow camera and microphone access.",
        variant: "destructive",
      });
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Recording resumed" : "Recording paused",
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setQuestionTime(0);
      setTranscript([]);
    } else {
      setEndDialogOpen(true);
    }
  };

  const skipQuestion = () => {
    toast({
      title: "Question skipped",
      description: "Moving to the next question.",
    });
    nextQuestion();
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  const endInterview = () => {
    setEndDialogOpen(false);
    navigate("/interview/new/processing");
  };

  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                isRecording && !isPaused ? "bg-destructive animate-pulse" : "bg-muted-foreground"
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {isRecording ? (isPaused ? "Paused" : "Recording") : "Ready"}
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(sessionTime)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {mockQuestions.length}
          </span>
          <Progress value={progress} className="w-32 h-2" />
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setEndDialogOpen(true)}
        >
          <Square className="w-4 h-4 mr-2" />
          End Interview
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Question */}
        <div className="w-1/3 border-r border-border p-6 overflow-y-auto bg-card">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  Current Question
                </span>
                <Button
                  variant={flaggedQuestions.includes(currentQuestion) ? "warning" : "ghost"}
                  size="sm"
                  onClick={toggleFlag}
                >
                  <Flag className="w-4 h-4 mr-1" />
                  {flaggedQuestions.includes(currentQuestion) ? "Flagged" : "Flag"}
                </Button>
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {mockQuestions[currentQuestion]}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Time on question: {formatTime(questionTime)}</span>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-primary font-medium mb-2">💡 Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                <li>• Be specific with examples</li>
                <li>• Keep your answer concise (2-3 minutes)</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={skipQuestion}>
                <SkipForward className="w-4 h-4 mr-2" />
                Skip
              </Button>
              <Button variant="default" className="flex-1" onClick={nextQuestion}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Center Panel - Video */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 flex items-center justify-center bg-muted/30">
            <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden bg-foreground/5 border border-border shadow-elevated">
              {!isRecording ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Click "Start Recording" to begin</p>
                  <Button variant="hero" size="lg" onClick={startRecording}>
                    <Play className="w-5 h-5 mr-2" />
                    Start Recording
                  </Button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={cn(
                      "w-full h-full object-cover",
                      isCameraOff && "opacity-0"
                    )}
                  />
                  {isCameraOff && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                      <VideoOff className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                disabled={!isRecording}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                variant={isCameraOff ? "destructive" : "outline"}
                size="icon"
                onClick={() => setIsCameraOff(!isCameraOff)}
                disabled={!isRecording}
              >
                {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>
              <Button
                variant={isPaused ? "default" : "outline"}
                size="lg"
                onClick={togglePause}
                disabled={!isRecording}
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Transcript & Notes */}
        <div className="w-1/3 border-l border-border flex flex-col bg-card">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Live Transcript</span>
            </div>
            <div className="space-y-3">
              {transcript.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  Transcript will appear here as you speak...
                </p>
              ) : (
                transcript.map((text, index) => (
                  <p key={index} className="text-sm text-foreground">
                    {text}
                  </p>
                ))
              )}
            </div>
          </div>
          <div className="border-t border-border p-4">
            <Label className="text-sm font-medium text-foreground mb-2 block">Notes</Label>
            <Textarea
              placeholder="Take notes during the interview..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
      </main>

      {/* End Interview Dialog */}
      <AlertDialog open={endDialogOpen} onOpenChange={setEndDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              End Interview?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this mock interview? Your recording and responses
              will be processed for evaluation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Interview</AlertDialogCancel>
            <AlertDialogAction onClick={endInterview}>End & Review</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
