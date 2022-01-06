import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Ratio from "react-bootstrap/Ratio";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

function App() {
  const [photos, setPhotos] = useState();

  async function getData() {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?count=20&api_key=${process.env.REACT_APP_NASA_APIKEY}`);
    const data = await response.json();
    console.log(data);
    setPhotos(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h2>NASA Photo Explorer</h2>
      <Row xs={1} md={4} className="g-4">
        {photos ? (
          photos.map((pic) => {
            return <PhotoCard pic={pic} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </div>
  );
}

function PhotoCard(props) {
  const [like, setLiked] = useState(false);

  function likeHeart() {
    setLiked(like ? false : true);
  }

  return (
    <Col>
      <Card>
        <Card.Img aspectRatio="16x9" variant="top" src={props.pic.url} />
        <Card.Body>
          <Card.Title>{props.pic.title}</Card.Title>
          <Card.Text>{props.pic.explanation}</Card.Text>
          {like ? <HeartFill className="text-danger" onClick={likeHeart} /> : <Heart onClick={likeHeart} />}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default App;
