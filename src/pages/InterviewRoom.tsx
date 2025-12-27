import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  RotateCcw,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockQuestions = [
  { text: "What job ", highlight: "experience level", suffix: " are you targeting?" },
  { text: "Tell me about a time when you ", highlight: "led a team", suffix: " through a difficult project." },
  { text: "How do you approach ", highlight: "problem solving", suffix: " in complex situations?" },
  { text: "What makes you ", highlight: "passionate", suffix: " about this role?" },
  { text: "Describe your ", highlight: "biggest achievement", suffix: " in your career so far." },
];

export default function InterviewRoom() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();

  // Simulate AI speaking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAISpeaking((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const repeatQuestion = () => {
    toast({
      title: "Repeating question",
      description: "The AI interviewer will repeat the current question.",
    });
  };

  const leaveInterview = () => {
    setLeaveDialogOpen(false);
    navigate(`/interview/${id || "new"}/processing`);
  };

  const currentQ = mockQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Frontend Developer Interview
            </h1>
          </div>
          
          {/* Tech Icons */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
                <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
                <path d="M12 21.35c-1.37 0-2.63-.15-3.73-.43-.93-.24-1.73-.55-2.38-.93-.68-.4-1.18-.86-1.5-1.37-.32-.52-.47-1.08-.47-1.62 0-.54.15-1.1.47-1.62.32-.51.82-.97 1.5-1.37.65-.38 1.45-.69 2.38-.93 1.1-.28 2.36-.43 3.73-.43 1.37 0 2.63.15 3.73.43.93.24 1.73.55 2.38.93.68.4 1.18.86 1.5 1.37.32.52.47 1.08.47 1.62 0 .54-.15 1.1-.47 1.62-.32.51-.82.97-1.5 1.37-.65.38-1.45.69-2.38.93-1.1.28-2.36.43-3.73.43Z"/>
              </svg>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 text-foreground bg-secondary">
          Technical Interview
        </Badge>
      </header>

      {/* Main Content - Interview Cards */}
      <main className="flex-1 px-6 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Interviewer Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl opacity-60 blur-sm group-hover:opacity-80 transition-opacity" />
            <div className="relative h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col items-center justify-center p-8 min-h-[320px] lg:min-h-[380px]">
              {/* AI Avatar with Speaking Animation */}
              <div className="relative mb-6">
                {/* Outer Ring Animation */}
                <div className={cn(
                  "absolute inset-0 rounded-full border-2 border-primary/30 scale-[1.5] transition-all duration-700",
                  isAISpeaking && "animate-ping opacity-40"
                )} />
                <div className={cn(
                  "absolute inset-0 rounded-full border-2 border-primary/40 scale-[1.25] transition-all duration-500",
                  isAISpeaking && "animate-pulse"
                )} />
                
                {/* Avatar Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-primary/30">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-card flex items-center justify-center shadow-xl border border-border">
                    <MessageCircle className={cn(
                      "w-12 h-12 md:w-14 md:h-14 text-primary transition-transform duration-300",
                      isAISpeaking && "scale-110"
                    )} />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">AI Interviewer</h2>
              
              {/* Speaking Indicator */}
              <div className={cn(
                "mt-4 flex items-center gap-2 transition-opacity duration-300",
                isAISpeaking ? "opacity-100" : "opacity-0"
              )}>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/30 to-primary/30 rounded-2xl opacity-40 blur-sm group-hover:opacity-60 transition-opacity" />
            <div className="relative h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col items-center justify-center p-8 min-h-[320px] lg:min-h-[380px]">
              {/* User Avatar */}
              <div className="relative mb-6">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-accent/30">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="User" />
                  <AvatarFallback className="text-4xl bg-accent text-accent-foreground">AD</AvatarFallback>
                </Avatar>
                
                {/* Camera/Mic Status Indicator */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors border-2 border-card",
                    isMuted ? "bg-destructive" : "bg-success"
                  )}>
                    {isMuted ? <MicOff className="w-4 h-4 text-destructive-foreground" /> : <Mic className="w-4 h-4 text-success-foreground" />}
                  </div>
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors border-2 border-card",
                    isCameraOff ? "bg-destructive" : "bg-success"
                  )}>
                    {isCameraOff ? <VideoOff className="w-4 h-4 text-destructive-foreground" /> : <Video className="w-4 h-4 text-success-foreground" />}
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Adrian (You)</h2>
              
              {/* Listening Indicator */}
              <p className="mt-3 text-sm text-muted-foreground">
                {!isAISpeaking ? "Your turn to respond..." : "Listening..."}
              </p>
            </div>
          </div>
        </div>

        {/* Question Bar */}
        <div className="w-full">
          <div className="glass rounded-2xl px-8 py-6 text-center shadow-elevated">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed">
              {currentQ.text}
              <span className="inline-block px-4 py-1.5 mx-1 rounded-lg bg-card border border-border font-medium text-foreground shadow-sm">
                {currentQ.highlight}
              </span>
              {currentQ.suffix}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pb-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={repeatQuestion}
            className="px-10 py-6 text-base gap-3 rounded-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Repeat
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={() => setLeaveDialogOpen(true)}
            className="px-10 py-6 text-base gap-3 rounded-xl"
          >
            <PhoneOff className="w-5 h-5" />
            Leave interview
          </Button>
        </div>
      </main>

      {/* Quick Controls - Floating */}
      <div className="fixed bottom-6 left-6 flex gap-2">
        <Button
          variant={isMuted ? "destructive" : "outline"}
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full shadow-lg"
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Button
          variant={isCameraOff ? "destructive" : "outline"}
          size="icon"
          onClick={() => setIsCameraOff(!isCameraOff)}
          className="w-12 h-12 rounded-full shadow-lg"
        >
          {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>
      </div>

      {/* Leave Interview Dialog */}
      <AlertDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <PhoneOff className="w-5 h-5 text-destructive" />
              Leave Interview?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this interview? Your progress will be saved
              and you'll be taken to the evaluation screen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Interview</AlertDialogCancel>
            <AlertDialogAction onClick={leaveInterview} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Leave Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
