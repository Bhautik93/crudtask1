import "./App.css";
import User from "./components/User";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import { Toaster } from "react-hot-toast";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
    <Toaster />
      <Router>
        <Routes>
          <Route exact path="/" element={<User />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/create/edit/:id" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
