"use client";

import { DocumentDownload} from "iconsax-react";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { me } from "@/app/libs/me";
import Button from "../ui/button";
import { useRouter } from "next/navigation";


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
            <div className="flex items-start">
                <div className="flex items-center gap-1">
                    <img
                        src={companyLogo}
                        alt={companyName}
                        className="object-cover w-full h-full"
                    />
                    <span className="text-sm font-normal text-[#8D8D8D]">
                        {companyName}
                    </span>
                </div>
                <h4 className="text-sm font-normal text-[#8D8D8D]">{" "}/ {role}</h4>
            </div>
            <span className="text-sm items-end uppercase font-normal text-[#929292]">
                {duration}
            </span>
        </div>
    );
};

interface AboutmeProps {
    showFindMore?: boolean;
    description?: React.ReactNode;
}

export default function Aboutme({ showFindMore = true, description }: AboutmeProps) {

    const sliderRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sliderRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 40,
                ease: "linear",
            });
        }, sliderRef);

        return () => ctx.revert();
    }, []);

    const infiniteMe = [...me, ...me];

    const defaultBio = (
        <div>
            <span>
                I&apos;m Newman Ogbo, a Product & Visual Designer with a
                strong interest in how ideas evolve into usable,
                meaningful products. My journey into design
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
                directly shaped the product&apos;s direction.
            </span>
        </div>
    );

    return (
        <div className="py-20 grid gap-12">
            <div className="grid gap-3 max-w-[1040px] mx-auto">

                {/* 1. Heading */}
                <div>
                    <h1 className="font-semibold text-sm uppercase text-tertiary-text">Professional background</h1>
                </div>

                <div className="flex gap-8 items-start relative">

                    {/* 2. Left Column: Text */}
                    <div className="w-[50%]">
                        <div className="Rinter text-base font-normal text-secondary-text">
                            {description || defaultBio}
                        </div>
                    </div>

                    {/* 3. Right Column: Work Experience Card */}
                    {/* NOTICE: I moved the sticky/layout classes to ScrollReveal props so they apply to the wrapper */}
                    <div className="w-[50%] sticky top-30">
                        <div>
                            <div
                                className="bg-white rounded-3xl p-8 flex flex-col justify-between self-start"
                            >
                                <div className="flex-1">
                                    <div className="mb-6">
                                        <h1 className="font-semibold text-sm uppercase text-[#000000]">
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

                                <button className="uppercase mt-6 flex gap-2 place-items-center w-fit text-sm font-bold tracking-wide text-[#3454D1] hover:opacity-80 transition-opacity flex-shrink-0">
                                    <DocumentDownload
                                        variant="Bold"
                                        size={20}
                                        color="currentColor"
                                    />
                                    Download Full CV
                                </button>
                            </div>
                        </div>
                        {!showFindMore && (
                            <div>
                                <div className="grid gap-3 mt-6">
                                    <h1 className="font-semibold text-sm uppercase text-tertiary-text">outside design</h1>
                                    <p>
                                        When I’m not designing, you’ll often find me enjoying quality time with friends, either at the basketball court, hitting the gym or in a gaming session. Building meaningful relationships with people is something I value. It not only enriches my life but informs my design decisions
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* 4. Find Out More Button */}
                {showFindMore && (
                    <div className="flex justify-center mt-8">
                        <Button
                            bgColor="bg-white"
                            textColor="text-dark"
                            borderColor="border-[#E5E7E3]"
                            onClick={() => { router.push("/about") }}
                        >
                            Find Out More
                        </Button>
                    </div>
                )}
            </div>

            {/* 5. Infinite Slider Container */}
            {/* Animating the container opacity/blur, while inner logic handles the scroll */}
            <div className="relative h-130 overflow-hidden" >
                <div className="w-full mt-6 absolute">
                    <div ref={sliderRef} className="flex gap-4 w-max">
                        {infiniteMe.map((image, index) => (
                            <img
                                src={image.src}
                                alt={image.alt}
                                key={index}
                                className={`
                   relative 
                   overflow-hidden 
                   border-2 border-transparent 
                   group cursor-pointer object-cover 
                   ${image.size}
                   transition-all duration-300 ease-out
                   hover:rotate-[-1.5deg] 
                   hover:border-primary 
                   hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                 `}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Bottom Buttons */}
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
        </div >
    );
}