import React, { useState, useEffect, useCallback } from "react";
import * as podcastService from "../../services/podcastService";
import PropTypes from "prop-types";
import AudioPlayer from "react-h5-audio-player";
import "./podcasts.css";
import toastr from "toastr";
import debug from "sabio-debug";
import PodCard from "./PodCard";

const _logger = debug.extend("Podcasts");

export default function Podcasts(props) {
  _logger(props, "Podcasts");

  // const aPodcast = props.podcast;

  const [pageData, setPageData] = useState({
    arrayOfPodcasts: [],
    podcastComponents: [],
    pageIndex: 0,
    pageSize: 6,
    selectedPodcast: {},
  });

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    _logger("Podcasts props: ", props);

    setIsAuthorized(() => {
      if (props.currentUser.roles[0] === "SysAdmin") {
        return true;
      } else {
        return false;
      }
    });

    _logger("firing useEffect for get podcasts");
    podcastService
      .getPodcasts(pageData.pageIndex, pageData.pageSize)
      .then(onGetPodcastSuccess)
      .catch(onGetPodcastError);
  }, []);

  const onGetPodcastSuccess = (data) => {
    _logger("onGetPodcastSuccess", data);
    let arrayOfPodcasts = data.items;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPodcasts = arrayOfPodcasts;
      pd.selectedPodcast = arrayOfPodcasts[0];
      pd.podcastComponents = arrayOfPodcasts.map(mapPodcasts);
      return pd;
    });
  };

  const onDeleteRequested = useCallback((myPodcast, eObj) => {
    _logger(myPodcast.id, { myPodcast, eObj });
    podcastService
      .deletePodcast(myPodcast.id)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  }, []);

  const mapPodcasts = (aPodcast) => {
    return (
      <PodCard
        podcast={aPodcast}
        key={`A${aPodcast.id}`}
        onPodcastClicked={onDeleteRequested}
        currentUser={props.currentUser}
      />
    );
  };

  const onGetPodcastError = () => {
    toastr["error"]("Could not render podcasts");
  };

  const onDeleteError = () => {
    toastr["error"]("Could not delete podcast");
  };

  const onDeleteSuccess = (idToBeDeleted) => {
    toastr["success"]("Successfully deleted podcast", idToBeDeleted);

    _logger("onDeleteSuccess", idToBeDeleted);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPodcasts = [...pd.arrayOfPodcasts];

      const idxOf = pd.arrayOfPodcasts.findIndex((podcast) => {
        let result = false;

        if (podcast.id === idToBeDeleted) {
          result = true;
        }

        return result;
      });

      _logger(idxOf);

      if (idxOf >= 0) {
        pd.arrayOfPodcasts.splice(idxOf, 1);
        pd.podcastComponents.splice(idxOf, 1);
      }

      return pd;
    });
  };

  return (
    <div className="podcast-container">
      <div className="text-center">
        {isAuthorized === true && (
          <a href="/podcasts/new" className="btn btn-dark add-new-button">
            Add New Podcast
          </a>
        )}
      </div>
      <div className="audio-player-container">
        <AudioPlayer podcast={pageData.selectedPodcast} />
      </div>
      <div className="row">{pageData.podcastComponents}</div>
    </div>
  );
}

Podcasts.propTypes = {
  podcast: PropTypes.shape({
    image: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  onPodcastClicked: PropTypes.func,

  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
