import "./App.css";
import React from "react";

function Footer(props) {
  return (
    <div>
      <p className="text-center py-5">
        Created by Khloe Ramdhan ~{" "}
        <a href="https://github.com/khloe-r/nasa-photo-explorer" target="_blank" rel="noopener noreferrer">
          View Source Code Here!
        </a>
      </p>
    </div>
  );
}

export default Footer;
