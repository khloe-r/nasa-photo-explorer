import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Ratio from "react-bootstrap/Ratio";
import copy from "copy-to-clipboard";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Heart, HeartFill, Share } from "react-bootstrap-icons";

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
    <div className="App mx-5">
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
  const [show, setShow] = useState(false);
  const [url, setURL] = useState("Loading...");

  function likeHeart() {
    setLiked(like ? false : true);
  }

  const handleClose = () => setShow(false);
  const handleShow = (photoURL) => {
    setShow(true);
    setURL(photoURL);
  };

  return (
    <>
      <Col>
        <Card>
          <Card.Img aspectRatio="16x9" variant="top" src={props.pic.url} />
          <Card.Body>
            <Card.Title>
              {props.pic.title} - {props.pic.date}
            </Card.Title>
            <Card.Text>{props.pic.explanation}</Card.Text>
            <div class="d-flex justify-content-around align-items-center">
              {like ? <HeartFill className="text-danger" onClick={likeHeart} /> : <Heart onClick={likeHeart} />}

              {/* <a href={props.pic.url} target="_blank" rel="noopener noreferrer"> */}
              <Share onClick={() => handleShow(props.pic.url)} />
              {/* </a> */}
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share this photo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send this link to your friends: <br></br>
          <a href={url}>{url}</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => copy(url)}>
            Copy Link
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
