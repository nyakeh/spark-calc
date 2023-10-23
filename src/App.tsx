import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spark Calc</h1>
        
        <nav className='App-nav'>
          <ul>
            <li>
                <Link to="/">&#129518; Coast FI</Link>
            </li>
            <li>
                <Link to="/compound">&#128200; Compound</Link>
            </li>
            <li>
                <Link to="/saving">&#128183; Saving</Link>
            </li>
            <li>
                <Link to="/fire">&#128293; FIRE</Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <Outlet />
    </div>
  );
}

export default App;
