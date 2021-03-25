import React from 'react';
import './App.css';
//import ListSubmissions from './Components/DisplayList';
import PasteBinApp from './Components/PasteBinApp';


function App() {
  console.log("App rendering")
  return (
    <div className="App">
     <PasteBinApp /> 
    </div>
  );
}

export default App;
