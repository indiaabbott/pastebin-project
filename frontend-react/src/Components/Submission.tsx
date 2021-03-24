import React, { useState } from 'react';

interface UserSubmission {
    title: string,
    submission: string
};

function InputSubmission(props: {getSubmission: () => Promise<void>}) {

    const [title, setTitle] = useState("");
    const [submission, setSubmission] = useState("")
    console.log(title)

    async function handleButtonClick() {
       try {
           const body = {title, submission}; //body holds this object that we do some stuff with
           const response = await fetch('http://localhost:5000/submit', {
               method: 'POST',
               body: JSON.stringify(body),
               headers: {
                   "Content-Type": "application/json"
               },
           });
           const jsonData = await response.json();
           props.getSubmission()
           
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
    </div>)
}

export default InputSubmission