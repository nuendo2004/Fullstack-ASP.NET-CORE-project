import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row, Card, Image, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from "assets/images/background/immersedred.jpg";
import Logo from "assets/images/brand/logo/immersedlogo.png";

import debug from "sabio-debug";
import "./storycard.css";
import ReactCardFlip from "react-card-flip";

const _logger = debug.extend("ShareStory");
const StoriesCard = (props) => {
  const aStory = props.story;
  const [passedState] = useState(aStory);
  const [isSysAdmin, setIsSysAdmin] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();

  const goToStory = (e) => {
    e.preventDefault();
    const stateForTransport = { type: "type_stories", payload: passedState };
    navigate(`/sharedstories/edit/${aStory.id}`, { state: stateForTransport });
  };

  const goToSingleStory = (e) => {
    const targetFriend = e.currentTarget.dataset.page;
    navigate(targetFriend);
  };

  const checkFiles = (files) => {
    if (files.files === null) {
      return image;
    } else {
      return aStory.files[0].url;
    }
  };

  const onApprovalClick = () => {
    _logger(aStory.id, "click");
    _logger(aStory.isApproved);
    props.storyApproval(aStory);
  };

  useEffect(() => {
    if (props.user.roles.includes("SysAdmin")) {
      setIsSysAdmin(!isSysAdmin);
    } else {
      setIsSysAdmin(isSysAdmin);
    }
  }, [aStory]);

  return (
    <React.Fragment>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="container storiescard-flippedCard">
          <Card className="mb-4 storiescard-card">
            <Image
              src={checkFiles(aStory)}
              alt=""
              className=" story-image card-img-top square-top-md"
            />

            <Card.Body>
              <div className="storiescard-title">
                <strong className=" storycard-card-body mb-2 fs-6 ">
                  {aStory.title}
                </strong>
              </div>
              <div>
                {" "}
                <div className="storiescard-body">
                  <div className="story-author">
                    {" "}
                    <span>
                      Author: {aStory.createdByFirstName}{" "}
                      {aStory.createdByLastName}
                    </span>
                  </div>
                </div>
              </div>

              <ListGroup
                as="ul"
                bsPrefix="list-inline"
                className="mb-3"
              ></ListGroup>

              <div className="lh-1 mt-3 ">
                <strong className="fs-6 text-muted"></strong>
              </div>
            </Card.Body>

            <Card.Footer className="storycard-footer">
              <Row className="align-items-center g-0">
                <Col className="col-auto">
                  <Image
                    src={Logo}
                    className="rounded-circle avatar-xs"
                    alt=""
                  />
                </Col>
                <Col className="col ms-2 storiescard-name">
                  <span className="ms-2 text-muted text-right">
                    {aStory.dateCreated.toString().substring(0, 10)}
                  </span>
                </Col>
                <Col className="col-auto">
                  <button
                    className="btn btn-xs btn-outline-danger"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Details
                  </button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <br />
          <br />
        </div>
        <div>
          <Card className="mb-4 storiescard-card">
            <Image
              onClick={() => setIsFlipped(!isFlipped)}
              src={checkFiles(aStory)}
              alt=""
              className=" story-image card-img-top square-top-md"
            />
            <Card.Header>
              {" "}
              <div className="storiesCard-edit-btn">
                {isSysAdmin && (
                  <button
                    to={`edit/${aStory.id}`}
                    onClick={goToStory}
                    className="btn-xs btn btn-outline-danger"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="storiesCard-approve-btn">
                {isSysAdmin && (
                  <button
                    className="btn-xs btn btn-outline-danger"
                    onClick={onApprovalClick}
                  >
                    {aStory.isApproved ? "Remove" : "Approve"}
                  </button>
                )}
              </div>
            </Card.Header>

            <Card.Body className="storycard-body">
              {aStory.story.replace(/(<([^>]+)>)/gi, "").substr(0, 70)}...
              <div>
                <button
                  to={aStory.id}
                  className="btn btn-xs mb-1 btn-outline-danger rounded-pill"
                  data-page={aStory.id}
                  onClick={goToSingleStory}
                >
                  Full Story
                </button>
              </div>
            </Card.Body>

            <Card.Footer className="storycard-footer">
              <Row className="align-items-center g-0">
                <Col className="col-auto">
                  <Image
                    src={Logo}
                    className="rounded-circle avatar-xs"
                    alt=""
                  />
                </Col>
                <Col className="col ms-2 storiescard-name">
                  <span>
                    {aStory.createdByFirstName} {aStory.createdByLastName}
                  </span>
                </Col>
                <Col className="col-auto">
                  <button
                    className="btn btn-xs btn-outline-danger"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Back
                  </button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <br />
        </div>
      </ReactCardFlip>
    </React.Fragment>
  );
};
StoriesCard.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    story: PropTypes.string,
    id: PropTypes.number,
    isApproved: PropTypes.bool,
    dateCreated: PropTypes.string,
    createdByFirstName: PropTypes.string,
    createdByLastName: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        fileType: PropTypes.number,
        url: PropTypes.string,
      })
    ),
  }).isRequired,
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  storyApproval: PropTypes.func,
};
export default StoriesCard;
