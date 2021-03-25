import React, { useState, useEffect } from 'react';

interface UserSubmission {
    id: number,
    title: string,
    submission: string
};

function ListSubmissions() {

    const [list, setList] = useState<UserSubmission[]>([])
    console.log("I have rerendered!")
    async function getSubmissions() {
        try {
            const response = await fetch('http://localhost:5000/');
            const jsonData = await response.json();
            setList(jsonData)
        } catch (error) {
            console.error(error.message);
            
        }
    };
    //getSubmissions()
   useEffect(() => {getSubmissions()}, []);

    return (
        <div>
            <ul>
            {list.map(avocado => <li key={avocado.id}>{avocado.title}</li>)}
            </ul>
        </div>
    )
};

export default ListSubmissions;