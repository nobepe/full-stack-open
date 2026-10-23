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
    </div>
  )
}


export default App