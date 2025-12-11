import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Video,
  Mic,
  MicOff,
  Play,
  Save,
  X,
  FileText,
  Clock,
  Briefcase,
  Building2,
  Layers,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const roles = [
  "Software Engineer",
  "Senior Software Engineer",
  "Staff Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "DevOps Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
];

const interviewTypes = [
  { value: "behavioral", label: "Behavioral", description: "STAR method questions" },
  { value: "technical", label: "Technical", description: "Coding & system design" },
  { value: "system-design", label: "System Design", description: "Architecture focused" },
  { value: "mixed", label: "Mixed", description: "Combination of all types" },
];

const recordingModes = [
  { value: "video-audio", label: "Video + Audio", icon: Video },
  { value: "audio-only", label: "Audio Only", icon: Mic },
  { value: "practice", label: "Practice Mode", icon: MicOff },
];

const templates = [
  { id: "1", name: "FAANG Behavioral", company: "General", questions: 12 },
  { id: "2", name: "Google SWE", company: "Google", questions: 8 },
  { id: "3", name: "Amazon Leadership", company: "Amazon", questions: 14 },
  { id: "4", name: "Meta Product Sense", company: "Meta", questions: 10 },
];

export default function NewMock() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [interviewType, setInterviewType] = useState("behavioral");
  const [difficulty, setDifficulty] = useState("medium");
  const [duration, setDuration] = useState([30]);
  const [recordingMode, setRecordingMode] = useState("video-audio");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartMock = () => {
    if (!role) {
      toast({
        title: "Role required",
        description: "Please select a role to continue.",
        variant: "destructive",
      });
      return;
    }

    if (duration[0] < 5) {
      toast({
        title: "Duration too short",
        description: "Please select a duration of at least 5 minutes.",
        variant: "destructive",
      });
      return;
    }

    navigate("/interview/new/device-test");
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "You can continue this mock interview later.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">New Mock Interview</h1>
          <p className="text-muted-foreground">
            Configure your mock interview settings and get started
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Info */}
          <section className="p-6 rounded-xl bg-card border border-border shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Basic Information
            </h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Mock Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="e.g., Google SWE Practice #1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role Applying For *</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="e.g., Google, Amazon..."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interview Type */}
          <section className="p-6 rounded-xl bg-card border border-border shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Interview Type
            </h2>
            <RadioGroup
              value={interviewType}
              onValueChange={setInterviewType}
              className="grid sm:grid-cols-2 gap-3"
            >
              {interviewTypes.map((type) => (
                <Label
                  key={type.value}
                  htmlFor={type.value}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    interviewType === type.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value={type.value} id={type.value} />
                  <div>
                    <p className="font-medium text-foreground">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </section>

          {/* Difficulty & Duration */}
          <section className="p-6 rounded-xl bg-card border border-border shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary" />
              Difficulty & Duration
            </h2>
            <div className="grid gap-6">
              <div className="space-y-3">
                <Label>Difficulty Level</Label>
                <div className="flex gap-3">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={cn(
                        "flex-1 py-3 rounded-lg font-medium text-sm capitalize transition-all",
                        difficulty === level
                          ? level === "easy"
                            ? "bg-success/10 text-success border-2 border-success"
                            : level === "medium"
                            ? "bg-warning/10 text-warning border-2 border-warning"
                            : "bg-destructive/10 text-destructive border-2 border-destructive"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Duration</Label>
                  <span className="text-sm font-medium text-primary">
                    {duration[0]} minutes
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={5}
                    max={90}
                    step={5}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Recording Mode */}
          <section className="p-6 rounded-xl bg-card border border-border shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Recording Mode
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {recordingModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setRecordingMode(mode.value)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-center transition-all",
                    recordingMode === mode.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <mode.icon
                    className={cn(
                      "w-6 h-6 mx-auto mb-2",
                      recordingMode === mode.value ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <p className="font-medium text-foreground">{mode.label}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Template Selector */}
          <section className="p-6 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Use Template (optional)
              </h2>
              <Button variant="outline" size="sm" onClick={() => setTemplateDialogOpen(true)}>
                Browse Templates
              </Button>
            </div>
            {selectedTemplate ? (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {templates.find((t) => t.id === selectedTemplate)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {templates.find((t) => t.id === selectedTemplate)?.questions} questions
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No template selected. Questions will be generated based on your settings.
              </p>
            )}
          </section>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="hero" onClick={handleStartMock}>
                <Play className="w-4 h-4 mr-2" />
                Start Mock Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Select a Template</DialogTitle>
            <DialogDescription>
              Choose a pre-built template or create your own question set.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setTemplateDialogOpen(false);
                }}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all",
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.company}</p>
                  </div>
                  <span className="text-sm text-primary font-medium">
                    {template.questions} questions
                  </span>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
