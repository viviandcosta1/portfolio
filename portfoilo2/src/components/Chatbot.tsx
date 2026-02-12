"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { experiences, education, projects, technologies, certifications, spokenLanguages, hobbies } from "../constants";

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

        if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
            return "Hello! I'm Vivian Dcosta's virtual assistant. I can tell you about his B.Tech education, AI/ML internship, tech stack, or his projects. What would you like to know?";
        }

        if ((q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) && !q.includes("speak")) {
            const techs = technologies.map(t => t.name).join(", ");
            return `Vivian has a strong technical stack: ${techs}. He is specifically focused on Python for AI/ML and React for modern web development.`;
        }

        if (q.includes("project") || q.includes("work sample")) {
            const projs = projects.map(p => `• ${p.name}: ${p.description}`).join("\n");
            return `Vivian has several core projects:\n\n${projs}\n\nHe uses Python, Selenium, Pandas, and React to build these solutions.`;
        }

        if (q.includes("education") || q.includes("study") || q.includes("college") || q.includes("university")) {
            const eduList = education.map(e => `• ${e.degree} from ${e.institution} (${e.date}). ${e.description}`).join("\n\n");
            return `Here is Vivian's educational background:\n\n${eduList}`;
        }

        if (q.includes("experience") || q.includes("work") || q.includes("intern") || q.includes("job")) {
            const expList = experiences.map(exp => `• ${exp.title} at ${exp.company_name} (${exp.date}). Key work: ${exp.points.join(" ")}`).join("\n\n");
            return `Vivian's professional journey includes:\n\n${expList}`;
        }

        if (q.includes("cert") || q.includes("award") || q.includes("license")) {
            const certList = certifications.map((c: any) => `• ${c.title} by ${c.provider}`).join("\n");
            return `Vivian holds multiple certifications:\n\n${certList}`;
        }

        if (q.includes("language") && (q.includes("speak") || q.includes("know") || q.includes("talk"))) {
            return `Vivian is multilingual and speaks: ${spokenLanguages.join(", ")}. This helps him collaborate effectively in diverse teams.`;
        }

        if (q.includes("hobby") || q.includes("interest") || q.includes("fun") || q.includes("hobbies")) {
            const hobbyList = hobbies.map((h: any) => `• ${h.title}: ${h.description}`).join("\n");
            return `Outside of coding, Vivian enjoys:\n\n${hobbyList}`;
        }

        if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("whatsapp")) {
            return "You can reach Vivian directly:\n📧 Email: dcostavivian08@gmail.com\n📱 WhatsApp: +91 6360209255\n📍 Location: Mangaluru, India";
        }

        if (q.includes("traffic") || q.includes("pothole")) {
            const p = projects[0];
            return `Project Spotlight: ${p.name}. ${p.description} It's a real-time system using advanced computer vision and ML.`;
        }

        if (q.includes("candle") || q.includes("business")) {
            const p = projects[1];
            return `Project Spotlight: ${p.name}. ${p.description} Focuses on high-end UI/UX and responsive frontend.`;
        }

        if (q.includes("scrap") || q.includes("selenium")) {
            const p = projects[2];
            return `Project Spotlight: ${p.name}. ${p.description} This demonstrates his proficiency in Python automation and data engineering.`;
        }

        return "I can definitely help with that! You can ask me specifically about Vivian's:\n1. Technical Skills\n2. Work Experience (Internships)\n3. Education Details\n4. Projects (Traffic, Candle, Scraping)\n5. Certifications\n6. Hobbies & Languages\n7. Contact Info";
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
                        className="fixed sm:absolute bottom-0 sm:bottom-20 right-0 w-full sm:w-[400px] h-[80vh] sm:h-[500px] bg-tertiary/95 backdrop-blur-3xl border-t sm:border border-white/10 rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[1000]"
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
