import './App.css'
import Flights from './components/Flights'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        {/* Menü (Link'ler ile sayfalar arasında geçiş yapabilirsin) */}
        <nav>
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>
              <Link to="/flights">Uçuşlarım</Link>
            </li>
          </ul>
        </nav>

        {/* Routes ile yönlendirmeleri tanımla */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
