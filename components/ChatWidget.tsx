import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Terminal } from 'lucide-react';
import { generateTacticalResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Tactical Assistant Online. Requesting intel?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await generateTacticalResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection disrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-16 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-[#0F1923]/95 border border-[#ECE8E1]/20 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] clip-corner-top-right flex flex-col h-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-[#ECE8E1]/10 bg-[#FF4655]/10">
            <div className="flex items-center gap-2 text-[#FF4655] font-header tracking-widest text-sm">
              <Terminal size={14} />
              TACTICAL COMMS
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#ECE8E1]/50 hover:text-white">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 text-sm font-mono">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2 ${
                  m.role === 'user' 
                    ? 'bg-[#FF4655]/20 border border-[#FF4655]/50 text-[#FF4655] text-right' 
                    : 'bg-[#ECE8E1]/10 border border-[#ECE8E1]/30 text-[#ECE8E1]'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[#ECE8E1]/40 text-xs animate-pulse">Computing tactical solution...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#ECE8E1]/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter command..."
              className="flex-grow bg-transparent border border-[#ECE8E1]/20 p-2 text-white text-sm focus:border-[#FF4655] focus:outline-none placeholder-[#ECE8E1]/20"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-[#FF4655] p-2 text-white hover:bg-[#D93542] disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <span className="bg-[#0F1923] text-[#ECE8E1] px-3 py-1 text-xs uppercase tracking-widest border border-[#ECE8E1]/20 opacity-0 group-hover:opacity-100 transition-opacity">
          Tactical Assist
        </span>
        <div className="w-12 h-12 bg-[#FF4655] flex items-center justify-center text-white shadow-lg hover:bg-[#D93542] transition-colors clip-corner cursor-pointer">
          <MessageSquare size={20} />
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;