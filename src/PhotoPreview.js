import "./App.css";
import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { Card, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { Heart, HeartFill, Share } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function PhotoPreview(props) {
  let { id, date } = props.match.params;
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(true);
  const [like, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const url = `https://apod.nasa.gov/apod/image/${id.replace("-", "/")}.jpg`;
  const shareURL = `https://khloe-r.github.io/nasa-photo-explorer/#/preview/${id}/${date}`;

  async function getData() {
    setLoading(true);
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_NASA_APIKEY}`);
    const data = await response.json();
    setPhoto(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    if (localStorage.getItem(date) !== null) {
      setLiked(true);
    }
  }, []);

  const likeHeart = () => {
    setLiked(like ? false : true);
    if (!like) {
      localStorage.setItem(date, true);
    } else {
      localStorage.removeItem(date);
    }
  };

  const handleClose = () => {
    setShow(false);
    setShowAlert(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const copyURL = () => {
    copy(shareURL);
    setShowAlert(true);
  };

  return (
    <>
      <div className="App px-5 py-5 bg-light">
        <div role="banner">
          <h1>Spacestagram</h1>
          <p className="text-black-75 mb-3">Brought to you by NASA's Astronomy Photo of the Day API</p>
        </div>
        <div className="d-flex justify-content-center" role="main">
          {!photo || loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Card style={{ width: "20rem" }}>
              <Card.Img className="card-img" variant="top" src={url} alt={photo.title} />
              <Card.Body>
                <Card.Title>
                  {photo.title} - {date}
                </Card.Title>
                <Card.Text>{photo.explanation}</Card.Text>
                <div className="d-flex justify-content-around align-items-center">
                  {like ? <HeartFill className="text-danger" onClick={likeHeart} /> : <Heart onClick={likeHeart} />}
                  <Share onClick={() => handleShow()} />
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
        <Link to="/">
          <Button className="my-3" variant="outline-dark">
            Return to Photo Gallery
          </Button>
        </Link>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share this photo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Send this link to your friends: <br></br>
            <Link to={`/preview/${id}/${date}`}>{shareURL}</Link>
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
            <Button variant="dark" onClick={() => copyURL()}>
              Copy Link
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default PhotoPreview;
