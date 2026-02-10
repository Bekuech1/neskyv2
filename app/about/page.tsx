"use client";

import Aboutme from "../components/layout/aboutme";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Page() {
  return (
    <div className="no-scrollbar bg-secondary">
      <Aboutme
        showFindMore={false}
        description={
          <div className="grid gap-8"> {/* Increased gap for better rhythm */}
            
            {/* 1. INTRO - Fades in first */}
            <ScrollReveal>
              <div className="grid gap-4">
                <p>
                  I’m Newman Ogbo, a Product & Visual Designer with a strong interest in how ideas evolve into usable, meaningful digital products. My journey into design began not with aesthetics, but with curiosity about how people interact with systems, how technology shapes behavior, and how thoughtful structure can simplify complex problems.
                </p>
                <p>
                  Early on, I became drawn to observing everyday challenges around access, connection, and usability. This curiosity gradually led me to design, where I found a discipline that allowed me to combine problem-solving, visual communication, and systems thinking into practical outcomes.
                </p>
              </div>
            </ScrollReveal>

            {/* 2. LIPAWORLD */}
            <ScrollReveal>
              <div className="grid gap-2">
                <h6 className="text-primary-text font-bold">Lipaworld — Product & Visual Designer (Founder-led)</h6>
                <p>
                  At Lipaworld, I worked as a Product & Visual Designer on a fintech-adjacent marketplace focused on enabling access to everyday services across African countries. As a founder-led project, my role extended beyond interface design into product definition and long-term thinking. I led the decision to position the marketplace as the primary experience, intentionally abstracting financial complexity.
                </p>
              </div>
            </ScrollReveal>

            {/* 3. MEETRO */}
            <ScrollReveal>
              <div className="grid gap-2">
                <h6 className="text-primary-text font-bold">Meetro — Product Designer and Founder</h6>
                <p>
                  At Meetro, I worked as a Product Designer on a community-driven platform aimed at helping people discover events and form real-life connections. My role involved defining user flows for event discovery, RSVPs, and profiles, while balancing usability with approachability. This project deepened my understanding of community design and social interaction patterns.
                </p>
              </div>
            </ScrollReveal>

            {/* 4. RIVALA */}
            <ScrollReveal>
              <div className="grid gap-2">
                <h6 className="text-primary-text font-bold">Rivala — UI Designer</h6>
                <p>
                  At Rivala, I worked as a UI Designer on a platform built to connect companies with affordable talent across different countries. I was responsible for designing the end-to-end interface for the MVP, translating product requirements into clear layouts, consistent components, and a cohesive visual language.
                </p>
              </div>
            </ScrollReveal>

            {/* 5. CARETAKER */}
            <ScrollReveal>
              <div className="grid gap-2">
                <h6 className="text-primary-text font-bold">Caretaker — UI Designer</h6>
                <p>
                  At Caretaker, a property management platform, I worked as a Product Designer contributing to the second version of the MVP. My focus was on refining workflows, improving information architecture, and enhancing usability for multiple user roles, including property managers and tenants.
                </p>
              </div>
            </ScrollReveal>

            {/* 6. OUTRO */}
            <ScrollReveal>
              <div className="grid gap-2">
                <h6 className="text-primary-text font-bold">Today</h6>
                <p>
                  Across these experiences, my approach to design has become grounded in systems thinking, clarity, and real-world application. I see design as both a strategic and expressive discipline—one that requires understanding context, users, and constraints, while leaving room for exploration and craft.
                </p>
              </div>
            </ScrollReveal>
            
          </div>
        }
      />
    </div>
  );
}