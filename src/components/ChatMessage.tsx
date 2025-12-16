import { CodeBlock } from "./CodeBlock";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  codeBlocks?: { language: string; code: string }[];
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Parse markdown-style formatting
  const formatContent = (content: string) => {
    // Split by code blocks first
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.split("\n");
        const language = lines[0].replace("```", "").trim() || "code";
        const code = lines.slice(1, -1).join("\n");
        return <CodeBlock key={index} language={language} code={code} />;
      }
      
      // Format remaining text
      return (
        <div key={index} className="prose prose-invert prose-sm max-w-none">
          {part.split("\n").map((line, lineIndex) => {
            // Headers
            if (line.startsWith("## ")) {
              return (
                <h3 key={lineIndex} className="text-primary font-semibold text-base mt-4 mb-2">
                  {line.replace("## ", "")}
                </h3>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h4 key={lineIndex} className="text-foreground font-medium text-sm mt-3 mb-1">
                  {line.replace("### ", "")}
                </h4>
              );
            }
            
            // Tables
            if (line.includes("|") && line.trim().startsWith("|")) {
              const cells = line.split("|").filter(Boolean).map((cell) => cell.trim());
              const isHeader = parts[index].split("\n")[lineIndex + 1]?.includes("---");
              const isSeparator = line.includes("---");
              
              if (isSeparator) return null;
              
              return (
                <div key={lineIndex} className="flex gap-2 text-xs py-1">
                  {cells.map((cell, cellIndex) => (
                    <span
                      key={cellIndex}
                      className={cn(
                        "flex-1 px-2 py-1 rounded",
                        isHeader ? "bg-muted font-semibold" : "bg-card"
                      )}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              );
            }
            
            // Bold text with **
            let formattedLine = line;
            const boldRegex = /\*\*(.*?)\*\*/g;
            const segments: (string | JSX.Element)[] = [];
            let lastIndex = 0;
            let match;
            
            while ((match = boldRegex.exec(line)) !== null) {
              if (match.index > lastIndex) {
                segments.push(line.slice(lastIndex, match.index));
              }
              segments.push(
                <strong key={match.index} className="text-primary font-semibold">
                  {match[1]}
                </strong>
              );
              lastIndex = match.index + match[0].length;
            }
            if (lastIndex < line.length) {
              segments.push(line.slice(lastIndex));
            }
            
            if (line.trim() === "") return <br key={lineIndex} />;
            
            return (
              <p key={lineIndex} className="text-sm leading-relaxed my-1">
                {segments.length > 0 ? segments : line}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] p-4",
          isUser ? "chat-message-user" : "chat-message-bot"
        )}
      >
        {formatContent(message.content)}
        
        {message.codeBlocks?.map((block, index) => (
          <CodeBlock key={index} language={block.language} code={block.code} />
        ))}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
