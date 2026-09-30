import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  Trash2, 
  ChevronDown, 
  MessageSquare,
  HelpCircle,
  Code2,
  Brain,
  Building2,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { ChatMessage } from '../types';

export const ChatbotWidget: React.FC = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        role: 'model',
        content: `👋 Hello${currentUser ? ` ${currentUser.fullName.split(' ')[0]}` : ''}! I am your **PIP AI Placement Mentor**, powered by Google Gemini.
        
I can assist you with:
- 💻 **Technical Concepts & Coding**: DSA, Java, Python, C++, DBMS, OS, Computer Networks.
- 🎯 **Company Test Blueprints**: TCS NQT, Infosys SP/DSE, Accenture, Wipro, Cognizant patterns.
- ⭐ **HR Behavioral Answers**: Perfecting your responses using the **STAR** method.
- 🧠 **Aptitude Shortcuts**: Quantitative tricks, logical reasoning, and verbal tips.

What would you like to practice or learn today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('open-pip-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-pip-chatbot', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const replyText = await ApiService.sendChatMessage(
        historyPayload,
        currentUser?.preferredJobRole,
        currentUser?.branch
      );

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        role: 'model',
        content: "I encountered a temporary connection issue. Please try asking your question again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-reset',
        role: 'model',
        content: `Chat history cleared. I am ready for your next placement question! What would you like to prepare?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const presetPrompts = [
    { label: '🎯 TCS NQT Strategy', prompt: 'How do I prepare for the TCS NQT cognitive, technical, and coding rounds?' },
    { label: '⭐ STAR Method for HR', prompt: 'Explain the STAR method with a sample answer for "Why should we hire you?"' },
    { label: '🗄️ DBMS Indexing & ACID', prompt: 'Explain ACID properties and why B+ Trees are used for indexing in databases.' },
    { label: '💻 Top 5 Placement DSA Patterns', prompt: 'What are the top 5 high-frequency DSA patterns asked in campus placements?' },
    { label: '🧠 Time & Work Shortcut', prompt: 'Give me a shortcut trick to solve Time and Work aptitude problems quickly.' },
  ];

  // Simple Markdown text renderer with bold, headers, code, bullet lists
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-sm sm:text-base text-slate-900 dark:text-white pt-1">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-extrabold text-base text-slate-900 dark:text-white pt-1">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemContent = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-500 font-bold shrink-0">•</span>
                <span>{renderInlineMarkdown(itemContent)}</span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(trimmed)) {
            const match = trimmed.match(/^(\d+\.)\s(.*)/);
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">{match?.[1]}</span>
                <span>{renderInlineMarkdown(match?.[2] || '')}</span>
              </div>
            );
          }
          if (trimmed.startsWith('```')) {
            return null; // Simplified code block handling
          }
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{renderInlineMarkdown(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text: string) => {
    // Basic bold parsing
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200"
            title="Open PIP AI Placement Mentor Chatbot"
          >
            <div className="relative">
              <div className="p-1.5 rounded-full bg-white/20">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-700" />
            </div>

            <div className="flex flex-col text-left leading-tight">
              <span className="font-extrabold tracking-tight">PIP AI Mentor</span>
              <span className="text-[10px] text-indigo-200 font-medium">Ask Placement Questions</span>
            </div>

            {hasUnread && (
              <span className="absolute -top-1.5 -left-1.5 px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-rose-500 text-white shadow-md animate-bounce">
                AI Online
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          className={`fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] transition-all duration-200 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white flex items-center justify-between gap-3 shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-none">
                    PIP AI Placement Mentor
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-indigo-200/90 mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Google Gemini 3.8 AI</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message Thread Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/50 dark:bg-slate-950/40">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${
                          isUser
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="text-xs sm:text-sm font-medium whitespace-pre-wrap">{m.content}</p>
                        ) : (
                          renderFormattedContent(m.content)
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                      <span>PIP Mentor is analyzing and drafting response...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              {messages.length <= 2 && (
                <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto">
                  <div className="flex items-center gap-1.5 min-w-max">
                    {presetPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(p.prompt)}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 text-[11px] font-semibold text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Footer */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about coding, DBMS, TCS NQT, STAR answers..."
                    disabled={isLoading}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold disabled:opacity-50 transition-colors shrink-0 shadow-md shadow-indigo-500/20"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Powered by Google Gemini API</span>
                  <span className="font-mono text-[9px] text-indigo-500/80">generativelanguage.googleapis.com</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
