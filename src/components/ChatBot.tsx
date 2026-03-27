import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MessageSquare, X, Send, Loader2, Minimize2, Maximize2, Package, Calculator, BarChart3, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

const QUICK_ACTIONS = [
  { id: "track", label: "Track Shipment", icon: Package, prompt: "I want to track my shipment. What information do you need?" },
  { id: "calc", label: "Shipping Calculator", icon: Calculator, prompt: "How do I calculate shipping costs for my business?" },
  { id: "wms", label: "WareSync WMS", icon: BarChart3, prompt: "Tell me more about WareSync WMS and how it can help my warehouse." },
  { id: "support", label: "Contact Support", icon: HelpCircle, prompt: "I need to speak with a human. How can I contact Sendit support?" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I'm your **Sendit** Assistant. How can I help you optimize your logistics today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const MESSAGE_COOLDOWN = 2000; // 2 seconds between messages

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_COOLDOWN) {
      const remaining = Math.ceil((MESSAGE_COOLDOWN - (now - lastMessageTime)) / 1000);
      setMessages(prev => [...prev, { role: "model", text: `Slow down! Please wait ${remaining} more second(s).` }]);
      return;
    }
    setLastMessageTime(now);

    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    const userMessage = text.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key missing. Please connect your Gemini API key.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a professional logistics expert for 'Sendit'. Help users with shipping, WMS (WareSync), and fulfillment. Be concise, technical yet approachable. Direct support queries to hello@sendit.co.in.",
        },
      });

      const streamResponse = await chat.sendMessageStream({ message: userMessage });
      
      let botResponse = "";
      setMessages(prev => [...prev, { role: "model", text: "" }]);

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || "";
        botResponse += chunkText;
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "model", text: botResponse };
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setMessages(prev => [...prev, { role: "model", text: `Error: ${errorMessage}. Please try again.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`bg-white border border-brand-secondary/10 rounded-2xl overflow-hidden mb-4 flex flex-col transition-all duration-300 ${
              isMinimized ? "h-14 w-64" : "h-[520px] w-[340px] md:w-[380px] max-h-[calc(100vh-120px)]"
            }`}
          >
            {/* Header */}
            <div className="bg-brand-dark p-3 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs tracking-tight"><span className="text-brand-primary">Sendit</span> Logistics AI</p>
                  {!isMinimized && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                      <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Expert Online</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-brand-secondary/5 scrollbar-thin scrollbar-thumb-brand-secondary/20">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[90%] p-3 rounded-xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-brand-primary text-white rounded-tr-none"
                            : "bg-white border border-brand-secondary/10 text-brand-dark rounded-tl-none"
                        }`}
                      >
                        <div className="prose prose-sm max-w-none prose-p:my-0 prose-headings:text-brand-dark prose-a:text-brand-primary">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-brand-dark/60 mt-1 px-1">
                        {msg.role === "user" ? "You" : "Assistant"}
                      </span>
                    </div>
                  ))}

                  {/* Quick Actions - Only show at start or when requested */}
                  {messages.length === 1 && !isLoading && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      <p className="text-[11px] font-semibold text-brand-accent/40 uppercase tracking-wider mb-1">Quick Actions</p>
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleSend(action.prompt)}
                          className="flex items-center justify-between p-3 bg-white border border-brand-secondary/10 rounded-xl hover:border-brand-primary hover:bg-brand-primary/5 transition-all group text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-secondary/5 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                              <action.icon className="w-4 h-4 text-brand-dark/70 group-hover:text-brand-primary" />
                            </div>
                            <span className="text-sm font-medium text-brand-dark group-hover:text-brand-primary">{action.label}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-brand-dark/20 group-hover:text-brand-primary transform translate-x-0 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {isLoading && messages[messages.length - 1].role === "user" && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-brand-secondary/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-brand-secondary/10">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend(input);
                    }} 
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full pl-3 pr-10 py-2.5 bg-brand-secondary/5 border border-brand-secondary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1.5 p-1.5 bg-brand-dark text-white rounded-md hover:bg-brand-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    </button>
                  </form>
                  <p className="text-[9px] text-center text-brand-accent/40 mt-2">
                    Powered by <span className="text-brand-primary font-bold">Sendit</span> AI • Concisely expert logistics support
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
          isOpen 
            ? "bg-white text-brand-dark border border-brand-secondary/10 rotate-0" 
            : "bg-brand-dark text-white hover:bg-brand-primary -rotate-12 hover:rotate-0"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-accent border-2 border-brand-dark rounded-full animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;

