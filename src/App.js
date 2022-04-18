import "./App.css";
import Form from "./Components/Form";
import Home from "./Pages/Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path={"/"}
            element={<Form setUsername={setUsername} />}
          />
          <Route exact path={"/home"} element={<Home username={username} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
