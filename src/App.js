import { Link } from 'react-router-dom';
import './App.css';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  return (
    <div className="App">
      <div className="nav-link">
        <Link to="/horizontal">等高瀑布流</Link>
      </div>

    </div>
  );
}

export default App;
