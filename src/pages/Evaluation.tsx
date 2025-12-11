import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  Share2,
  Save,
  Star,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const competencies = [
  {
    id: "technical",
    name: "Technical Ability",
    rating: 4,
    description: "Demonstrated strong technical knowledge",
    comment: "",
  },
  {
    id: "communication",
    name: "Communication",
    rating: 4.5,
    description: "Clear and articulate responses",
    comment: "",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    rating: 3.5,
    description: "Structured approach to challenges",
    comment: "",
  },
  {
    id: "confidence",
    name: "Confidence",
    rating: 4,
    description: "Composed and assured demeanor",
    comment: "",
  },
  {
    id: "cultural-fit",
    name: "Cultural Fit",
    rating: 4.5,
    description: "Values align with company culture",
    comment: "",
  },
];

const strengths = [
  "Strong use of the STAR method in behavioral questions",
  "Clear articulation of technical concepts",
  "Good examples from past experience",
  "Maintained composure throughout the interview",
];

const improvements = [
  "Could provide more specific metrics and numbers",
  "Consider asking more clarifying questions",
  "Practice system design explanations",
];

const nextSteps = [
  "Review system design fundamentals",
  "Practice explaining complex concepts simply",
  "Prepare more quantifiable achievements",
];

export default function Evaluation() {
  const [ratings, setRatings] = useState(
    competencies.reduce((acc, c) => ({ ...acc, [c.id]: c.rating }), {} as Record<string, number>)
  );
  const [comments, setComments] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(["competencies"]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const overallRating = (
    Object.values(ratings).reduce((sum, r) => sum + r, 0) / Object.keys(ratings).length
  ).toFixed(1);

  const handleSave = () => {
    toast({
      title: "Evaluation saved",
      description: "Your feedback has been saved successfully.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: "Your evaluation report is being generated.",
    });
  };

  const renderStars = (rating: number, competencyId: string) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRatings((prev) => ({ ...prev, [competencyId]: star }))}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                "w-5 h-5 transition-colors",
                star <= ratings[competencyId]
                  ? "fill-warning text-warning"
                  : "text-muted-foreground/30 hover:text-warning/50"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Evaluation Sheet</h1>
            <p className="text-muted-foreground">
              Senior Software Engineer - Google • Jan 15, 2024
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="p-6 rounded-2xl gradient-bg text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80 mb-1">
                Overall Performance
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{overallRating}</span>
                <span className="text-lg text-primary-foreground/80">/ 5.0</span>
              </div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-8 h-8",
                    star <= Math.round(parseFloat(overallRating))
                      ? "fill-primary-foreground text-primary-foreground"
                      : "text-primary-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
          <Progress
            value={(parseFloat(overallRating) / 5) * 100}
            className="h-2 mt-4 bg-primary-foreground/20"
          />
        </div>

        {/* Competencies Section */}
        <section className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <button
            onClick={() => toggleSection("competencies")}
            className="w-full p-5 flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-foreground">Competency Ratings</h2>
                <p className="text-sm text-muted-foreground">
                  Rate each competency from 1-5 stars
                </p>
              </div>
            </div>
            {expandedSections.includes("competencies") ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          {expandedSections.includes("competencies") && (
            <div className="p-5 pt-0 space-y-4">
              {competencies.map((competency) => (
                <div
                  key={competency.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{competency.name}</h3>
                      <p className="text-sm text-muted-foreground">{competency.description}</p>
                    </div>
                    {renderStars(ratings[competency.id], competency.id)}
                  </div>
                  <Textarea
                    placeholder="Add notes for this competency..."
                    value={comments[competency.id] || ""}
                    onChange={(e) =>
                      setComments((prev) => ({ ...prev, [competency.id]: e.target.value }))
                    }
                    className="mt-3 min-h-[60px] text-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* AI Insights Section */}
        <section className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <button
            onClick={() => toggleSection("insights")}
            className="w-full p-5 flex items-center justify-between hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-success" />
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-foreground">AI-Generated Insights</h2>
                <p className="text-sm text-muted-foreground">
                  Automated analysis of your performance
                </p>
              </div>
            </div>
            {expandedSections.includes("insights") ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          {expandedSections.includes("insights") && (
            <div className="p-5 pt-0 grid md:grid-cols-3 gap-4">
              {/* Strengths */}
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <h3 className="font-medium text-success">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <h3 className="font-medium text-warning">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {improvements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-4 h-4 rounded-full bg-warning/20 text-warning text-xs flex items-center justify-center mt-0.5 shrink-0">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <h3 className="font-medium text-primary">Recommended Next Steps</h3>
                </div>
                <ul className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5 shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="hero" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Evaluation
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
