import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Minus, BarChart3, Star, Clock, FileText } from "lucide-react";
import { useState } from "react";

const comparisonData = [
  {
    id: "1",
    title: "Senior SWE - Google",
    date: "Jan 15",
    ratings: { technical: 4.5, communication: 4.0, problemSolving: 4.2, confidence: 3.8, culturalFit: 4.0 },
    transcriptLength: 1250,
    duration: 45,
    overallScore: 4.1,
  },
  {
    id: "2",
    title: "Product Manager - Meta",
    date: "Jan 12",
    ratings: { technical: 3.5, communication: 4.5, problemSolving: 4.0, confidence: 4.2, culturalFit: 4.5 },
    transcriptLength: 980,
    duration: 30,
    overallScore: 4.1,
  },
];

const competencies = [
  { key: "technical", label: "Technical" },
  { key: "communication", label: "Communication" },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "confidence", label: "Confidence" },
  { key: "culturalFit", label: "Cultural Fit" },
];

export default function Compare() {
  const [session1, setSession1] = useState(comparisonData[0]);
  const [session2, setSession2] = useState(comparisonData[1]);

  const getTrendIcon = (val1: number, val2: number) => {
    const diff = val1 - val2;
    if (diff > 0.3) return <TrendingUp className="w-4 h-4 text-success" />;
    if (diff < -0.3) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getBarWidth = (value: number, max = 5) => `${(value / max) * 100}%`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compare Sessions</h1>
          <p className="text-muted-foreground">
            Analyze your progress across different mock interviews
          </p>
        </div>

        {/* Session Selectors */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border shadow-card">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Session 1
            </label>
            <Select
              value={session1.id}
              onValueChange={(id) => setSession1(comparisonData.find((s) => s.id === id) || comparisonData[0])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {comparisonData.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.title} ({session.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border shadow-card">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Session 2
            </label>
            <Select
              value={session2.id}
              onValueChange={(id) => setSession2(comparisonData.find((s) => s.id === id) || comparisonData[1])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {comparisonData.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.title} ({session.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overall Scores */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl gradient-bg text-primary-foreground">
            <p className="text-sm font-medium text-primary-foreground/80 mb-1">{session1.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{session1.overallScore.toFixed(1)}</span>
              <span className="text-primary-foreground/80">/ 5.0</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(session1.overallScore)
                      ? "fill-primary-foreground text-primary-foreground"
                      : "text-primary-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border-2 border-primary/20">
            <p className="text-sm font-medium text-muted-foreground mb-1">{session2.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{session2.overallScore.toFixed(1)}</span>
              <span className="text-muted-foreground">/ 5.0</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(session2.overallScore)
                      ? "fill-warning text-warning"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Competency Comparison */}
        <div className="p-6 rounded-xl bg-card border border-border shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Competency Comparison
          </h2>
          <div className="space-y-6">
            {competencies.map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(
                      session1.ratings[key as keyof typeof session1.ratings],
                      session2.ratings[key as keyof typeof session2.ratings]
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg rounded-full transition-all duration-500"
                        style={{ width: getBarWidth(session1.ratings[key as keyof typeof session1.ratings]) }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Session 1</span>
                      <span className="font-medium">{session1.ratings[key as keyof typeof session1.ratings]}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warning rounded-full transition-all duration-500"
                        style={{ width: getBarWidth(session2.ratings[key as keyof typeof session2.ratings]) }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Session 2</span>
                      <span className="font-medium">{session2.ratings[key as keyof typeof session2.ratings]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  {session1.duration} min vs {session2.duration} min
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transcript Length</p>
                <p className="text-lg font-semibold text-foreground">
                  {session1.transcriptLength} vs {session2.transcriptLength} words
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
