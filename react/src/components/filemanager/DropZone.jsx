import React, { useCallback, useMemo } from "react";
import { useDropzone} from "react-dropzone";
import debug from "sabio-debug";
import uploadService from "services/fileUploadService";
import PropTypes from "prop-types";

const _logger = debug.extend("FileUpload");

function DropZone(props) {
  const onDrop = useCallback((files) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

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
  };
  

  const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
    onDrop,
  });
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#29baf9",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
  };

const acceptStyle = {
  borderColor: "#00e676",
};


   const style = useMemo(
     () => ({
       ...baseStyle,
       ...(isDragAccept ? acceptStyle : {}),      
     }),
     [isDragAccept]
   );

  return (
    <div className=" p-md-3 card-body">
      <div className="dropzone">
        <section className="container">
          <div tabIndex={"3"} className="dropzone">
            <div {...getRootProps({ style, isDragAccept })}>
              <input {...getInputProps(acceptStyle)} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

DropZone.propTypes = {
  onFileSuccess: PropTypes.func.isRequired,
};

export default DropZone;
