import Hero from "../components/Hero";
import SiteLayout from "../components/SiteLayout";
import LoadingScreen from "../components/common/LoadingScreen";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  const [isPageLoading, setIsPageLoading] = useState(() => {
    return !sessionStorage.getItem("hasSeenLoading");
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoading", "true");
    setIsPageLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isPageLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <SiteLayout>
          <Helmet>
            <title>Eyinda Bright | Software Developer </title>
            <meta
              name="description"
              content="Eyinda Bright is a software developer building reliable backend systems and frontend applications."
            />
          </Helmet>
          <Hero />
        </SiteLayout>
      )}
    </AnimatePresence>
  );
};

export default Landing;
