import { useRef, useEffect, useState } from "react";
import { TopicSidebar } from "@/components/TopicSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LevelSelector } from "@/components/LevelSelector";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useChatbot } from "@/hooks/useChatbot";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { messages, isLoading, level, setLevel, sendMessage, handleTopicSelect } = useChatbot();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    handleTopicSelect(topic);
    setSidebarOpen(false);
  };

  const suggestions =
    messages.length > 0
      ? ["Show me the code", "Explain with dry run", "Compare complexity", "Give me a quiz"]
      : undefined;

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <TopicSidebar onTopicSelect={onTopicSelect} selectedTopic={selectedTopic} />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">DSA Mentor</h1>
              <p className="text-xs text-muted-foreground">
                {selectedTopic ? `Exploring: ${selectedTopic}` : "Ask anything about DSA"}
              </p>
            </div>
          </div>

          <LevelSelector currentLevel={level} onLevelChange={setLevel} />
        </header>

        {/* Messages Area */}
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={sendMessage} />
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} suggestions={suggestions} />
      </main>
    </div>
  );
};

export default Index;
