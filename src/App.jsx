import { useState } from 'react'

import StoriesList from './pages/StoriesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <StoriesList/>
    </div>
  )
}

export default App
