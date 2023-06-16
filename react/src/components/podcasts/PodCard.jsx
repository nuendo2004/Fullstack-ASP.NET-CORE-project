import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "./podcasts.css";

import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("Podcast");

export default function PodCard(props) {
  const aPodcast = props.podcast;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate();

  // const audioPlayer = useRef();

  const onLocalPodcastClicked = (e) => {
    e.preventDefault();
    props.onPodcastClicked(props.podcast);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/podcasts/edit/${aPodcast.id}`, {
      state: { aPodcast },
    });
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      // audioPlayer.current.play();
    } else {
      // audioPlayer.current.pause();
    }
  };

  useEffect(() => {
    _logger("Podcasts props: ", props);

    setIsAuthorized(() => {
      if (props.currentUser.roles[0] === "SysAdmin") {
        return true;
      } else {
        return false;
      }
    });
  }, []);

  return (
    <>
      <div className="podcast-card-container text-center border-dark">
        <button onClick={togglePlayPause} className="podcast-card-play-pause">
          {isPlaying ? (
            <BsFillPlayCircleFill className="podcast-card-play" />
          ) : (
            <BsPauseCircleFill className="podcast-card-pause" />
          )}
        </button>
        <p className="podcast-card-header">{aPodcast.author}</p>
        <p className="podcast-card-title">{aPodcast.title}</p>
        <p className="podcast-card-content">{aPodcast.content}</p>
        <p className="podcast-card-category">{aPodcast.category}</p>

        {isAuthorized === true && (
          <>
            {" "}
            <button
              className="link-btn btn podcast-edit-button"
              onClick={handleEditClick}
            >
              <FaEdit />
            </button>
            <button
              className="btn podcast-delete-button"
              onClick={onLocalPodcastClicked}
            >
              <FaTrashAlt />
            </button>
          </>
        )}
      </div>
    </>
  );
}

PodCard.propTypes = {
  podcast: PropTypes.shape({
    image: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onPodcastClicked: PropTypes.func.isRequired,

  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
