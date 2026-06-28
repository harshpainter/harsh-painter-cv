import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CV from './pages/CV'
import ValueDeck from './pages/ValueDeck'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/valuedeck" element={<ValueDeck />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
