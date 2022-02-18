import React from "react";

type HintProps = {
  visibleHint: {
    translate: boolean,
    letter: boolean
  },
  word: string
}

const Hints = ({visibleHint, word}: HintProps) => {
  const getFirstLetter = (string: string) =>  string.charAt(0).toUpperCase()

  return (
    <>
      { visibleHint.translate ? <div className="word">{word}</div> : <></> }
      { visibleHint.letter ? <div className="word">{getFirstLetter(word)}</div> : <></> }
    </>
  )
}

export default Hints
