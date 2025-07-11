import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Projects from "../components/Projects";
import Showcase from "../components/Showcase";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

import logoWhite from "../assets/images/logowhite.svg";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-[2rem] bg-primary-bg-color text-primary-text-color min-h-[100vh] w-full flex flex-col justify-start items-start overflow-hidden">
      <div className="relative h-full w-full overflow-hidden flex flex-col justify-start items-start">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 w-full min-h-[40px] flex items-center justify-between px-[1rem] sm:px-[3rem] py-4 border-b transition-all duration-300 ${
            isScrolled
              ? "bg-primary-bg-color/95 backdrop-blur-sm border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          <img src={logoWhite} alt="logo" className="w-4" />

          <Link
            className="font-mono text-[17px] text-primary-text-color hover:text-gray-500"
            to="/hobbies"
          >
            Hobbies
          </Link>
        </nav>

        <div className="w-full px-[1rem] sm:px-[3rem] pt-[80px]">
          <Showcase />
          <Skills />
          <Projects />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landing;
