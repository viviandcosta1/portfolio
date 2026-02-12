"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { experiences, education, projects, technologies } from "../constants";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi! I'm Vivian's AI assistant. Ask me anything about his skills, projects, or work experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getBotResponse = (query: string) => {
        const q = query.toLowerCase();

        if (q.includes("hello") || q.includes("hi")) {
            return "Hello! How can I help you today?";
        }
        if (q.includes("skill") || q.includes("tech") || q.includes("language")) {
            const techs = technologies.map(t => t.name).join(", ");
            return `Vivian is proficient in: ${techs}. He specializes in AI/ML and Web Development.`;
        }
        if (q.includes("project")) {
            const projs = projects.map(p => p.name).join(", ");
            return `Vivian has worked on several cool projects like: ${projs}. Which one would you like to hear more about?`;
        }
        if (q.includes("education") || q.includes("study") || q.includes("college")) {
            const edu = education[0];
            return `Vivian is pursuing a ${edu.degree} at ${edu.institution}. ${edu.description}`;
        }
        if (q.includes("experience") || q.includes("work") || q.includes("intern")) {
            const exp = experiences[0];
            return `Vivian is currently a ${exp.title} at ${exp.company_name}. He has worked on PPE detection and AI automation.`;
        }
        if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
            return "You can contact Vivian via email at dcostavivian08@gmail.com or via WhatsApp at +91 6360209255.";
        }
        if (q.includes("traffic")) {
            return "The Smart Traffic project uses ML to detect potholes and analyze city traffic in real-time. It's built with Python and AI analytics.";
        }

        return "That's a great question! I'm still learning, but I can tell you about Vivian's AI/ML skills, his B.Tech studies, or his recent internship at Daylink Tech Labs. What interests you most?";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            const response = getBotResponse(userMessage.content);
            setMessages(prev => [...prev, { role: "bot", content: response }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[999]">
            {/* Chat Bubble */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-[#915EFF] to-[#804dee] p-4 rounded-full shadow-lg shadow-[#915EFF]/30 flex items-center justify-center text-white"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-tertiary/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-[#915EFF]/20 to-[#00cea8]/10 border-b border-white/10 flex items-center gap-3">
                            <div className="p-2 bg-[#915EFF] rounded-lg">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Vivian's AI Agent</h4>
                                <p className="text-[#00cea8] text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Sparkles size={10} /> Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === "bot" ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === "bot"
                                            ? "bg-white/5 text-secondary border border-white/5 rounded-tl-none"
                                            : "bg-[#915EFF] text-white rounded-tr-none shadow-lg shadow-[#915EFF]/20"
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-primary/20 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask me about Vivian..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#915EFF]/50 transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-[#915EFF] p-2 rounded-xl text-white hover:bg-[#804dee] transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
