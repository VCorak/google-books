import React, { useState } from "react";
import axios from 'axios';
import { Card } from 'react-bootstrap';

function GoogleBooks() {
    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState("AIzaSyCqC1suIcncgSJZbHnOHLEAoGWyCDbQFKE");

    function handleChange(event) {
        const book = event.target.value;
        setBook(book);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")
            .then(data => {
                console.log(data.data.items);
                setResult(data.data.items);
            })
    }
}


export default GoogleBooks;