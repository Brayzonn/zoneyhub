import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioProvider";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";
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
          </Routes>
        </Router>
      </AudioProvider>
    </SoundProvider>
  );
}

export default App;
