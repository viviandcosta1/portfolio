"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "../constants";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`nav-padding w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
                }`}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-6'>
                <Link
                    href='/'
                    className='flex items-center gap-2'
                    onClick={() => {
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    {/* <img src={logo} alt='logo' className='w-9 h-9 object-contain' /> */}
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary font-bold">V</div>
                    <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                        Vivian &nbsp;
                        <span className='sm:block hidden'> | Web Developer</span>
                    </p>
                </Link>
                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${active === nav.title ? "text-white" : "text-secondary"
                                } hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>
                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <div
                        className='w-[28px] h-[28px] flex items-center justify-center cursor-pointer text-white'
                        onClick={() => setToggle(!toggle)}
                    >
                        {toggle ? <X size={28} /> : <Menu size={28} />}
                    </div>
                    <div
                        className={`${!toggle ? "hidden" : "flex"
                            } p-8 bg-tertiary/95 backdrop-blur-xl absolute top-20 right-0 mx-4 my-2 min-w-[200px] z-10 rounded-3xl border border-white/10 shadow-2xl`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-6'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-bold cursor-pointer text-[18px] w-full pb-2 border-b border-white/5 last:border-0 ${active === nav.title ? "text-white" : "text-secondary"
                                        }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a href={`#${nav.id}`} className="block">{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
