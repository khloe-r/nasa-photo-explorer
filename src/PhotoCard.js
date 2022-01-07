import "./App.css";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Col, Card, Button, Modal, Alert } from "react-bootstrap";
import { Heart, HeartFill, Share } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function PhotoCard(props) {
  const [like, setLike] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [url, setURL] = useState("Loading...");

  const likeHeart = () => {
    setLike(like ? false : true);
    if (!like) {
      localStorage.setItem(props.pic.date, true);
    } else {
      localStorage.removeItem(props.pic.date);
    }
  };

  const handleClose = () => {
    setShow(false);
    setShowAlert(false);
  };
  const handleShow = (photoURL, date) => {
    setShow(true);
    setURL(`${photoURL.substring(33, photoURL.length - 4).replace("/", "-")}/${date}`);
  };

  const copyURL = (url) => {
    copy(`https://khloe-r.github.io/nasa-photo-explorer/#/preview/${url}`);
    setShowAlert(true);
  };

  return (
    <>
      <Col>
        <Card>
          <Card.Img className="card-img" variant="top" src={props.pic.url} alt={props.pic.title} aria-label={props.pic.title} />
          <Card.Body>
            <Card.Title>
              {props.pic.title} - {props.pic.date}
            </Card.Title>
            <Card.Text>{props.pic.explanation}</Card.Text>
            <div className="d-flex justify-content-around align-items-center">
              {localStorage.getItem(props.pic.date) !== null ? <HeartFill aria-label="Unlike Photo" className="text-danger" onClick={likeHeart} /> : <Heart onClick={likeHeart} aria-label="Like Photo" />}
              <Share aria-label="Share Photo" onClick={() => handleShow(props.pic.url, props.pic.date)} />
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
          <Link to={`/preview/${url}`}>{`https://khloe-r.github.io/nasa-photo-explorer/#/preview/${url}`}</Link>
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

export default PhotoCard;
