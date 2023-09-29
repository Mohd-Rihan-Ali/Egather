import streamContext from "./StreamContext";
import React, { useState } from 'react'

const StreamState = () => {
    const [streams, setStreams] = useState([]);
  return (
    <streamContext.Provider value={streams}>
      {props.children}
    </streamContext.Provider>
  )
}

export default StreamState
