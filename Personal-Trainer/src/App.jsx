import { useState } from 'react'
import Customer from './components/Customer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Customer></Customer>
    </>
  )
}

export default App
