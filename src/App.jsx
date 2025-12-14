import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const darkMode = localStorage.getItem("darkMode");
    return darkMode !== null ? JSON.parse(darkMode) : false;
  });
  const [font, setFont] = useState("Serif");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="container">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        font={font}
        setFont={setFont}
      />
      <Content darkMode={darkMode} font={font} />
    </div>
  );
}

export default App;
