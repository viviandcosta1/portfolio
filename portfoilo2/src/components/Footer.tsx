"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="w-full py-10 bg-primary border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col">
                    <h2 className="text-white text-[24px] font-black">VIVIAN</h2>
                    <p className="text-secondary text-[14px] mt-2">AI/ML Enthusiast & Full Stack Developer</p>
                </div>

                <div className="flex gap-10">
                    <a href="https://github.com" target="_blank" className="text-secondary hover:text-white transition-colors">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" className="text-secondary hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" className="text-secondary hover:text-white transition-colors">Twitter</a>
                </div>

                <p className="text-secondary text-[12px]">© 2026 Vivian. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
