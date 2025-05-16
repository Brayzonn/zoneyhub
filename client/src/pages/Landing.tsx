import { Link } from "react-router-dom";
import Projects from "../components/Projects";
import Showcase from "../components/Showcase";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="inconsolata absolute bg-primary-bg-color text-primary-text-color min-h-[100vh] w-full flex flex-col justify-start items-start overflow-hidden">
      <div className="relative h-full w-full overflow-hidden flex flex-col justify-start items-start p-[1rem] sm:px-[3rem]">
        <nav className="w-full min-h-[40px] flex items-center justify-between">
          <p>Bray</p>

          <Link
            className="font-mono text-[17px] text-primary-text-color hover:text-gray-500"
            to="/hobbies"
          >
            Hobbies
          </Link>
        </nav>

        <Showcase />

        <Skills />

        <Projects />

        <Footer />
      </div>
    </div>
  );
};

export default Landing;
