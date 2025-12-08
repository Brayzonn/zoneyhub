import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioProvider";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";

function App() {
  return (
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
  );
}

export default App;
