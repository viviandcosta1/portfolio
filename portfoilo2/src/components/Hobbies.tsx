"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, BookOpen, Music as MusicIcon, Compass } from "lucide-react";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { hobbies } from "../constants";

const iconMap = {
    football: <Trophy size={48} className="text-[#915EFF]" />,
    books: <BookOpen size={48} className="text-[#00cea8]" />,
    music: <MusicIcon size={48} className="text-[#ffed4a]" />,
};

const HobbyCard = ({ index, title, description, icon }: any) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 1)}
        className='group relative bg-tertiary p-8 rounded-3xl sm:w-[360px] w-full overflow-hidden'
    >
        {/* Cinematic Background Blur/Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110">
            {iconMap[icon as keyof typeof iconMap] || <Compass size={150} />}
        </div>

        <div className='relative z-10'>
            <div className='w-16 h-16 rounded-2xl bg-primary/60 backdrop-blur-md flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#915EFF]/30 group-hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all duration-300'>
                {iconMap[icon as keyof typeof iconMap] || <Compass size={32} className="text-white" />}
            </div>

            <h3 className='text-white text-[24px] font-bold tracking-tight mb-4 group-hover:text-[#915EFF] transition-colors duration-300'>
                {title}
            </h3>
            <p className='text-secondary text-[16px] leading-[26px] font-light'>
                {description}
            </p>

            {/* Cinematic Pulse Line */}
            <div className="mt-8 h-[2px] w-0 bg-gradient-to-r from-[#915EFF] to-transparent group-hover:w-full transition-all duration-700 ease-out" />
        </div>
    </motion.div>
);

const Hobbies = () => {
    return (
        <div className="relative">
            {/* Background Cinematic Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-[radial-gradient(circle_at_center,rgba(145,94,255,0.05)_0%,transparent_70%)]" />

            <motion.div variants={textVariant()}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">Beyond the screen</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight">
                    Hobbies<span className="text-[#915EFF]">.</span>
                </h2>
            </motion.div>

            <div className='mt-20 flex flex-wrap gap-10 justify-center'>
                {hobbies.map((hobby, index) => (
                    <HobbyCard key={hobby.title} index={index} {...hobby} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Hobbies, "hobbies");
