import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogViewer from "./pages/LogViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<LogViewer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
