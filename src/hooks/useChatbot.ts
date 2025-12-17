import { useState } from "react";
import { Message } from "@/components/ChatMessage";

interface UseChatbot {
  messages: Message[];
  isLoading: boolean;
  level: string;
  setLevel: (level: string) => void;
  sendMessage: (message: string) => void;
  handleTopicSelect: (topic: string) => void;
}

export function useChatbot(): UseChatbot {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState("Beginner");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Call your backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          level,
          topic: selectedTopic
        })
      });

      const data = await response.json();

      // 3. Add AI response to chat
      const botMsg: Message = {
        id: Date.now().toString() + "_bot",
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI error:", error);

      const errorMsg: Message = {
        id: Date.now().toString() + "_error",
        role: "assistant",
        content: "Something went wrong while contacting the AI service.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    level,
    setLevel,
    sendMessage,
    handleTopicSelect
  };
}
