import React, { useState, useEffect } from 'react';
import './PasteBinApp.css';

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




//get all submissions from database function
    async function getSubmissions() {
        console.log("getSubmissions rendering")
        try {
            const response = await fetch('http://localhost:5000/');
            const jsonData = await response.json(); //reads and takes JSON out of body of HTTP request to make you a JS object
            setList(jsonData)
        } catch (error) {
            console.error(error.message);
            
        }
    };


   useEffect(() => {getSubmissions()}, []);

//inserts new content into database
    async function handleSubmitClick() {
       try {
           const body = {title, content}; //body holds this object that we do some stuff with
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

     //delete submissions from database function on click of button
    async function handleDeleteSubmission(id: number) {
        try {
            await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });
        } catch (error) {
            console.error(error.message);
        }
        getSubmissions()
    }

    async function handleListItemClick(avocado: UserSubmission) {
        setSelectedAvocado(avocado);
    };

    // function checkAvocado() {
    //     console.log(selectedAvocado);
    //     if (selectedAvocado !== undefined) {
    //         return selectedAvocado.content
    //         };
    // };

    return (<div>
        <h1>New Paste</h1>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <textarea rows={10} cols={50} value={content} onChange={e => setContent(e.target.value)}></textarea>
        <button onClick={handleSubmitClick}>Submit</button>
        <ul>
            {list.map(avocado => <>
            <li key={avocado.id} onClick={() => handleListItemClick(avocado)}>{avocado.title}</li>
            <button onClick={() => handleDeleteSubmission(avocado.id)}>Delete</button></>)}
            </ul>
            <p>
            {selectedAvocado?.content}
            </p>
    </div>)
};

export default PasteBinApp