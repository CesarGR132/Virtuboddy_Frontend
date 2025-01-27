import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { error } from "console";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const getMessage = async (text: string) => {
    try {
      const response = await fetch('http://localhost:3000/chat-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text
        }),
      });
  
      const contentType = response.headers.get('Content-Type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
  
        if (response.ok) {
          return data.message;
        } else {
          return { message: data.message || 'An error occurred' };
        }
      } else {
        const text = await response.text();
        return { message: text || 'An error occurred' };
      }
    } catch (error) {
      console.error(error);
      return { message: 'An error occurred' };
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

  // Add user message
  setMessages((prev) => [...prev, { text: input, isUser: true }]);

  // Clear input
  setInput('');

  // Fetch bot response
  getMessage(input).then((response) => {
    setMessages((prev) => [...prev, { text: response.message, isUser: false }]);
  });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="p-3 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
            <span className="font-semibold">Chat Assistant</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/90"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                )}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
