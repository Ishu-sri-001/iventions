import Image from "next/image";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Navbar from "@/components/header/Navbar";
import Categories from "@/components/home/Categories";
import ProjectsDelievered from "@/components/home/ProjectsDelievered";
import CaseStudy from "@/components/home/CaseStudy";
import Insights from "@/components/home/Insights";
import QuoteContact from "@/components/home/QuoteContact";

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <About />
      <Categories />
      

      <CaseStudy />
      <Insights/>
      <QuoteContact />
      <ProjectsDelievered />

    </>
  );
}
