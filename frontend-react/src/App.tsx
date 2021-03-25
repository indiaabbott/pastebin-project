import React from 'react';
import './App.css';
//import ListSubmissions from './Components/DisplayList';
import InputSubmission from './Components/Submission';


function App() {
  console.log("App rendering")
  return (
    <div className="App">
     <InputSubmission /> 
    </div>
  );
}

export default App;
