import "./App.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="App px-5 pt-5 bg-light">
      <div role="banner">
        <h1>404 Error</h1>
        <p className="text-black-75 mb-3">Sorry invalid link!</p>
      </div>
      <Link to="/nasa-photo-explorer">
        <Button className="mt-2 mb-5" variant="outline-dark">
          Return to Photo Gallery
        </Button>
      </Link>
    </div>
  );
}

export default Error404;
