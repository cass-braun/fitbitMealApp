import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Callback from './components/Callback';

/**
 * Main application component that sets up routing for the Fitbit authentication app.
 * Handles navigation between the home page and the OAuth callback page.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
