import Navbar from './Navbar';
import WorkArea from './WorkArea';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <WorkArea/>
      </div>
    </Router>
  );
}

export default App;
