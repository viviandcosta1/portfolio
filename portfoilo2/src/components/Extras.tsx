"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Globe } from "lucide-react";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { certifications, spokenLanguages } from "../constants";

const CertificationCard = ({ index, title, provider }: any) => (
    <motion.div
        variants={fadeIn("right", "spring", index * 0.3, 0.75)}
        className='bg-tertiary p-6 rounded-2xl sm:w-[320px] w-full border border-white/5 hover:border-[#915EFF]/50 transition-colors group'
    >
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/50 group-hover:scale-110 transition-transform">
                <Award className="text-[#915EFF]" size={24} />
            </div>
            <div>
                <h3 className='text-white text-[18px] font-bold leading-tight'>{title}</h3>
                <p className='text-secondary text-[14px] mt-2 italic'>{provider}</p>
            </div>
        </div>
    </motion.div>
);

const Extras = () => {
    return (
        <div className="mt-20">
            <div className="flex flex-col md:flex-row gap-20">
                {/* Certifications Side */}
                <div className="flex-[1.5]">
                    <motion.div variants={textVariant()}>
                        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">Badges of Honor</p>
                        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight">
                            Certifications<span className="text-[#915EFF]">.</span>
                        </h2>
                    </motion.div>

                    <div className='mt-12 flex flex-wrap gap-5'>
                        {certifications.map((cert, index) => (
                            <CertificationCard key={cert.title} index={index} {...cert} />
                        ))}
                    </div>
                </div>

                {/* Languages Side */}
                <div className="flex-1">
                    <motion.div variants={textVariant()}>
                        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">Communication</p>
                        <h2 className="text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] leading-tight">
                            Languages Spoken<span className="text-[#00cea8]">.</span>
                        </h2>
                    </motion.div>

                    <div className='mt-12 flex flex-col gap-4'>
                        {spokenLanguages.map((lang, index) => (
                            <motion.div
                                key={lang}
                                variants={fadeIn("left", "spring", index * 0.2, 0.75)}
                                className="flex items-center gap-4 bg-tertiary/40 p-4 rounded-xl border border-white/5"
                            >
                                <Globe size={20} className="text-[#00cea8]" />
                                <span className="text-white font-medium text-[18px]">{lang}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Extras, "");
