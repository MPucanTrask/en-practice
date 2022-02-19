import React from "react";

type HintProps = {
  visibleHint: {
    translate: boolean,
    letter: boolean
  },
  word: string[]
}

const Hints = ({visibleHint, word}: HintProps) => {
  const getFirstLetter = (string: string) =>  string.charAt(0).toUpperCase()

  return (
    <>
      { visibleHint.translate
        ? <ul className="word flex-center">{word.map((item) => <li key={item}>{item}</li>)}</ul>
        : <></>
      }
      {
        visibleHint.letter ? <div className="word">{getFirstLetter(word[0])}</div> : <></>
      }
    </>
  )
}

export default Hints
