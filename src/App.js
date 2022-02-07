import React, {useState} from "react";
import './App.styles.scss';
import {getWords} from "./data/words";

function App() {
    const originalArray = getWords()
    const shuffleArray = originalArray.sort((a, b) => 0.5 - Math.random());
    const [word, setWord] = useState(shuffleArray[0])

    // TODO - need fix previous and next move - rather use useMemo()

    const moveBack = () => {
        let i = shuffleArray.indexOf(word)

        if (i !== 0 && i < shuffleArray.length) {
            setWord(shuffleArray[i - 1])
        }
    }

    const moveNext = () => {
        let i = shuffleArray.indexOf(word)

        if (i >= 0 && i < shuffleArray.length - 1) {
            setWord(shuffleArray[i + 1])
        }
    }

    return (
        <div className="container">
            <header className="header">header</header>
            <main className="main--wrapper">
                <div>{word.english}</div>
                <div>{word.czech}</div>
            </main>
            <div className="btn--wrapper">
                <button className="btn" onClick={moveBack}>Back</button>
                <button className="btn" onClick={moveNext}>Next</button>
            </div>
        </div>
    );
}

export default App;
