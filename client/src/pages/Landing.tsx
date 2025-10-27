import Nav from "../components/Nav";
import Hero from "../components/Hero";
import StackAndProjects from "../components/StackAndProjects";
import GitRepos from "../components/GitRepos";
import Footer from "../components/Footer";
import { usePageSetup } from "../hooks/usePageSetup";
import { useTheme } from "../hooks/useTheme";

const Landing = () => {
  const { isScrolled } = usePageSetup();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full overflow-hidden">
      <Nav
        isScrolled={isScrolled}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />

      <main className="pt-[120px] px-[1rem] sm:px-[3rem]">
        <Hero />

        <StackAndProjects />

        <GitRepos />

        <Footer />
      </main>
    </div>
  );
};

export default Landing;
