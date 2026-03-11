import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioProvider";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { SoundProvider } from "./contexts/Soundprovider";

function App() {
  return (
    <SoundProvider>
      <AudioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Landing />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Router>
      </AudioProvider>
    </SoundProvider>
  );
}

export default App;
