import React from "react";

const Hints = ({visibleHint, visibleLetter, word}) => {
  const getFirstLetter = string =>  string.charAt(0).toUpperCase()

  return (
    <>
      { visibleHint ? <div className="word">{word}</div> : <></> }
      { visibleLetter ? <div className="word">{getFirstLetter(word)}</div> : <></> }
    </>
  )
}

export default Hints