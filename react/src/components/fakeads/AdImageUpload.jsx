import React, { Fragment, useCallback } from "react";
import uploadService from "services/fileUploadService";
import PropTypes from "prop-types";
import toastr from "toastr";
import { FaFileImage } from "react-icons/fa";
import "./pseudo.css";

function AdImageUpload(props) {

  const onFileChange = useCallback((e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("files", file);

    uploadService
      .fileUpload(formData)
      .then(onGetUploadSuccess)
      .catch(onGetUploadError);
  }, []);

  const onGetUploadSuccess = (response) => {
    props.onFileSuccess(response.items);
  };
  
  const onGetUploadError = (error) => {
    toastr.error(error, "Upload Failed");
  };

  return (
    <Fragment>
      <div className="col-md-3 p-0">
        <div className="icon-shape icon-xxl border rounded position-relative">
          <span className="position-absolute w-100 p-0">
            <FaFileImage
              className="adImage-upload-icon"
              preserveAspectRatio="xMidYMid meet"
              xmlns="ttp://www.w3.org/2000/svg"
              viewBox="-40 -115 470 750"
            />
          </span>
          <input
            onChange={onFileChange}
            type="file"
            className="form-control border-0 opacity-0 form-control p-0 h-100"
          ></input>
        </div>
      </div>
    </Fragment>
  );
}

AdImageUpload.propTypes = {
  onFileSuccess: PropTypes.func.isRequired,
};

export default AdImageUpload;
