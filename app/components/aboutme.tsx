"use client";

import { DocumentDownload } from "iconsax-react";
import Button from "./button";
import React, { useRef, useLayoutEffect } from "react"; // Added hooks
import Image from "next/image";
import { me } from "../libs/me";
import gsap from "gsap"; // Import GSAP

const experiences = [
    {
        duration: "2025 - Present",
        role: "Product Designer",
        company: "Meetro",
        logo: "/meetro.svg",
    },
    {
        duration: "2024 - Present",
        role: "Product & Visual Designer",
        company: "Lipaworld",
        logo: "/lipawold.svg",
    },
    {
        duration: "2023 - 2024",
        role: "UI Designer",
        company: "Rivala",
        logo: "/rivala.svg",
    },
    {
        duration: "2022 - 2023",
        role: "UI Designer",
        company: "Caretaker",
        logo: "/caretaker.svg",
    },
];

const ExperienceRow = ({
    duration,
    role,
    companyName,
    companyLogo,
    hasBorder,
}: {
    duration: string;
    role: string;
    companyName: string;
    companyLogo: string;
    hasBorder: boolean;
}) => {
    return (
        <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-[#929292]">
                {duration}
            </span>
            <div className="flex items-end gap-4">
                <h4 className="text-sm font-semibold text-[#000000]">{role}</h4>
                <div className="flex items-center gap-1">
                    <img
                        src={companyLogo}
                        alt={companyName}
                        className="object-cover w-full h-full"
                    />
                    <span className="text-sm font-semibold text-[#8D8D8D]">
                        {companyName}
                    </span>
                </div>
            </div>
        </div>
    );
};

interface AboutmeProps { }

export default function Aboutme({ }: AboutmeProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sliderRef.current, {
                xPercent: -50, // Move exactly half the width (since we doubled the content)
                repeat: -1, // Infinite loop
                duration: 40, // Adjust speed (higher = slower)
                ease: "linear", // Smooth constant speed
            });
        }, sliderRef);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    // Double the array to create the seamless loop effect
    const infiniteMe = [...me, ...me];

    return (
        <div className="py-20 grid gap-12">
            <div className="grid gap-3 px-50">
                <h1 className="font-extrabold text-2xl">About me</h1>
                <div className="flex gap-8">
                    {/* Left Column: Text */}
                    <div className="w-[50%]">
                        <p className="Rinter text-base font-normal text-secondary-text">
                            I’m Newman Ogbo, a Product & Visual Designer with a
                            strong interest in how ideas evolve into usable,
                            meaningful digital products. My journey into design
                            began not with aesthetics, but with curiosity about
                            how people interact with systems, how technology
                            shapes behavior, and how thoughtful structure can
                            simplify complex problems. Early on, I became drawn
                            to observing everyday challenges around access,
                            connection, and usability. This curiosity gradually
                            led me to design, where I found a discipline that
                            allowed me to combine problem-solving, visual
                            communication, and systems thinking into practical
                            outcomes. Over time, my work expanded across web and
                            mobile products, often within early-stage or
                            founder-led environments where design decisions
                            directly shaped the product’s direction.
                        </p>
                    </div>

                    {/* Right Column: Work Experience Card */}
                    <div className="w-[50%] bg-white rounded-3xl p-8 flex flex-col justify-between h-full">
                        <div>
                            <div className="mb-2">
                                <h1 className="font-extrabold text-xl text-[#000000]">
                                    Work Experience
                                </h1>
                            </div>

                            <div className="flex flex-col gap-4">
                                {experiences.map((exp, index) => (
                                    <ExperienceRow
                                        key={index}
                                        duration={exp.duration}
                                        role={exp.role}
                                        companyName={exp.company}
                                        companyLogo={exp.logo}
                                        hasBorder={index !== experiences.length - 1}
                                    />
                                ))}
                            </div>
                        </div>

                        <button className="uppercase mt-6 flex gap-2 place-items-center w-fit text-sm font-bold tracking-wide text-[#3454D1] hover:opacity-80 transition-opacity">
                            <DocumentDownload
                                variant="Bold"
                                size={20}
                                color="currentColor"
                            />
                            Download Full CV
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <Button
                        bgColor="bg-white"
                        textColor="text-dark"
                        borderColor="border-[#E5E7E3]"
                    >
                        Find Out More
                    </Button>
                </div>
            </div>

            <div className="relative h-100 overflow-hidden">
                <div className="w-full mt-6 absolute">
                    <div ref={sliderRef} className="flex gap-4 w-max">
                        {infiniteMe.map((image, index) => (
                            <img src={image.src} alt={image.alt} key={index} className={`relative hover:rotate-[-1.5deg] overflow-hidden border-2 border-transparent hover:border-primary group cursor-pointer object-cover ${image.size}`} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-6 justify-center mt-6 px-50">
                <Button
                    bgColor="bg-white"
                    textColor="text-dark"
                    borderColor="border-[#E5E7E3]"
                    icon={<img src="/gmail.svg" alt="" className="size-4" />}
                >
                    Get in Touch
                </Button>
                <Button
                    bgColor="bg-dark"
                    textColor="text-white"
                    borderColor="border-transparent"
                    icon={<img src="/meet.svg" alt="" className="size-4" />}
                >
                    Book a Call
                </Button>
            </div>
        </div>
    );
}