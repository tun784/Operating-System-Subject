import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss'
import Exclusive from './components/exclusive/Exclusive';
import NoExclusive from './components/noexclusive/NoExclusive'
import Menu from './components/menu/Menu';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="/exclusive" element={<Exclusive />} />
          <Route path="/noexclusive" element={<NoExclusive />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;