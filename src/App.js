import "./App.css";
import React from "react";
import PhotoPreview from "./PhotoPreview";
import PhotoGallery from "./PhotoGallery";
import { Routes, Route } from "react-router-dom";

// fix the sharing link

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<PhotoGallery />} />
      <Route exact path="/preview/:id/:date" element={<PhotoPreview />} />
    </Routes>
  );
}

export default App;
