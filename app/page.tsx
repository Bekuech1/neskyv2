"use client";

import Aboutme from "./components/layout/aboutme";
import Hero from "./components/layout/hero";
import Playground from "./components/layout/playground";
import Projects from "./components/layout/projects";

export default function Home() {
  return (
    <div className="no-scrollbar">
      <section className="px-5 md:px-20">
        <Hero />
        <Projects />
      </section>
      <section>
        <Playground />
        <section className="bg-secondary">
          <Aboutme />
        </section>
      </section>
    </div>
  );
}
