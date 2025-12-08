import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Playground" element={<Playground />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
