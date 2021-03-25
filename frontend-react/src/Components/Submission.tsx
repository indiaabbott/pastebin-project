import React, { useState, useEffect } from 'react';

interface UserSubmission {
    id: number,
    title: string,
    submission: string
};

function InputSubmission() {

    const [title, setTitle] = useState("");
    const [submission, setSubmission] = useState("")
    const [list, setList] = useState<UserSubmission[]>([])
    console.log("InputSubmission rendering")

//get all submissions from database
    async function getSubmissions() {
        console.log("getSubmissions rendering")
        try {
            const response = await fetch('http://localhost:5000/');
            const jsonData = await response.json();
            //console.log(jsonData);
            setList(jsonData)
        } catch (error) {
            console.error(error.message);
            
        }
    };
   useEffect(() => {getSubmissions()}, []);

//inserts new submission into database
    async function handleButtonClick() {
       try {
           const body = {title, submission}; //body holds this object that we do some stuff with
           await fetch('http://localhost:5000/submit', {
               method: 'POST',
               body: JSON.stringify(body),
               headers: {
                   "Content-Type": "application/json"
               },
           });
           getSubmissions()
        
           
       } catch (error) {
           console.error(error.message)
       } 
       setTitle("");
       setSubmission("");
    };

    return (<div>
        <h1>Input Submission</h1>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea rows={10} cols={50} value={submission} onChange={e => setSubmission(e.target.value)}></textarea>
        <button onClick={handleButtonClick}>Submit</button>
        <ul>
            {list.map(avocado => <li key={avocado.id}>{avocado.title}</li>)}
            </ul>
    </div>)
}

export default InputSubmission