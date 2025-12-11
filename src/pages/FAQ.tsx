import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    name: "Getting Started",
    questions: [
      {
        q: "How do I create my first mock interview?",
        a: "Click on 'New Mock Interview' from your dashboard, fill in the details like role and company, choose your interview type, and click 'Start Mock Interview'. You'll be guided through the device setup before the interview begins.",
      },
      {
        q: "What equipment do I need?",
        a: "You need a computer with a webcam and microphone. We recommend using a quiet environment with good lighting for the best experience. Chrome or Firefox browsers work best.",
      },
      {
        q: "Is my data secure?",
        a: "Yes, all your recordings and data are encrypted and stored securely. We never share your information with third parties. You can delete your data at any time from your profile settings.",
      },
    ],
  },
  {
    name: "Recording & Transcripts",
    questions: [
      {
        q: "How does the transcription work?",
        a: "Our AI automatically transcribes your interview in real-time as you speak. After the interview, you can review, edit, and export the transcript in multiple formats.",
      },
      {
        q: "Can I practice without recording?",
        a: "Yes! Choose 'Practice Mode' when creating a new mock interview. This mode lets you practice without saving any recordings while still providing real-time feedback.",
      },
      {
        q: "What video formats are supported for export?",
        a: "You can export your recordings in MP4 format. Transcripts can be exported as TXT, SRT (for subtitles), or PDF documents.",
      },
    ],
  },
  {
    name: "Evaluation & Feedback",
    questions: [
      {
        q: "How is my performance evaluated?",
        a: "Our AI analyzes multiple aspects of your interview including technical accuracy, communication clarity, problem-solving approach, confidence, and cultural fit. You receive detailed scores and actionable feedback.",
      },
      {
        q: "Can I edit the evaluation ratings?",
        a: "Yes, you can adjust the ratings and add your own notes to each competency. This is useful for self-reflection and tracking your personal assessment alongside the AI feedback.",
      },
      {
        q: "How do I track my progress over time?",
        a: "Use the 'Compare' feature to see side-by-side comparisons of your interviews. The dashboard also shows your overall trends and improvement areas.",
      },
    ],
  },
  {
    name: "Billing & Plans",
    questions: [
      {
        q: "What's included in the free plan?",
        a: "The free plan includes 3 mock interviews per month, basic transcription, and standard evaluation features. Upgrade to Pro for unlimited interviews and advanced analytics.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel your subscription at any time from the Billing page. Your access will continue until the end of your current billing period.",
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 14-day money-back guarantee for new subscriptions. Contact our support team if you're not satisfied with your purchase.",
      },
    ],
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
    );
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about MockMaster
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-lg font-semibold text-foreground mb-4">{category.name}</h2>
                <div className="space-y-3">
                  {category.questions.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-xl bg-card border border-border shadow-card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.q)}
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">{item.q}</span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-muted-foreground shrink-0 transition-transform",
                            expandedQuestions.includes(item.q) && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedQuestions.includes(item.q) && (
                        <div className="px-5 pb-5">
                          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No questions found matching "{searchQuery}"</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you 24/7
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
