import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Registration from './components/Registration';
import Navb from './components/Navb';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
     <Router>
      <Navb/>
          <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard/>} />

          </Routes>
          </Router>
    </div>
  );
}

export default App;
