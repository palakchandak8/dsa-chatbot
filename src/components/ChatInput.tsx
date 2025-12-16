import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
}

export function ChatInput({ onSend, isLoading, suggestions }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSend(suggestion)}
              className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors border border-border hover:border-primary/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about DSA..."
            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none min-h-[48px] max-h-[150px] scrollbar-thin"
            rows={1}
            disabled={isLoading}
          />
          <div className="absolute right-3 bottom-3">
            <Sparkles className="w-4 h-4 text-muted-foreground/50" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="h-12 w-12 rounded-xl"
          variant={input.trim() ? "glow" : "secondary"}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
