import { useState } from 'react'
import Loading from "../Loading/Loading";
import Statistics from 'components/Statistic/Statistics';
import Button from 'components/Button/Button';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [loading, setLoading] = useState(true);
  setTimeout(
    () => setLoading(!loading),
    3000
  )
  if  (loading) {
    return <Loading/>;
  } 
  const handleClick = (e) => {
    if (e.target.className === 'good') setGood(good + 1);
    else if (e.target.className === 'neutral') setNeutral(neutral + 1);
    else setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleClick} value="good" />

      <Button onClick={handleClick} value="neutral" />

      <Button onClick={handleClick} value="bad" />

      <h1>statistics</h1>
      <Statistics {...{ good, neutral, bad }} />
    </div>
  );

    
  } 
  
  export default App