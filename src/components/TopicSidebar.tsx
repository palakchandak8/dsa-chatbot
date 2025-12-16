import { useState } from "react";
import { dsaTopics, DSATopic } from "@/data/dsaTopics";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicSidebarProps {
  onTopicSelect: (topic: string) => void;
  selectedTopic: string | null;
}

export function TopicSidebar({ onTopicSelect, selectedTopic }: TopicSidebarProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleExpand = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <aside className="w-64 bg-[hsl(var(--sidebar-bg))] border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-sm">DSA Topics</h2>
            <p className="text-xs text-muted-foreground">Explore & Learn</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
        {dsaTopics.map((topic) => (
          <div key={topic.id} className="animate-slide-in">
            <button
              onClick={() => {
                onTopicSelect(topic.name);
                if (topic.subtopics) toggleExpand(topic.id);
              }}
              className={cn(
                "w-full topic-item flex items-center justify-between group",
                selectedTopic === topic.name && "active"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{topic.icon}</span>
                <span className="text-sm font-medium">{topic.name}</span>
              </span>
              {topic.subtopics && (
                <ChevronRight
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    expandedTopics.has(topic.id) && "rotate-90"
                  )}
                />
              )}
            </button>

            {topic.subtopics && expandedTopics.has(topic.id) && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                {topic.subtopics.map((subtopic) => (
                  <button
                    key={subtopic}
                    onClick={() => onTopicSelect(subtopic)}
                    className={cn(
                      "w-full text-left text-xs py-1.5 px-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                      selectedTopic === subtopic && "text-primary bg-primary/10"
                    )}
                  >
                    {subtopic}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            💡 Tip: Ask me anything about DSA!
          </p>
        <div className="text-sm text-muted-foreground mt-6">
          Built by{" "}
          <a
            href="https://github.com/palakchandak8"
            target="_blank"
            className="underline"
          >
            Palak Chandak
          </a>
          {" · "}
          <a href="mailto:palak.chandak@somaiya.edu" className="underline">
            Contact
          </a>
        </div>

        </div>
      </div>
    </aside>
  );
}
