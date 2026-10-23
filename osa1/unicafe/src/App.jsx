import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  const arvosteluidenSumma = (good * 1) + (neutral * 0) + (bad * -1);
  // Jos arvosteluita on 0, palautetetaan keskiarvoksi 0, muuten lasketaan keskiarvo
  const average = all > 0 ? arvosteluidenSumma / all : 0;

  // Esim hyvä=2, kaikkia 10 -> 2/10*100 = 20%
  const positive = all > 0 ? (good / all) * 100 : 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" good/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" neutral/>
      <Button onClick={() => setBad(bad + 1)} text="bad" bad/>
      <h2>statistics</h2>

      <div> good {good} </div>
      <div> neutral {neutral} </div>
      <div> bad {bad} </div>
      <div> all {all} </div>
      <div> average {average} </div>
      <div> positive {positive} % </div>
    </div>
  )
}


export default App