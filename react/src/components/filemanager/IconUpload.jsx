import React, { Fragment, useCallback } from "react";
import debug from "sabio-debug";
import uploadService from "services/fileUploadService";
import PropTypes from "prop-types";
import toastr from "toastr";

const _logger = debug.extend("IconUpload");

function IconUpload(props) {
  const onFileChange = useCallback((e) => {
    let file = e.target.files[0];
    _logger(e, file);
    let formData = new FormData();
    formData.append("files", file);

    _logger(formData);

    uploadService
      .fileUpload(formData)
      .then(onGetUploadSuccess)
      .catch(onGetUploadError);
  }, []);

  const onGetUploadSuccess = (response) => {
    _logger(response);
    props.onFileSuccess(response.items);
  };
  const onGetUploadError = (error) => {
    _logger(error);
    toastr.error(error, "Upload unsuccessful");
  };

  return (
    <Fragment>
      <div className=" md-4 col-md-3 col-8 ms-3">
        <div className="icon-shape icon-xxl border rounded position-relative">
          <span className="position-absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="25"
              height="25"
              fill="currentColor"
              className="text-muted"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
            </svg>
          </span>
          <input
            onChange={onFileChange}
            type="file"
            className="form-control border-0 opacity-0 form-control"
          ></input>
        </div>
      </div>
    </Fragment>
  );
}

IconUpload.propTypes = {
  onFileSuccess: PropTypes.func.isRequired,
};

export default IconUpload;
