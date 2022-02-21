import React, {useEffect, useMemo, useState} from "react";
import Hints from "./components/Hints";
import useSpeechSynthesis from 'beautiful-react-hooks/useSpeechSynthesis';

import wordsB1 from "./data/wordsB1.json";
import {getWordParameters} from "./services/WordParamServices";
import sound from './icons/sound.png'

import './App.styles.scss';

export type WordParam = {
  definitions: string[]
}

function App(token: any) {
  const [hint, setHint] = useState({translate: false, letter: false})
  const [click, setClick] = useState({back: true, next: false})
  const [wordParam, setWordParam] = useState([]);

  const shuffle = (arr: Array<any>) => arr.sort(() => 0.5 - Math.random())
  const shuffledCards = useMemo<Array<any>>(() => shuffle(wordsB1), [])

  const [word, setWord] = useState(shuffledCards[0])

  const hideAllHints = () => setHint({ translate: false, letter: false })

  const moveBack = () => {
    hideAllHints()
    setClick({back: click.back, next: false})

    let index = shuffledCards.indexOf(word)

    index !== 0 && index < shuffledCards.length
      ? setWord(shuffledCards[index - 1])
      : setClick({back: true, next: click.next})
  }

  useEffect(() => {
    getWordParameters(word.english).then(data => setWordParam(data))
  },[word])

  const moveNext = () => {
    hideAllHints()
    setClick({back: false, next: click.next})

    let index = shuffledCards.indexOf(word)

    index < shuffledCards.length - 1
      ? setWord(shuffledCards[index + 1])
      : setClick({back: click.back, next: true})
  }

  const showAndHideTranslate = () => setHint({translate: !hint.translate, letter: false})
  const getFirstLetterOfTranslate = () => setHint({translate: false, letter: !hint.letter})
  const { speak } = useSpeechSynthesis(word.english, { rate: .35, pitch: 15, volume: 2 });

  // @ts-ignore
  const { definitions } = wordParam

  return (
    <>
      <main className="main--wrapper">
        <section className="description">
          <h4>Definition:</h4>
          <div>
            {definitions && definitions[0]?.definition}
          </div>
          {definitions &&
            <>
              <h4>Example:</h4>
              <div>
                {definitions && definitions[0]?.example}
              </div>
            </>
          }
        </section>
        <div className="word">{word.english}</div>
        <div className="btn--hints">
          <button className="btn" onClick={speak}>
            <img src={sound} alt="sound" width={18} />
          </button>
          <button className="btn" onClick={getFirstLetterOfTranslate}>Aa</button>
          <button className="btn" onClick={showAndHideTranslate}>Hint</button>
        </div>
        <Hints word={word.czech} visibleHint={hint} />
      </main>
      <div className="btn--wrapper">
        <button className="btn" onClick={moveBack} disabled={click.back}>Back</button>
        <button className="btn" onClick={moveNext} disabled={click.next}>Next</button>
      </div>
    </>
  )
}

export default App
