import styles from "./Header.module.css";
import dicLogo from "/images/logo.svg";
import iconDown from "/images/icon-arrow-down.svg";
import darkModeOff from "/images/darkModeOff.svg";
import darkModeOn from "/images/darkModeOn.svg";
import darkModeMoon from "/images/icon-darkmode-moon.svg";
import moonIcon from "/images/icon-moon.svg";
import { useEffect, useState } from "react";

function Header({ darkMode, setDarkMode, font, setFont }) {
  const [fontSel, setFontSel] = useState(false);
  const [fontName, setFontName] = useState("Serif");
  const [showKeys, setShowKeys] = useState(false);

  function handleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  }

  function handleFontClick() {
    if (fontSel) {
      setFontSel(false);
    } else {
      setFontSel(true);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        setShowKeys(true);
      }
      if (e.shiftKey && e.key == "!") {
        e.preventDefault();
        setFont("sans-serif");
        setFontName("Sans Serif");
      }
      if (e.shiftKey && e.key == "@") {
        e.preventDefault();
        setFont("serif");
        setFontName("Serif");
      }
      if (e.shiftKey && e.key == "#") {
        e.preventDefault();
        setFont("monospace");
        setFontName("Mono");
      }
      if (e.ctrlKey && e.key.toLowerCase() == "q") {
        e.preventDefault();
        setDarkMode(true);
      }
      if (e.ctrlKey && e.key.toLowerCase() == "b") {
        e.preventDefault();
        setDarkMode(false);
      }
      if (e.ctrlKey && e.key.toLowerCase() == "x") {
        e.preventDefault();
        setShowKeys(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header>
      <div className={styles.container} style={{ fontFamily: font }}>
        <a href="#">
          <img src={dicLogo} alt="Book logo" />
        </a>

        <div className={styles.keysCont}>
          <span className={styles.hotKeys}>
            Hot Keys
            <p className={styles.hotKeysMess}>
              (<kbd style={{ color: "white" }}>Ctrl</kbd> +{" "}
              <kbd style={{ color: "white" }}>H</kbd>)
            </p>
          </span>

          {showKeys && (
            <div className={styles.hotKeysMessage}>
              <p>
                Input focus: <kbd>Ctrl</kbd> + <kbd>I</kbd>
              </p>
              <p>
                Release the input: <kbd>Esc</kbd>
              </p>
              <p>
                Search: <kbd>Enter</kbd>
              </p>
              <p>
                Scroll:{" "}
                <kbd>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </kbd>{" "}
                or{" "}
                <kbd>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </kbd>
              </p>
              <p>
                Fonts: <kbd>Shift</kbd> + <kbd>1</kbd>; <kbd>2</kbd>;{" "}
                <kbd>3</kbd>;
              </p>
              <p>
                Dark mode: <kbd>Ctrl</kbd> + <kbd>Q</kbd>
              </p>
              <p>
                Light mode: <kbd>Ctrl</kbd> + <kbd>B</kbd>
              </p>
              <p>
                Audio play: <kbd>Shift</kbd> + <kbd>&gt;</kbd>
              </p>

              <p>
                Audio pause: <kbd>Shift</kbd> + <kbd>&lt;</kbd>
              </p>

              <p>
                Hot Keys Close: <kbd>Ctrl</kbd> + <kbd>X</kbd>
              </p>
            </div>
          )}
        </div>

        <div className={styles.contDiv}>
          <div className={styles.selDiv}>
            <span onClick={handleFontClick} className={styles.selectCont}>
              <p className={styles.fontsSelect}>{fontName}</p>
              <img src={iconDown} alt="icon-down" />
            </span>

            {fontSel && (
              <div
                onClick={(evt) => {
                  setFont(evt.target.getAttribute("data-font"));
                  setFontName(evt.target.innerHTML);
                  setFontSel(false);
                }}
                className={`${styles.options} ${
                  darkMode ? styles["dark-mode"] : ""
                }`}
              >
                <p data-font="sans-serif" className={styles.option}>
                  Sans Serif
                </p>
                <p data-font="serif" className={styles.option}>
                  Serif
                </p>
                <p data-font="monospace" className={styles.option}>
                  Mono
                </p>
              </div>
            )}
          </div>

          <span className={styles.horizontalLine}></span>
          <span className={styles.checkbox}>
            <img
              className={styles.darSel}
              onClick={handleDarkMode}
              src={darkMode ? darkModeOn : darkModeOff}
              alt="selIcon"
            />
          </span>
          <img src={darkMode ? darkModeMoon : moonIcon} alt="moon-icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
