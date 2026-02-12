"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { education } from "../constants";

const EducationCard = ({ edu, index }: { edu: any; index: number }) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className='bg-tertiary p-8 rounded-2xl w-full border border-white/5 relative overflow-hidden group'
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap size={80} className="text-[#915EFF]" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 className='text-white text-[24px] font-bold'>{edu.degree}</h3>
                <p className='text-secondary text-[16px] font-semibold mt-1'>{edu.institution}</p>
            </div>
            <p className="text-[#915EFF] font-bold bg-[#915EFF]/10 px-4 py-2 rounded-xl border border-[#915EFF]/30">
                {edu.date}
            </p>
        </div>

        <p className='mt-6 text-secondary text-[17px] leading-[30px] max-w-3xl'>
            {edu.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
            {["GPA: 3.8/4.0", "Relevant Coursework", "Honors"].map((tag) => (
                <span key={tag} className="text-[14px] text-white px-3 py-1 rounded-full bg-primary/40 border border-white/10">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const Education = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">My Academic Journey</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight mt-2">
                    Education<span className="text-[#915EFF]">.</span>
                </h2>
            </motion.div>

            <div className='mt-20 flex flex-col gap-10'>
                {education.map((edu, index) => (
                    <EducationCard key={`edu-${index}`} index={index} edu={edu} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Education, "education");
