import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  FileText,
  Scissors,
  BarChart3,
  ChevronRight,
  Clock,
  Rewind,
  FastForward,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const transcriptData = [
  { time: "00:00", speaker: "Interviewer", text: "Tell me about a time when you had to work under pressure to meet a tight deadline." },
  { time: "00:15", speaker: "You", text: "Sure, I'd be happy to share an example. In my previous role as a software engineer..." },
  { time: "00:45", speaker: "You", text: "We had a critical feature that needed to be shipped within two weeks, but we discovered a major technical blocker..." },
  { time: "01:30", speaker: "You", text: "I organized daily standups, broke down the work into smaller tasks, and coordinated with the team to parallelize efforts..." },
  { time: "02:15", speaker: "You", text: "In the end, we delivered the feature on time and it exceeded the expected performance benchmarks by 20%." },
  { time: "02:45", speaker: "Interviewer", text: "That's great. Can you elaborate on the specific technical challenge you faced?" },
  { time: "03:00", speaker: "You", text: "Absolutely. The main issue was with our database queries which were taking too long..." },
];

export default function InterviewPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(300); // 5 minutes
  const [volume, setVolume] = useState([80]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export started",
      description: `Your transcript will be downloaded as ${format.toUpperCase()}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interview Review</h1>
            <p className="text-muted-foreground">Senior Software Engineer - Google • Jan 15, 2024</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/interview/new/evaluation")}>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Evaluation
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("txt")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Text (.txt)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("srt")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Subtitles (.srt)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Document
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-foreground/5 border border-border shadow-elevated">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1280&h=720&fit=crop"
              />
              
              {/* Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/20 group"
                >
                  <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </button>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 rounded-xl bg-card border border-border shadow-card">
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={([value]) => setCurrentTime(value)}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                  >
                    <Rewind className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="w-12 h-12 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
                  >
                    <FastForward className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Slider
                      value={isMuted ? [0] : volume}
                      max={100}
                      step={1}
                      onValueChange={setVolume}
                      className="w-24"
                    />
                  </div>

                  {/* Playback Speed */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {playbackSpeed}x
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <DropdownMenuItem
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                        >
                          {speed}x
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="ghost" size="icon">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>
              <Button variant="outline" className="flex-1">
                <Scissors className="w-4 h-4 mr-2" />
                Create Clip
              </Button>
            </div>
          </div>

          {/* Transcript Panel */}
          <div className="lg:col-span-1">
            <div className="p-4 rounded-xl bg-card border border-border shadow-card h-[600px] flex flex-col">
              <Tabs defaultValue="transcript" className="flex-1 flex flex-col">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="clean">Clean</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="flex-1 overflow-y-auto mt-4">
                  <div className="space-y-4">
                    {transcriptData.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveTranscriptIndex(index);
                          // Would seek video to timestamp
                        }}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all",
                          activeTranscriptIndex === index
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-3 h-3 text-primary" />
                          <span className="text-xs text-primary font-medium">{item.time}</span>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            item.speaker === "You"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {item.speaker}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{item.text}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="clean" className="flex-1 overflow-y-auto mt-4">
                  <div className="prose prose-sm text-foreground">
                    {transcriptData
                      .filter((item) => item.speaker === "You")
                      .map((item) => item.text)
                      .join(" ")}
                  </div>
                </TabsContent>

                <TabsContent value="speakers" className="flex-1 overflow-y-auto mt-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">You (5 responses)</h4>
                      <div className="space-y-2">
                        {transcriptData
                          .filter((item) => item.speaker === "You")
                          .map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {item.text}
                            </p>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Interviewer (2 questions)</h4>
                      <div className="space-y-2">
                        {transcriptData
                          .filter((item) => item.speaker === "Interviewer")
                          .map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {item.text}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
