"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Education from "@/components/Education";
import Tech from "@/components/Tech";
import Works from "@/components/Works";
import Extras from "@/components/Extras";
import Hobbies from "@/components/Hobbies";
import Game from "@/components/Game";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import StarsCanvas from "@/components/canvas/Stars";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import Chatbot from "@/components/Chatbot";

export default function Home() {
    return (
        <main className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <Stats />
            </div>

            <About />
            <Education />
            <Tech />
            <Works />
            <Extras />
            <Hobbies />
            <Resume />
            <Game />

            <div className="relative z-0">
                <Contact />
                <StarsCanvas />
            </div>
            <Footer />
            <Chatbot />
        </main>
    );
}
