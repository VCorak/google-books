import React, { useState } from "react";
import axios from 'axios';
import { Card } from 'react-bootstrap';

function GoogleBooks() {
    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState(process.env.REACT_APP_GOOGLEBOOKS_API_KEY);

    function handleChange(event) {
        const book = event.target.value;
        setBook(book);
        const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY;
        setApiKey(apiKey);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=5")
            .then(data => {
                console.log(data.data.items);
                setResult(data.data.items);
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-header main-search">
                <div className="row">
                    <div className="col-12 col-md-3 col-xl-3">
                        <input onChange={handleChange} className="AutoFocus form-control" placeholder="Type something..." type="text" />
                    </div>
                    <div className="ml-auto">
                        <input type="submit" value="Search" className="btn btn-primary search-btn" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {result.map(book => (
                        <div className="col-sm-2">
                            <Card style={{ 'marginTop': '10px' }}>

                                <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />
                                <Card.Body>
                                    <h5 className="card-title">{book.volumeInfo.title}</h5>
                                    <a className="btn btn-primary">About</a>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}


export default GoogleBooks;