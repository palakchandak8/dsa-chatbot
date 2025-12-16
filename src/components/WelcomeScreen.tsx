import { Code2, BookOpen, Zap, Brain } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Concept Explanations",
      description: "From basics to advanced with real examples",
    },
    {
      icon: Code2,
      title: "Code & Dry Runs",
      description: "Step-by-step code walkthroughs",
    },
    {
      icon: Zap,
      title: "Time Complexity",
      description: "Understand Big O notation clearly",
    },
    {
      icon: Brain,
      title: "Adaptive Levels",
      description: "Beginner, Intermediate, or Advanced",
    },
  ];

  const suggestions = [
    "Explain Stack with an example",
    "Difference between Stack and Queue",
    "Why is Quick Sort faster?",
    "Explain Binary Search with dry run",
    "What is Dynamic Programming?",
    "Give me 5 MCQs on arrays",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            DSA <span className="text-primary glow-text">Mentor</span>
          </h1>
          <p className="text-muted-foreground">
            Your personal Data Structures & Algorithms tutor. Ask anything!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-left group"
            >
              <feature.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-foreground text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-all border border-transparent hover:border-primary/30"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
