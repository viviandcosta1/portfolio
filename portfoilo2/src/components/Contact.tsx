"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

import { SectionWrapper } from "../hoc";
import { fadeIn, slideIn } from "../utils/motion";
import EarthCanvas from "./canvas/Earth";

const Contact = () => {
    const formRef = useRef<any>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const whatsappNumber = "916360209255";
        const messageText = `Hello Vivian, my name is ${form.name}.\nEmail: ${form.email}\nMessage: ${form.message}`;
        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // 1. Open WhatsApp IMMEDIATELY to bypass popup blockers
        const win = window.open(whatsappUrl, "_blank");

        if (!win || win.closed || typeof win.closed === 'undefined') {
            // If popup was blocked, fall back to location change
            window.location.href = whatsappUrl;
        }

        try {
            // 2. Send to API in the background
            await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            setLoading(false);
            setForm({
                name: "",
                email: "",
                message: "",
            });
        } catch (error) {
            setLoading(false);
            console.error("Background transmission error:", error);
        }
    };

    return (
        <div
            className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
        >
            <motion.div
                variants={fadeIn("right", "tween", 0.2, 1)}
                className='flex-[0.75] bg-tertiary/20 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl shadow-[#915EFF]/10'
            >
                {/* Decorative radial glow */}
                <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#915EFF]/10 blur-[100px] rounded-full -z-10" />
                <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-[#00cea8]/5 blur-[100px] rounded-full -z-10" />

                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-1">
                        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">
                            Get in touch
                        </p>
                        <h3 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight">
                            Contact<span className="text-[#915EFF]">.</span>
                        </h3>

                        {/* Direct Tech Channels */}
                        <div className="mt-8 flex flex-col gap-4">
                            <a href="https://wa.me/916360209255" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-primary/40 border border-white/5 p-4 rounded-2xl hover:border-[#25D366]/50 transition-all group">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#25D366]/20 transition-all">
                                    <MessageSquare className="text-[#25D366]" size={20} />
                                </div>
                                <div>
                                    <p className="text-secondary text-[10px] uppercase tracking-widest font-bold">WhatsApp</p>
                                    <p className="text-white text-sm font-medium">+91 6360209255</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 bg-primary/40 border border-white/5 p-4 rounded-2xl hover:border-[#915EFF]/50 transition-all group">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#915EFF]/20 transition-all">
                                    <Mail className="text-[#915EFF]" size={20} />
                                </div>
                                <div>
                                    <p className="text-secondary text-[10px] uppercase tracking-widest font-bold">Email</p>
                                    <p className="text-white text-sm font-medium">dcostavivian08@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-primary/40 border border-white/5 p-4 rounded-2xl hover:border-[#915EFF]/50 transition-all group">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#915EFF]/20 transition-all">
                                    <MapPin className="text-[#915EFF]" size={20} />
                                </div>
                                <div>
                                    <p className="text-secondary text-[10px] uppercase tracking-widest font-bold">Location</p>
                                    <p className="text-white text-sm font-medium">Mangaluru, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className='flex-1 flex flex-col gap-6'
                    >
                        <label className='flex flex-col group'>
                            <span className='text-white font-medium mb-2 group-focus-within:text-[#915EFF] transition-colors text-sm'>Your Name</span>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter name..."
                                className='bg-primary/50 py-3 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/5 focus:border-[#915EFF]/50 transition-all font-medium text-sm'
                            />
                        </label>
                        <label className='flex flex-col group'>
                            <span className='text-white font-medium mb-2 group-focus-within:text-[#915EFF] transition-colors text-sm'>Your Email</span>
                            <input
                                type='email'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email..."
                                className='bg-primary/50 py-3 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/5 focus:border-[#915EFF]/50 transition-all font-medium text-sm'
                            />
                        </label>
                        <label className='flex flex-col group'>
                            <span className='text-white font-medium mb-2 group-focus-within:text-[#915EFF] transition-colors text-sm'>Your Message</span>
                            <textarea
                                rows={4}
                                name='message'
                                value={form.message}
                                onChange={handleChange}
                                placeholder='Type message...'
                                className='bg-primary/50 py-3 px-6 placeholder:text-secondary text-white rounded-xl border border-white/5 focus:border-[#915EFF]/50 transition-all font-medium text-sm'
                            />
                        </label>

                        <motion.button
                            type='submit'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='bg-gradient-to-r from-[#915EFF] to-[#804dee] py-4 px-12 rounded-xl outline-none w-full text-white font-bold shadow-lg shadow-[#915EFF]/20 hover:shadow-[#915EFF]/40 transition-all mt-4'
                        >
                            {loading ? "Establishing Link..." : "Transmit Data"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
                <EarthCanvas />
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
