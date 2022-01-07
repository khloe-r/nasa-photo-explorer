import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { Row, Button, Spinner, Alert, Form } from "react-bootstrap";
import PhotoCard from "./PhotoCard";

function PhotoGallery() {
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
    if (dateRef.current.value !== "") {
      setLoading(true);
      getSearchData(dateRef.current.value);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App px-5 pt-5 bg-light">
      <div role="banner">
        <h1>Spacestagram</h1>
        <p className="text-black-75 mb-3">Brought to you by NASA's Astronomy Photo of the Day API</p>
      </div>
      <div role="main">
        {!photos || loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Form className="mb-3" role="search" aria-labelledby="searchBar">
            <Form.Group className="mb-2" controlId="searchDate">
              <Form.Label id="searchBar">Enter a start date to search!</Form.Label>
              <div className="d-flex justify-content-center px-5">
                <Form.Control className="d-flex justify-content-around search-bar" ref={dateRef} type="date" placeholder="YYYY-MM-DD" max={todayIsoDate} />
              </div>
            </Form.Group>

            <Button aria-label="Search Button" variant="dark" onClick={searchDate}>
              Search
            </Button>
            <span> </span>
            <Button aria-label="Reset to Original Search" variant="outline-dark" onClick={getData}>
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
        {photos && !loading && photos.length === 0 && (
          <Alert className="mt-5" variant="danger">
            No results found
          </Alert>
        )}
      </div>
    </div>
  );
}

export default PhotoGallery;
