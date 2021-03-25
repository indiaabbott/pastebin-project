import React, { useState, useEffect } from 'react';

interface UserSubmission {
    id: number,
    title: string,
    content: string
};

function PasteBinApp() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [list, setList] = useState<UserSubmission[]>([]);
    const [selectedAvocado, setSelectedAvocado] = useState<UserSubmission | undefined>(undefined)
    // const [clicked, setClicked] = useState({});
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

//inserts new content into database
    async function handleButtonClick() {
       try {
           const body = {title, submission: content}; //body holds this object that we do some stuff with
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
       setContent("");
    };

    async function handleListItemClick(avocado: any) {
    };

    return (<div>
        <h1>Input Submission</h1>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea rows={10} cols={50} value={content} onChange={e => setContent(e.target.value)}></textarea>
        <button onClick={handleButtonClick}>Submit</button>
        <ul>
            {list.map(avocado => <li key={avocado.id} onClick={() => handleListItemClick(avocado)}>{avocado.title}</li>)}
            </ul>
    </div>)
}

export default PasteBinApp