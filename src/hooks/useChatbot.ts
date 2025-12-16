import { useState, useCallback } from "react";
import { Message } from "@/components/ChatMessage";
import { ExplanationLevel } from "@/data/dsaTopics";
import { getExplanation, getQuickResponse } from "@/data/dsaExplanations";

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState<ExplanationLevel>("beginner");

  const generateResponse = useCallback(
    (query: string): { content: string; codeBlocks?: { language: string; code: string }[] } => {
      const q = query.toLowerCase();

      // Check for quick responses first
      const quickResponse = getQuickResponse(query);
      if (quickResponse) {
        return { content: quickResponse };
      }

      // Check for topic explanations
      const topics = ["stack", "queue", "binary search", "binary-search"];
      for (const topic of topics) {
        if (q.includes(topic) && (q.includes("explain") || q.includes("what is") || q.includes("tell me"))) {
          const explanation = getExplanation(topic, level);
          if (explanation) {
            let content = `## ${topic.charAt(0).toUpperCase() + topic.slice(1)} (${level.charAt(0).toUpperCase() + level.slice(1)} Level)\n\n`;
            content += `### 📖 Definition\n${explanation.definition}\n\n`;
            content += `### 💡 Analogy\n${explanation.analogy}\n\n`;
            content += `### ⚙️ Operations\n${explanation.operations.map(op => `• ${op}`).join("\n")}\n\n`;
            content += `### ⏱️ Complexity\n• Time: ${explanation.complexity.time}\n• Space: ${explanation.complexity.space}\n\n`;
            content += `### 📝 Example\n${explanation.example}`;

            return {
              content,
              codeBlocks: explanation.code,
            };
          }
        }
      }

      // Quiz mode
      if (q.includes("quiz") || q.includes("mcq")) {
        const topic = q.includes("stack") ? "Stack" : q.includes("queue") ? "Queue" : "DSA";
        return {
          content: `## ${topic} Quiz 📝\n\n**Q1.** What does LIFO stand for?\na) Last In First Out\nb) Last In Forward Out\nc) Left In First Out\nd) Last Input First Output\n\n**Q2.** Which operation adds an element to a stack?\na) Enqueue\nb) Push\nc) Insert\nd) Append\n\n**Q3.** Time complexity of push operation is:\na) O(n)\nb) O(log n)\nc) O(1)\nd) O(n²)\n\n**Q4.** Which application uses stack?\na) BFS\nb) Print Queue\nc) Undo/Redo\nd) Task Scheduling\n\n**Q5.** What happens on pop() when stack is empty?\na) Returns null\nb) Underflow error\nc) Returns 0\nd) Nothing\n\n---\n💡 **Answers:** 1-a, 2-b, 3-c, 4-c, 5-b`,
        };
      }

      // Default response for unrecognized queries
      const defaultResponses = [
        `I can help you understand **${query}**! Try asking:\n\n• "Explain [topic] like I'm a beginner"\n• "What's the difference between X and Y?"\n• "Show me code for [algorithm]"\n• "Give me quiz questions on [topic]"`,
        `Great question about **${query}**! 🎯\n\nSelect a topic from the sidebar or ask me to:\n• Explain any DSA concept\n• Compare data structures\n• Show code with dry runs\n• Quiz you on topics`,
      ];

      return {
        content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      };
    },
    [level]
  );

  const sendMessage = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate AI thinking delay
      setTimeout(() => {
        const response = generateResponse(content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.content,
          codeBlocks: response.codeBlocks,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 800 + Math.random() * 700);
    },
    [generateResponse]
  );

  const handleTopicSelect = useCallback(
    (topic: string) => {
      sendMessage(`Explain ${topic}`);
    },
    [sendMessage]
  );

  return {
    messages,
    isLoading,
    level,
    setLevel,
    sendMessage,
    handleTopicSelect,
  };
}
