import Image from "next/image";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Navbar from "@/components/header/Navbar";
import Categories from "@/components/home/Categories";

export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <About />
      <Categories />
    </>
  );
}
