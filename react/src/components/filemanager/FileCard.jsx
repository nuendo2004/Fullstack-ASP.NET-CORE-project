import React from "react";
import PropTypes from "prop-types";
import { Popover, OverlayTrigger } from "react-bootstrap";

function FileCard(props) {
  const file = props.aFile;
  const url = props.aFile.url;
  const type = props.aFile.fileType.name;

  const displayIcon = () => {
    if (type === "Image") return <div className="fe fe-image fa-4x ps-2 pb-2" />
    else if (type === "Pdf") return <div className="fe fe-file fa-4x ps-2 pb-2" />
    else return <div className="fe fe-video fa-4x ps-2 pb-2" />
  };

  return (
    <div className="container">
      <div className="card pt-1 mt-1">
        <a className="text-inherit">
          <div className="d-lg-flex align-items-center">
            <div>{displayIcon()}</div>
            <div className="ms-lg-3 mt-2 mt-lg-0">
              <h4 className="mb-1 pt-1 text-primary-hover ">{file.name}</h4>
              <span className="text-inherit">
                <OverlayTrigger
                  triggers={["hover"]}
                  placement="right"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Header as="h1">{url}</Popover.Header>
                    </Popover>
                  }
                >
                  <button type="button" className="btn btn-sm ps-1 pt-1" 
                  >
                    Show Url
                  </button>
                </OverlayTrigger>
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

FileCard.propTypes = {
  aFile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fileType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    dateCreated: PropTypes.string
    
  })  
};
export default FileCard;
