"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    Linkedin,
    Github,
    Download,
    ExternalLink,
    Briefcase,
    GraduationCap,
    Sparkles,
    Code
} from "lucide-react";
import jsPDF from "jspdf";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { experiences, education, projects, certifications } from "../constants";

const Resume = () => {
    const handleDownload = () => {
        const doc = new jsPDF();

        // Settings
        const margin = 20;
        const width = doc.internal.pageSize.getWidth();
        const primaryColor = [145, 94, 255]; // #915EFF

        // Helper for sections
        let y = 20;
        const addSectionLine = (color: number[]) => {
            doc.setDrawColor(color[0], color[1], color[2]);
            doc.setLineWidth(0.5);
            doc.line(margin, y, width - margin, y);
            y += 10;
        };

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.setTextColor(0, 0, 0);
        doc.text("Vivian Dcosta", margin, y);
        y += 10;

        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("AI/ML Enthusiast — Web Developer", margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("dcostavivian08@gmail.com | +91 6360209255 | Mangaluru, India", margin, y);
        y += 5;
        doc.text("LinkedIn: linkedin.com/in/vivian-dcosta | GitHub: github.com/vivian-dcosta", margin, y);
        y += 8;

        // Line
        addSectionLine(primaryColor);

        // Summary
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Summary", margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const summary = "Computer Science Engineering student with strong foundations in AI/ML, data analytics, and web development. Experienced in building real-time, data-driven systems and responsive frontend applications.";
        const splitSummary = doc.splitTextToSize(summary, width - (margin * 2));
        doc.text(splitSummary, margin, y);
        y += (splitSummary.length * 5) + 10;

        // Experience
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Experience", margin, y);
        y += 7;

        experiences.forEach(exp => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(exp.title, margin, y);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(exp.date, width - margin, y, { align: "right" });
            y += 5;

            doc.setFont("helvetica", "italic");
            doc.setTextColor(100, 100, 100);
            doc.text(exp.company_name, margin, y);
            y += 6;

            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            exp.points.forEach((point: string) => {
                const splitPt = doc.splitTextToSize(`• ${point}`, width - (margin * 2) - 5);
                doc.text(splitPt, margin + 5, y);
                y += (splitPt.length * 5);
            });
            y += 5;
        });

        // Projects
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Core Projects", margin, y);
        y += 7;

        projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(proj.name, margin, y);
            y += 5;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            const splitDesc = doc.splitTextToSize(`• ${proj.description}`, width - (margin * 2) - 5);
            doc.text(splitDesc, margin + 5, y);
            y += (splitDesc.length * 5) + 4;
        });

        // Education
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Education", margin, y);
        y += 7;

        education.forEach(edu => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(edu.degree, margin, y);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(edu.date, width - margin, y, { align: "right" });
            y += 5;
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution}${edu.description ? ' | ' + edu.description : ''}`, margin, y);
            y += 10;
        });

        // Skills & Certs
        y += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("Certifications", margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        const certs = certifications.map(c => `${c.title} (${c.provider})`).join(", ");
        const splitCerts = doc.splitTextToSize(certs, width - (margin * 2));
        doc.text(splitCerts, margin, y);

        doc.save("Vivian_Dcosta_Resume.pdf");
    };

    return (
        <div className="relative">
            <motion.div variants={textVariant(0)}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">My Professional Profile</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight">
                    Professional Resume<span className="text-[#915EFF]">.</span>
                </h2>
            </motion.div>

            <div className="mt-12 group">
                <motion.div
                    variants={fadeIn("up", "spring", 0.5, 0.75)}
                    className="bg-tertiary/20 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#915EFF]/5 blur-[100px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00cea8]/5 blur-[100px] -z-10" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-10">
                        <div>
                            <h3 className="text-white text-4xl md:text-5xl font-black tracking-tight">Vivian Dcosta</h3>
                            <p className="text-[#915EFF] text-xl font-medium mt-2">AI/ML Enthusiast — Web Developer</p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <a href="mailto:dcostavivian08@gmail.com" className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm">
                                    <Mail size={16} /> dcostavivian08@gmail.com
                                </a>
                                <a href="tel:+916360209255" className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm">
                                    <Phone size={16} /> +91 6360209255
                                </a>
                                <div className="flex gap-4">
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white">
                                        <Github size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownload}
                            className="bg-gradient-to-r from-[#915EFF] to-[#804dee] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-[#915EFF]/20"
                        >
                            <Download size={20} /> Download PDF
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                        <div className="lg:col-span-1 space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="text-[#915EFF]" size={24} />
                                    <h4 className="text-white text-xl font-bold uppercase tracking-wider">Summary</h4>
                                </div>
                                <p className="text-secondary leading-relaxed font-light">
                                    Computer Science Engineering student with strong foundations in <span className="text-white font-medium">AI/ML</span>,
                                    <span className="text-white font-medium"> data analytics</span>, and <span className="text-white font-medium">web development</span>.
                                    Experienced in building real-time, data-driven systems and responsive frontend applications.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="text-[#915EFF]" size={24} />
                                    <h4 className="text-white text-xl font-bold uppercase tracking-wider">Education</h4>
                                </div>
                                <div className="space-y-6">
                                    {education.map((edu, idx) => (
                                        <div key={idx} className="relative pl-4 border-l border-white/10">
                                            <div className="absolute top-2 -left-[5px] w-2 h-2 rounded-full bg-[#915EFF]" />
                                            <h5 className="text-white font-bold">{edu.degree}</h5>
                                            <p className="text-secondary text-sm mt-1">{edu.institution}</p>
                                            <p className="text-[#915EFF] text-xs font-bold mt-1">{edu.date}</p>
                                            {edu.description && <p className="text-secondary text-xs mt-2 italic">{edu.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <Code className="text-[#915EFF]" size={20} />
                                    <h4 className="text-white text-sm font-bold uppercase tracking-widest">Key Languages</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Python", "JavaScript", "SQL", "HTML", "CSS"].map(skill => (
                                        <span key={skill} className="bg-primary/50 text-secondary text-[10px] px-3 py-1 rounded-full border border-white/5 uppercase tracking-tighter">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <Briefcase className="text-[#00cea8]" size={24} />
                                    <h4 className="text-white text-xl font-bold uppercase tracking-wider">Work Experience</h4>
                                </div>
                                <div className="space-y-10">
                                    {experiences.map((exp, idx) => (
                                        <div key={idx} className="group/item">
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className="text-white text-lg font-bold group-hover/item:text-[#00cea8] transition-colors">{exp.title}</h5>
                                                <span className="text-secondary text-sm font-medium">{exp.date}</span>
                                            </div>
                                            <p className="text-[#00cea8] text-sm font-bold mb-4">{exp.company_name}</p>
                                            <ul className="list-disc list-inside text-secondary text-sm space-y-2 opacity-80 decoration-[#00cea8]">
                                                {exp.points.map((pt, pIdx) => (
                                                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-tertiary/40 rounded-3xl p-8 border border-white/5">
                                <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                                    Top Projects <ExternalLink size={18} className="text-secondary" />
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.slice(0, 3).map((proj, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <h5 className="text-[#915EFF] font-bold text-sm">{proj.name}</h5>
                                            <p className="text-secondary text-xs leading-relaxed line-clamp-2">{proj.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(Resume, "resume");
