"use client";

import Aboutme from "./components/aboutme";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Playground from "./components/playground";
import Projects from "./components/projects";

export default function Home() {
  return (
    <div className="no-scrollbar">
      <section className="px-50">
        <Hero />
        <Projects />
      </section>
      <section className="bg-secondary">
        <Playground />
        <Aboutme />
      </section>
    </div>
  );
}
