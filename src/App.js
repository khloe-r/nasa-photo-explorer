import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import copy from "copy-to-clipboard";
import { Row, Col, Card, Button, Modal, Spinner, Alert, Form } from "react-bootstrap";
import { Heart, HeartFill, Share } from "react-bootstrap-icons";

function App() {
  const [photos, setPhotos] = useState();
  const [loading, setLoading] = useState(true);
  const dateRef = useRef();
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let todayIsoDate = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;

  async function getData() {
    setLoading(true);
    const response = await fetch(`https://api.nasa.gov/planetary/apod?count=20&thumbs=True&api_key=${process.env.REACT_APP_NASA_APIKEY}`);
    const data = await response.json();
    setPhotos(data);
    setLoading(false);
  }

  async function getSearchData(date) {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?start_date=${date}&api_key=${process.env.REACT_APP_NASA_APIKEY}`);
      const data = await response.json();
      setPhotos(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const searchDate = () => {
    if (dateRef.current.value != "") {
      setLoading(true);
      getSearchData(dateRef.current.value);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App px-5 pt-5 bg-light">
      <h1>Spacestagram</h1>
      <p className="text-secondary mb-3">Brought to you by NASA's Astronomy Photo of the Day API</p>
      {!photos || loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Form className="mb-3">
          <Form.Group className="mb-2" controlId="searchDate">
            <Form.Label>Enter a start date to search!</Form.Label>
            <div className="d-flex justify-content-center px-5">
              <Form.Control className="d-flex justify-content-around search-bar" ref={dateRef} type="date" placeholder="YYYY-MM-DD" max={todayIsoDate} />
            </div>
          </Form.Group>

          <Button variant="dark" onClick={searchDate}>
            Search
          </Button>
          <Button variant="outline-dark" onClick={getData}>
            Reset
          </Button>
        </Form>
      )}
      <Row xs={1} md={2} lg={4} className="g-4">
        {photos ? (
          photos.map((pic, index) => {
            return <PhotoCard key={index} pic={pic} />;
          })
        ) : (
          <p></p>
        )}
      </Row>
      {photos && !loading && photos.length == 0 && (
        <Alert className="mt-5" variant="danger">
          No results found
        </Alert>
      )}
    </div>
  );
}

function PhotoCard(props) {
  const [like, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [url, setURL] = useState("Loading...");

  const likeHeart = () => {
    setLiked(like ? false : true);
  };

  const handleClose = () => {
    setShow(false);
    setShowAlert(false);
  };
  const handleShow = (photoURL) => {
    setShow(true);
    setURL(photoURL);
  };

  const copyURL = (url) => {
    copy(url);
    setShowAlert(true);
  };

  return (
    <>
      <Col>
        <Card>
          <Card.Img className="card-img" variant="top" src={props.pic.url} alt={props.pic.title} />
          <Card.Body>
            <Card.Title>
              {props.pic.title} - {props.pic.date}
            </Card.Title>
            <Card.Text>{props.pic.explanation}</Card.Text>
            <div className="d-flex justify-content-around align-items-center">
              {like ? <HeartFill className="text-danger" onClick={likeHeart} /> : <Heart onClick={likeHeart} />}
              <Share onClick={() => handleShow(props.pic.url)} />
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share this photo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send this link to your friends: <br></br>
          <a href={url}>{url}</a>
          {showAlert && (
            <>
              <Alert className="mt-3" variant="success">
                Copied to clipboard!
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={() => copyURL(url)}>
            Copy Link
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
