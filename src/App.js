import React, {useMemo, useState} from "react";
import './App.styles.scss';
import {getWords} from "./data/words";

function App() {
  const shuffle = arr => arr.sort(() => 0.5 - Math.random())

  const [visibleHint, setVisibleHint] = useState(false)
  const [visibleLetter, setVisibleLetter] = useState(false)
  const [backClick, setBackClick] = useState(true)
  const [nextClick, setNextClick] = useState(false)

  const shuffledCards = useMemo(() => {
    const words = getWords()
    return shuffle(words)
  }, [])

  const [word, setWord] = useState(shuffledCards[0])

  function hideAllHints() {
    setVisibleLetter(false)
    setVisibleHint(false)
  }

  const getCurrentIndex = (array, item) => array.indexOf(item)

  const moveBack = () => {
    hideAllHints()
    setNextClick(false)

    let index = getCurrentIndex(shuffledCards, word)

    index !== 0 && index < shuffledCards.length
      ? setWord(shuffledCards[index - 1])
      : setBackClick(true)
  }

  const moveNext = () => {
    hideAllHints()
    setBackClick(false)

    let index = getCurrentIndex(shuffledCards, word)

    index < shuffledCards.length - 1
      ? setWord(shuffledCards[index + 1])
      : setNextClick(true)
  }

  const showAndHideTranslate = () => {
    visibleLetter && setVisibleLetter(false)
    visibleHint ? setVisibleHint(false) : setVisibleHint(true)
  }

  const getFirstLetterOfTranslate = () => {
    visibleHint && setVisibleHint(false)
    visibleLetter ? setVisibleLetter(false) : setVisibleLetter(true)
  }

  const getFirstLetter = string =>  string.charAt(0).toUpperCase()

  return (
    <div className="container">
      <header className="header"></header>
      <main className="main--wrapper">
        <div className="word">{word.english}</div>
        <div className="btn--hints">
          <button className="btn" onClick={getFirstLetterOfTranslate}>Aa</button>
          <button className="btn" onClick={showAndHideTranslate}>Hint</button>
        </div>
        { visibleHint ? <div className="word">{word.czech}</div> : <></> }
        { visibleLetter ? <div className="word">{getFirstLetter(word.czech)}</div> : <></> }
      </main>
      <div className="btn--wrapper">
        <button className="btn" onClick={moveBack} disabled={backClick}>Back</button>
        <button className="btn" onClick={moveNext} disabled={nextClick}>Next</button>
      </div>
    </div>
  )
}

export default App
