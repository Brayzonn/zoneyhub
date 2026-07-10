import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AudioProvider } from "./contexts/AudioProvider";
import Landing from "./pages/Landing";
import { SoundProvider } from "./contexts/SoundProvider";
import { useAnalytics } from "./hooks/useAnalytics";

// Landing is the initial + wildcard route, so it stays in the main bundle.
// Secondary routes are code-split so their weight (drag canvas, blog rendering,
// etc.) only loads when visited.
const Playground = lazy(() => import("./pages/Playground"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function AnalyticsListener() {
  useAnalytics();
  return null;
}

const RouteFallback = () => <div className="min-h-svh w-full bg-bg" />;

function App() {
  return (
    <SoundProvider>
      <AudioProvider>
        <Router>
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
  );
}

export default App;
