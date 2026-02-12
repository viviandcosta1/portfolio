"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Code2, Cpu, Database, LineChart } from "lucide-react";

import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const iconMap = {
    web: <Code2 size={40} className="text-[#915EFF]" />,
    mobile: <Cpu size={40} className="text-[#00cea8]" />,
    backend: <Database size={40} className="text-[#ffed4a]" />,
    creator: <LineChart size={40} className="text-[#bf61ff]" />,
};

const ServiceCard = ({ index, title, icon }: { index: number; title: string; icon: string }) => {
    return (
        <Tilt
            perspective={1000}
            scale={1.1}
            transitionSpeed={450}
            className='xs:w-[250px] w-full'
        >
            <motion.div
                variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
                className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card transition-all duration-300'
            >
                <div
                    className='bg-tertiary rounded-[20px] py-8 px-12 min-h-[280px] flex justify-evenly items-center flex-col cursor-pointer relative overflow-hidden group'
                >
                    {/* Background Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#915EFF] to-[#00cea8] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

                    <div className="w-20 h-20 rounded-full bg-primary/50 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {iconMap[icon as keyof typeof iconMap] || <Code2 size={40} />}
                    </div>

                    <h3 className='text-white text-[20px] font-bold text-center mt-4 tracking-tight group-hover:text-[#915EFF] transition-colors duration-300'>
                        {title}
                    </h3>

                    <div className="mt-4 w-10 h-1 bg-[#915EFF] rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
            </motion.div>
        </Tilt>
    );
};

const About = () => {
    return (
        <div className="relative">
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-[#915EFF]/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-[#00cea8]/5 blur-[150px] rounded-full" />

            <motion.div variants={textVariant()}>
                <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium'>Introduction</p>
                <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight'>
                    Overview<span className="text-[#915EFF]">.</span>
                </h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-6 text-secondary text-[18px] max-w-3xl leading-[32px] font-light bg-primary/20 p-6 rounded-2xl backdrop-blur-sm border border-white/5 shadow-2xl'
            >
                I am a <span className="text-white font-medium">Computer Science Engineering student</span> with strong foundations in <span className="text-white font-medium">AI/ML</span>,
                <span className="text-white font-medium"> data analytics</span>, and <span className="text-white font-medium">web development</span>.
                I am experienced in building real-time, data-driven systems and responsive frontend applications.
            </motion.p>

            <div className='mt-24 flex flex-wrap gap-12 justify-center'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(About, "about");
