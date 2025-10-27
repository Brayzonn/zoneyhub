import Nav from "../components/Nav";
import Hero from "../components/Hero";
import { usePageSetup } from "../hooks/usePageSetup";
import { useTheme } from "../hooks/useTheme";
import { lazy, Suspense } from "react";
const StackAndProjects = lazy(() => import("../components/StackAndProjects"));
const GitRepos = lazy(() => import("../components/GitRepos"));
const Footer = lazy(() => import("../components/Footer"));

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

        <Suspense fallback={<div className="h-20" />}>
          <StackAndProjects />
          <GitRepos />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Landing;
