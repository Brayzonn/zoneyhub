import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Hobbies from "./pages/Hobbies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
