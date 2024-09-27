import { useState, useEffect } from "react";

function ViewPage() {
  function log() {
    console.log("Hello, World!");
  }

  return (
    <div className="ViewPageContainer">
      <h1>View Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam eum,
        praesentium reprehenderit amet quas est earum quasi soluta perspiciatis,
        ab aspernatur, tempore nisi inventore vero. Aliquid labore ullam error
        odit.
      </p>
    </div>
  );
}

export default ViewPage;
