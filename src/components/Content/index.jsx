import { useEffect, useRef, useState } from "react";
import styles from "./Content.module.css";
import playButton from "/images/icon-play.svg";
import pauseButton from "/images/pause.png";
import newWindow from "/images/icon-new-window.svg";
import keyboardImg from "/images/keyboard.png";
import errorSmile from "/images/smile.png"

function index({ darkMode, font }) {
  const [error, setError] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const [data, setData] = useState(null);
  const [openContent, setOpenContent] = useState(false);
  const [notFoundWord, setNotFoundWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [keyInWord, setKeyInWord] = useState({ word: "" });
  const [pause, setPause] = useState(false);
  const inputRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.key === "Enter") {
        if (inputWord.trim() === "") {
          setError(true);
        } else {
          setError(false);
          getWord(inputWord);
          setOpenContent(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputWord]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        inputRef.current.focus();
      }
      if (e.key.toLowerCase() === "escape") {
        e.preventDefault();
        inputRef.current.blur();
      }
      if (e.shiftKey && e.key === ">") {
        e.preventDefault();
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
          audioRef.current.play();
          setPause(true);
        }
      }
      if (e.shiftKey && e.key === "<") {
        e.preventDefault();
        if (!audioRef.current) return;

        if (audioRef.current.play) {
          audioRef.current.pause();
          setPause(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function sendWord(word) {
    console.log(word);

    if (word.trim() !== "") {
      getWord(word);
      setOpenContent(true);
      setError(false);
    } else {
      setError();
    }
  }

  function getWord(word) {
    setLoading(true);
    setData(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setNotFoundWord(false);
        setOpenContent(true);
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        setNotFoundWord(true);
        setOpenContent(false);
        setLoading(false);
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function audioPlay() {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPause(true);
    } else {
      audioRef.current.pause();
      setPause(false);
    }
  }

  return (
    <div className={styles.container} style={{ fontFamily: font }}>
      <input
        ref={inputRef}
        className={`${styles.wordInput} ${
          darkMode ? styles["dark-mode"] : ""
        } ${error ? styles["error"] : ""}`}
        type="text"
        placeholder="Search for any word…"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />

      {error && (
        <span className={styles.errorMessage}>Whoops, can't be empty...</span>
      )}

      <audio
        ref={audioRef}
        key={data?.[0]?.word}
        src={data?.[0]?.phonetics?.find((p) => p.audio)?.audio}
        onEnded={() => {
          setPause(false);
        }}
      ></audio>

      <div className={styles.miniContainer}>
        <div
          className={`${openKeyboard ? styles["keyCont"] : styles["hidden"]}`}
        >
          <span className={styles.tempDisplay}>{keyInWord.word}</span>
          <div
            className={styles.keyboard}
            onClick={(evt) => {
              const key = evt.target.getAttribute("data-font");
              if (!key) return;

              setKeyInWord((prev) => {
                if (key === "Close") {
                  return { ...prev, word: "" };
                } else if (key === "Enter") {
                  setInputWord(prev.word);
                  sendWord(prev.word);
                  setOpenKeyboard(false);
                  return prev;
                } else {
                  return { ...prev, word: prev.word + key };
                }
              });
            }}
          >
            <div data-font="a" className={styles.key}>
              A
            </div>
            <div data-font="b" className={styles.key}>
              B
            </div>
            <div data-font="c" className={styles.key}>
              C
            </div>
            <div data-font="d" className={styles.key}>
              D
            </div>
            <div data-font="e" className={styles.key}>
              E
            </div>
            <div data-font="f" className={styles.key}>
              F
            </div>
            <div data-font="g" className={styles.key}>
              G
            </div>
            <div data-font="h" className={styles.key}>
              H
            </div>
            <div data-font="i" className={styles.key}>
              I
            </div>
            <div data-font="j" className={styles.key}>
              J
            </div>
            <div data-font="k" className={styles.key}>
              K
            </div>
            <div data-font="l" className={styles.key}>
              L
            </div>
            <div data-font="m" className={styles.key}>
              M
            </div>
            <div data-font="n" className={styles.key}>
              N
            </div>
            <div data-font="o" className={styles.key}>
              O
            </div>
            <div data-font="p" className={styles.key}>
              P
            </div>
            <div data-font="q" className={styles.key}>
              Q
            </div>
            <div data-font="r" className={styles.key}>
              R
            </div>
            <div data-font="s" className={styles.key}>
              S
            </div>
            <div data-font="t" className={styles.key}>
              T
            </div>
            <div data-font="u" className={styles.key}>
              U
            </div>
            <div data-font="v" className={styles.key}>
              V
            </div>
            <div data-font="w" className={styles.key}>
              W
            </div>
            <div data-font="x" className={styles.key}>
              X
            </div>
            <div data-font="y" className={styles.key}>
              Y
            </div>
            <div data-font="z" className={styles.key}>
              Z
            </div>
            <div data-font="Enter" className={styles.key}>
              Enter
            </div>
            <div data-font="Close" className={styles.key}>
              BckSpc
            </div>
          </div>
        </div>

        <span
          onClick={() => {
            setOpenKeyboard(!openKeyboard);
            setKeyInWord({ ...prev, word: "" });
          }}
          className={`${
            openKeyboard
              ? styles["keyboardButton"]
              : styles["keyboardButtonHidden"]
          }`}
        >
          <img src={keyboardImg} width={48} height={48} alt="keyboard icon" />
        </span>
      </div>

      {loading && (
        <h1
          style={{
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          Loading...
        </h1>
      )}
      {openContent && data && (
        <div className={styles.contents}>
          <div className={styles.mainContent}>
            <span>
              <h1 className={styles.word}>{data?.[0]?.word}</h1>
              <p className={styles.readingWord}>{data?.[0]?.phonetic}</p>
            </span>

            <img
              className={styles.playButton}
              width={70}
              height={70}
              onClick={audioPlay}
              src={`${pause ? pauseButton : playButton}`}
              style={{
                cursor: "pointer",
              }}
              alt="play icon"
            />
          </div>
          <div>
            <span className={styles.horGroup}>
              <p
                className={`${styles.wordGroup} ${
                  darkMode ? styles["dark-mode"] : ""
                }`}
              >
                {data?.[0]?.meanings?.[0]?.partOfSpeech}
              </p>
              <span
                className={`${styles.horizontal} ${
                  darkMode ? styles["dark-mode"] : ""
                }`}
              ></span>
            </span>

            <div>
              <h4 className={styles.meaning}>Meaning</h4>

              <ul className={styles.meaningList}>
                {data?.[0]?.meanings?.[0]?.definitions.map((definit, index) => {
                  return (
                    <li
                      key={index}
                      className={styles.meaningLi}
                      style={{ fontFamily: font }}
                    >
                      <p
                        className={`${styles.title} ${
                          darkMode ? styles["dark-mode"] : ""
                        }`}
                        style={{
                          marginBottom: "5px",
                        }}
                      >
                        {definit.definition}
                      </p>
                      {definit.example && (
                        <span className={styles.example}>
                          "{definit.example}"
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              {data?.[0].meanings[0].synonyms?.length > 0 && (
                <div className={styles.synonyms}>
                  <p className={styles.synonym}>Synonyms</p>
                  {data?.[0].meanings[0].synonyms.map((synonym, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          setInputWord(synonym);
                          sendWord(synonym);
                        }}
                        className={styles.synn}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {synonym}
                      </span>
                    );
                  })}
                </div>
              )}

              {data?.[0].meanings[0].antonyms?.length > 0 && (
                <div className={styles.antonyms}>
                  <p className={styles.antonym}>Antonyms</p>
                  {data?.[0].meanings[0].antonyms.map((antonym, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          setInputWord(antonym);
                          sendWord(antonym);
                        }}
                        className={styles.antony}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {antonym}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {data?.[0]?.meanings?.[1]?.definitions?.length > 0 && (
            <div className={styles.verGroup}>
              <span className={styles.horGroup}>
                <p
                  className={`${styles.wordGroup} ${
                    darkMode ? styles["dark-mode"] : ""
                  }`}
                >
                  {data?.[0]?.meanings[1]?.partOfSpeech}
                </p>
                <span
                  className={`${styles.horizontal} ${
                    darkMode ? styles["dark-mode"] : ""
                  }`}
                ></span>
              </span>

              <div>
                <h4 className={styles.meaning}>Meaning</h4>

                <ul className={styles.meaningList}>
                  {data?.[0]?.meanings?.[1]?.definitions?.map(
                    (definit, index) => {
                      return (
                        <li
                          key={index}
                          className={styles.meaningLi}
                          style={{ fontFamily: font }}
                        >
                          <p
                            className={`${styles.title} ${
                              darkMode ? styles["dark-mode"] : ""
                            }`}
                            style={{
                              marginBottom: "5px",
                            }}
                          >
                            {definit.definition}
                          </p>
                          {definit.example && (
                            <span className={styles.example}>
                              "{definit.example}"
                            </span>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>

                {data?.[0]?.meanings?.[1]?.synonyms?.length > 0 && (
                  <div className={styles.synonyms}>
                    <p className={styles.synonym}>Synonyms</p>
                    {data?.[0].meanings[1].synonyms.map((synonym, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            setInputWord(synonym);
                            sendWord(synonym);
                          }}
                          className={styles.synn}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {synonym}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {data?.[0]?.meanings?.[1]?.antonyms?.length > 0 && (
                <div className={styles.antonyms}>
                  <p className={styles.antonym}>Antonyms</p>
                  {data?.[0].meanings[1].antonyms.map((antonym, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          setInputWord(antonym);
                          sendWord(antonym);
                        }}
                        className={styles.antony}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {antonym}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <span className={styles.endLine}></span>
          <span className={styles.source}>
            <p>Source</p>
            <span className={styles.link}>
              <a
                className={`${styles.aLink} ${
                  darkMode ? styles["dark-mode"] : ""
                }`}
                target="_blank"
                href={`https://en.wiktionary.org/wiki/${inputWord}`}
              >{`https://en.wiktionary.org/wiki/${inputWord}`}</a>
              <img src={newWindow} alt="new window icon" />
            </span>
          </span>
        </div>
      )}

      {notFoundWord && !loading && (
        <div
          className={`${styles.notFoundCont} ${
            darkMode ? styles["dark-mode"] : ""
          }`}
        >
          <img src={errorSmile} alt="emoji-image" />
          <h2>No Definitions Found</h2>
          <p>
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at later time or head to
            the web instead.
          </p>
        </div>
      )}
    </div>
  );
}

export default index;
