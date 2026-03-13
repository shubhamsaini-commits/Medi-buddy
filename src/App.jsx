import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import Output from './components/Output/Output'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import FutureScope from './components/FutureScope/FutureScope';

const App = () => {
  return (
    <div>
      <Router> {/* 1. The Router starts here */}
      <div>
        <Navbar /> {/* 2. Now Navbar is INSIDE, so <Link> will work! */}
        
        <Routes>
          <Route path="/" element={<><Main /><Output /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/futurescope" element={<FutureScope/> } />


        </Routes>

        <Footer />
      </div>
    </Router>



 </div>
  )
}

export default App
