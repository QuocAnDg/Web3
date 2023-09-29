/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ changeCount , delta, text}) => <button onClick={changeCount} data-delta={delta}>{text}</button>
const App = () => {
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem("counter")))
  console.log(counter);
  const changeCount = (delta) => {
      setCounter(counter + delta)
  }
  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
  });

  const handleClick = (e) => {
    const delta = parseInt(e.target.dataset.delta, 10)
    changeCount(delta)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button changeCount={handleClick} text="plus" delta ="1"/>
      <Button changeCount={handleClick} text="minus" delta ="-1"/>
      <Button changeCount={handleClick} text="zero" delta ={-counter}/>

    </div>
  )
} 

export default App