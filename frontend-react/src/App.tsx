import React, {useState, useEffect} from 'react';
import './App.css';
import ListSubmissions from './Components/DisplayList';
import InputSubmission from './Components/Submission';

interface UserSubmission {
  submission_id: number,
  title: string,
  submission: string
};

function App() {
  const [list, setList] = useState<UserSubmission[]>([])
    
  async function getSubmissions() {
      try {
         const response = await fetch('http://localhost:5000/');
         const jsonData = await response.json();
        setList(jsonData)
      } catch (error) {
          console.error(error.message);
          
      }
  };
  useEffect(() => {getSubmissions()}, []);
  
  return (
    <div className="App">
     <InputSubmission getSubmission={getSubmissions}/> 
           <div>
            <ul>
            {list.map(avocado => <li key={avocado.submission_id}>{avocado.title}</li>)}
            </ul>
        </div>
    </div>
  );
}

export default App;
