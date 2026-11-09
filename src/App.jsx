import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import StoriesList from './pages/StoriesList'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <NavBar />
      <div className='MainContent'>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
       
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
