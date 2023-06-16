import React from "react";
import { useNavigate } from "react-router-dom";

function SharedStories() {
  const navigate = useNavigate();
  const onAddStoryClicked = () => {
    navigate("/sharedstories/create");
  };

  return (
    <React.Fragment>
      <h1 className="sharedStory-pg-title">Shared Stories</h1>
      <div>
        <button
          className="btn btn-primary share-story"
          onClick={onAddStoryClicked}
        >
          Share your story
        </button>
      </div>
    </React.Fragment>
  );
}

export default SharedStories;
