import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

// Tilastojen näyttäminen on eriytetty oman komponenti Statistics vastuulle
const Statistics = (props) => {
  // Jos palautteita ei ole annettu, näytetään vain teksti "No feedback given"
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

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
      
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}


export default App