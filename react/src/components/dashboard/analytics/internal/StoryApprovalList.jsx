import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Table } from "react-bootstrap";
import storyService from "services/storiesService";
import toastr from "toastr";
import "./storyapprovallist.css";

const StoryApprovalList = () => {
  const [stories, setStories] = useState({
    arrayOfStories: [],
    storiesComponents: [],
  });

  useEffect(() => {
    storyService
      .getUnapprovedStories(0, 10)
      .then(onGetUnapprovedSuccess)
      .catch(onGetUnapprovedError);
  }, []);

  const mapStory = (aStory) => {
    return (
      <tr key={aStory.id}>
        <td className="align-middle">
          <a href="/sharedstories">
            <div className="d-flex align-items-center">
              <img
                className="fluid thumbnail rounded-3 story-approval-image"
                src={
                  aStory.files
                    ? aStory.files[0]?.url
                    : "https://tse3.mm.bing.net/th?id=OIP.jS1nqdviO5VYemLVUXHkggHaE-&pid=Api&P=0"
                }
                alt="Shared Story"
              />

              <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                {aStory.title}
              </h5>
            </div>
          </a>
        </td>
        <td className="align-middle">
          <div className="d-flex align-center">
            <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
              {aStory.createdByFirstName} {aStory.createdByLastName}
            </h5>
          </div>
        </td>
        <td className="align-middle">
          <div className="d-flex align-center"></div>
        </td>
      </tr>
    );
  };

  const onGetUnapprovedSuccess = (response) => {
    const storyData = response.item.pagedItems;
    setStories((prevState) => {
      const story = { ...prevState };
      story.arrayOfStories = storyData;
      story.storiesComponents = storyData.map(mapStory);
      return story;
    });
  };

  const onGetUnapprovedError = (error) => {
    toastr.error("unable to retrieve Unapproved Stories", error);
  };

  return (
    <Col>
      <Card>
        <Card.Header>
          <h4>Shared Stories Pending Approval</h4>
        </Card.Header>
        <Table hover>
          <thead>
            <tr className="striped">
              <th className="align-middle">
                <div className="d-flex align-center">
                  <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                    Stories
                  </h5>
                </div>
              </th>
              <th className="align-middle">
                <div className="d-flex align-center">
                  <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                    Author
                  </h5>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{stories.storiesComponents}</tbody>
        </Table>
      </Card>
    </Col>
  );
};

StoryApprovalList.propTypes = {
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default StoryApprovalList;
