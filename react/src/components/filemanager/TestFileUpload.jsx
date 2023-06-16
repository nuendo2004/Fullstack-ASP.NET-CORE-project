import React from "react";
import debug from "sabio-debug";
import DropZone from "./DropZone";
import IconUpload from "./IconUpload";

const _logger = debug.extend("TestFileUpload");
function TestFileUpload() {
  const testFileUpload = (response) => {
    debugger;
    _logger(response, "tester");
  };

  return (
    <div className="py-6">
      <div className="row">
        <div className="col-xl-6 col-md-12 col-12 offset-xl-3">
          <div className="card">
            <div className="fileUpload"></div>
            <div className="p-lg-6 card-body">
              <h5 className="mb-3 ms-3">Avatar</h5>
              <IconUpload onChange={testFileUpload}></IconUpload>
              <h5 className=" pt-3 ms-3">File</h5>
              <DropZone onFileSuccess={testFileUpload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFileUpload;
