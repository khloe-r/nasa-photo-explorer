import "./App.css";
import React from "react";
import PhotoPreview from "./PhotoPreview";
import PhotoGallery from "./PhotoGallery";
import Error404 from "./Error404";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router baseline>
      <Switch>
        {/* <Route exact path="/nasa-photo-explorer" component={PhotoGallery} /> */}
        <Route exact path="/" component={PhotoGallery} />
        <Route exact path="/preview/:id/:date" component={PhotoPreview} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
