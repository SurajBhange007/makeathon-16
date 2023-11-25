import React, { useState } from 'react'
import calling from '../Calling-PNG-HD.png'
import ending from '../Calling-PNG-Transparent-Image.png'
import d from '../54975381e47c4c30a9fee257adca1f71.png'

const PPTWindow = (props) => {
  const [count, setCount] = useState(1);
  return (
    <div className='' style={{backgroundImage: `url("../6a42f966f7dd40babc9e82f4a3b0f5ab.png")`}}>
    {/* <div> <img style={{height: '100%', width: '100%'}}  src={d} alt="fireSpot"/> */}
  <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: "center", position: 'absolute',
right: '50%',left: '50%',
bottom: '30%'}}>
    {count < 3 && <img  onClick={() => {
      props.handleCalling(!props.isCalling)
      setCount(count + 1)
    }} src={!props.isCalling ? calling : ending} style={{height: '100px', width: '100px'}} alt="fireSpot"/>
  }</div>
    </div>
  )
}

export default PPTWindow;


