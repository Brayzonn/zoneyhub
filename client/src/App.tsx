import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AudioProvider } from "./contexts/AudioProvider";
import Landing from "./pages/Landing";
import { SoundProvider } from "./contexts/SoundProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { useAnalytics } from "./hooks/useAnalytics";

// Secondary routes are code-split; Landing stays in the main bundle
const Playground = lazy(() => import("./pages/Playground"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function AnalyticsListener() {
  useAnalytics();
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

const RouteFallback = () => <div className="min-h-svh w-full bg-bg" />;

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AudioProvider>
          <Router>
            <ScrollToTop />
            <AnalyticsListener />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                {/* Fallback: unknown paths render the landing page */}
                <Route path="*" element={<Landing />} />
              </Routes>
            </Suspense>
          </Router>
        </AudioProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
