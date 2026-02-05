"use client";
import Aboutme from "../components/layout/aboutme";

export default function Page() {
  return (
    <div className="no-scrollbar bg-secondary">
      <Aboutme
        showFindMore={false}
        description={
          <div className="grid gap-4">
            <p className="">I’m Newman Ogbo, a Product & Visual Designer with a strong interest in how ideas evolve into usable, meaningful digital products. My journey into design began not with aesthetics, but with curiosity about how people interact with systems, how technology shapes behavior, and how thoughtful structure can simplify complex problems.</p>
            <p>Early on, I became drawn to observing everyday challenges around access, connection, and usability. This curiosity gradually led me to design, where I found a discipline that allowed me to combine problem-solving, visual communication, and systems thinking into practical outcomes. Over time, my work expanded across web and mobile products, often within early-stage or founder-led environments where design decisions directly shaped the product’s direction.</p>
            <h6 className="text-primary-text">Lipaworld — Product & Visual Designer (Founder-led)</h6>
            <p>At Lipaworld, I worked as a Product & Visual Designer on a fintech-adjacent marketplace focused on enabling access to everyday services across African countries. As a founder-led project, my role extended beyond interface design into product definition and long-term thinking. I led the decision to position the marketplace as the primary experience, intentionally abstracting financial complexity by placing the wallet and payment infrastructure in a supporting role. I designed scalable category structures, navigation systems, and visual hierarchies that could grow as new services were introduced. This experience strengthened my ability to design for trust, clarity, and scale within real-world constraints.</p>
            <h6 className="text-primary-text">Meetro — Product Designer and Founder</h6>
            <p>At Meetro, I worked as a Product Designer on a community-driven platform aimed at helping people discover events and form real-life connections. My role involved defining user flows for event discovery, RSVPs, and profiles, while balancing usability with approachability. I contributed to core product decisions such as enabling users to be both event creators and attendees within a single profile, and supporting both public and private events. This project deepened my understanding of community design, social interaction patterns, and how digital products can encourage meaningful offline engagement.</p>
            <h6 className="text-primary-text">Rivala — UI Designer</h6>
            <p>At Rivala, I worked as a UI Designer on a platform built to connect companies with affordable talent across different countries. I was responsible for designing the end-to-end interface for the MVP, translating product requirements into clear layouts, consistent components, and a cohesive visual language. This role sharpened my attention to visual hierarchy, system consistency, and clarity in multi-sided platforms where trust and efficiency are critical.</p>
            <h6 className="text-primary-text">Caretaker — UI Designer</h6>
            <p>At Caretaker, a property management platform, I worked as a Product Designer contributing to the second version of the MVP. My focus was on refining workflows, improving information architecture, and enhancing usability for multiple user roles, including property managers and tenants. Working on an existing product taught me how to design within established constraints, iterate responsibly, and improve systems without disrupting core functionality.</p>
            <h6 className="text-primary-text">Today</h6>
             <p>Across these experiences, my approach to design has become grounded in systems thinking, clarity, and real-world application. I see design as both a strategic and expressive discipline—one that requires understanding context, users, and constraints, while leaving room for exploration and craft. As I continue to grow, I’m interested in deepening my practice through academic exploration and research-led thinking, while remaining closely connected to building products that people genuinely use.</p>
          </div>
        }
      />
    </div>
  );
}