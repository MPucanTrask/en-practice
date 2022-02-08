import React from "react";

const Hints = ({visibleHint, word}) => {
  const getFirstLetter = string =>  string.charAt(0).toUpperCase()

  return (
    <>
      { visibleHint.translate ? <div className="word">{word}</div> : <></> }
      { visibleHint.letter ? <div className="word">{getFirstLetter(word)}</div> : <></> }
    </>
  )
}

export default Hints