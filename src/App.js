import React, {useMemo, useState} from "react";
import './App.styles.scss';
import {getWords} from "./data/words";
import Hints from "./components/Hints";

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

  const getIndex = (array, item) => array.indexOf(item)

  const moveBack = () => {
    hideAllHints()
    setNextClick(false)

    let index = getIndex(shuffledCards, word)

    index !== 0 && index < shuffledCards.length
      ? setWord(shuffledCards[index - 1])
      : setBackClick(true)
  }

  const moveNext = () => {
    hideAllHints()
    setBackClick(false)

    let index = getIndex(shuffledCards, word)

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

  return (
    <>
      <main className="main--wrapper">
        <div className="word">{word.english}</div>
        <div className="btn--hints">
          <button className="btn" onClick={getFirstLetterOfTranslate}>Aa</button>
          <button className="btn" onClick={showAndHideTranslate}>Hint</button>
        </div>
        <Hints
          word={word.czech}
          visibleHint={visibleHint}
          visibleLetter={visibleLetter}
        />
      </main>
      <div className="btn--wrapper">
        <button className="btn" onClick={moveBack} disabled={backClick}>Back</button>
        <button className="btn" onClick={moveNext} disabled={nextClick}>Next</button>
      </div>
    </>
  )
}

export default App
