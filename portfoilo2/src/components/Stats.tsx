"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const counterData = [
    { label: "Projects Completed", value: "3+" },
    { label: "Certifications", value: "5+" },
    { label: "Languages Learned", value: "8+" },
    { label: "Lines of AI Logic", value: "10k+" },
];

const Stats = () => {
    return (
        <div className='flex flex-wrap justify-center gap-10 sm:gap-20 py-10 bg-tertiary/20 rounded-3xl border border-white/5 my-20'>
            {counterData.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    variants={fadeIn("up", "spring", index * 0.3, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className='flex flex-col items-center justify-center'
                >
                    <h3 className='text-[#915EFF] text-[40px] sm:text-[50px] font-black tracking-tight'>
                        {stat.value}
                    </h3>
                    <p className='text-secondary text-[14px] sm:text-[16px] uppercase tracking-[2px] font-medium text-center mt-2'>
                        {stat.label}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default Stats;
