import logo from './logo.svg';
import './App.css';
import {Router,Routes,Route} from "react"
import TargetList from "../src/pages/TargetList"


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h6>Reach Labs</h6>
      </header>
      <TargetList/>
    </div>
  );
}

export default App;
