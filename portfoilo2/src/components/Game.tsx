"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { Rocket, Target, Zap, RotateCcw, Play } from "lucide-react";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const PLAYER_SIZE = 50;
const ITEM_SIZE = 25;

const Game = () => {
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "GAMEOVER">("IDLE");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [playerPosition, setPlayerPosition] = useState(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
    const [items, setItems] = useState<{ id: number; x: number; y: number; type: "DATA" | "BUG" }[]>([]);
    const gameRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    // Input handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== "PLAYING") return;
            if (e.key === "ArrowLeft") {
                setPlayerPosition((prev) => Math.max(0, prev - 25));
            } else if (e.key === "ArrowRight") {
                setPlayerPosition((prev) => Math.min(GAME_WIDTH - PLAYER_SIZE, prev + 25));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (gameState !== "PLAYING" || !gameRef.current) return;
            const rect = gameRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - PLAYER_SIZE / 2;
            setPlayerPosition(Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, x)));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [gameState]);

    // Game loop
    const update = () => {
        if (gameState !== "PLAYING") return;

        setItems((prevItems) => {
            const nextItems = prevItems
                .map((item) => ({ ...item, y: item.y + (item.type === "BUG" ? 5 : 4) }))
                .filter((item) => item.y < GAME_HEIGHT);

            // Spawn items
            if (Math.random() < 0.03) {
                nextItems.push({
                    id: Date.now(),
                    x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
                    y: -ITEM_SIZE,
                    type: Math.random() < 0.3 ? "BUG" : "DATA",
                });
            }

            // Collision detection
            const hitItem = nextItems.find(
                (item) =>
                    item.y + ITEM_SIZE > GAME_HEIGHT - PLAYER_SIZE - 20 &&
                    item.x + ITEM_SIZE > playerPosition &&
                    item.x < playerPosition + PLAYER_SIZE
            );

            if (hitItem) {
                if (hitItem.type === "DATA") {
                    setScore((s) => s + 10);
                    return nextItems.filter((i) => i.id !== hitItem.id);
                } else {
                    setGameState("GAMEOVER");
                    return [];
                }
            }

            return nextItems;
        });

        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        if (gameState === "PLAYING") {
            requestRef.current = requestAnimationFrame(update);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score]);

    const startGame = () => {
        setScore(0);
        setItems([]);
        setGameState("PLAYING");
        setPlayerPosition(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
    };

    return (
        <div className="relative">
            <motion.div variants={textVariant(0)}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-[4px] font-medium">Mini Lab</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] leading-tight">
                    Data Catcher<span className="text-[#915EFF]">.</span>
                </h2>
            </motion.div>

            <div className="mt-10 flex flex-col items-center">
                <div
                    ref={gameRef}
                    className="relative bg-tertiary/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl cursor-none"
                    style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "linear-gradient(#915EFF 1px, transparent 1px), linear-gradient(90deg, #915EFF 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }} />

                    <AnimatePresence>
                        {gameState === "IDLE" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-primary/80 z-20"
                            >
                                <Rocket size={64} className="text-[#915EFF] mb-6 animate-bounce" />
                                <h3 className="text-white text-2xl font-bold mb-4">Neural Data Capture</h3>
                                <p className="text-secondary text-center px-10 mb-8">
                                    Collect <span className="text-[#00cea8]">Data Points</span> to train your model.
                                    Avoid the <span className="text-[#ff6b6b]">System Bugs</span>!
                                </p>
                                <button
                                    onClick={startGame}
                                    className="bg-[#915EFF] hover:bg-[#804dee] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                                >
                                    <Play size={20} /> Initialize
                                </button>
                            </motion.div>
                        )}

                        {gameState === "GAMEOVER" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-primary/90 z-20"
                            >
                                <Zap size={64} className="text-[#ff6b6b] mb-4" />
                                <h3 className="text-white text-3xl font-black mb-2">CRITICAL FAILURE</h3>
                                <p className="text-secondary text-xl mb-6">Score: {score}</p>
                                <button
                                    onClick={startGame}
                                    className="bg-white text-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                                >
                                    <RotateCcw size={20} /> Reboot System
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Score UI */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
                        <div className="bg-primary/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                            <p className="text-secondary text-xs uppercase tracking-widest">Score</p>
                            <p className="text-white font-black text-xl">{score}</p>
                        </div>
                        <div className="bg-primary/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                            <p className="text-secondary text-xs uppercase tracking-widest">High Score</p>
                            <p className="text-white font-black text-xl">{highScore}</p>
                        </div>
                    </div>

                    {/* Player */}
                    <motion.div
                        className="absolute bottom-10 flex items-center justify-center"
                        animate={{ x: playerPosition }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ width: PLAYER_SIZE, height: PLAYER_SIZE }}
                    >
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-[#915EFF] rounded-xl blur-md opacity-50 animate-pulse" />
                            <div className="relative w-full h-full bg-gradient-to-br from-[#915EFF] to-[#804dee] rounded-xl border border-white/20 flex items-center justify-center">
                                <Target className="text-white" size={24} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Items */}
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="absolute"
                            style={{
                                left: item.x,
                                top: item.y,
                                width: ITEM_SIZE,
                                height: ITEM_SIZE
                            }}
                        >
                            <div className={`w-full h-full rounded-full blur-[2px] ${item.type === "DATA" ? "bg-[#00cea8]" : "bg-[#ff6b6b]"} animate-pulse`} />
                            <div className={`absolute inset-1 rounded-full ${item.type === "DATA" ? "bg-[#00cea8]" : "bg-[#ff6b6b]"} border border-white/40`} />
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-secondary text-sm font-medium flex gap-8 items-center bg-tertiary/20 px-8 py-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">←</div>
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">→</div>
                        <span>Move Paddle</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <span>Or use Mouse</span>
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(Game, "game");
