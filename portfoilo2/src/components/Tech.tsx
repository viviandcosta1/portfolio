"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";

import BallCanvas from "./canvas/Ball";

const Tech = () => {
    return (
        <>
            <motion.div variants={textVariant()} className="mb-14">
                <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium text-center'>My Arsenal</p>
                <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center'>
                    Technologies<span className="text-[#915EFF]">.</span>
                </h2>
                <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto">
                    A comprehensive suite of tools and languages I leverage to build <span className="text-white font-medium">intelligent AI models</span>,
                    <span className="text-white font-medium"> robust backend systems</span>, and <span className="text-white font-medium">high-performance web applications</span>.
                </p>
            </motion.div>

            <div className='relative bg-tertiary/10 backdrop-blur-sm rounded-[30px] p-10 border border-white/5'>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-[#915EFF]/10 blur-[50px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00cea8]/10 blur-[70px] rounded-full" />

                <div className='flex flex-row flex-wrap justify-center gap-10 relative z-10'>
                    {technologies.map((technology) => (
                        <div className='w-28 h-28 flex flex-col items-center group' key={technology.name}>
                            <BallCanvas icon={technology.icon} name={technology.name} />
                            <p className="text-secondary text-[12px] uppercase tracking-wider font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                                {technology.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SectionWrapper(Tech, "");
