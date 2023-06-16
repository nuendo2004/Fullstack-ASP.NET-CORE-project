import React, {   useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import debug from "sabio-debug";
import DropZone from "components/filemanager/DropZone";
import AvatarSlides from "./AvatarCarousel"

const _logger = debug.extend("AvatarImage");

function AvatarLoader() {
  const [pageData, setPageData] = useState([]);

  const onHandleInsert = (items) => {
    setPageData(items);
  };
  _logger("pageData", pageData);

  const previewData =()=>{
    let result = null;
    if (pageData.length>0 && pageData!==null){
    result =(<AvatarSlides images={pageData} />);
    }
  return result;
  }
  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col className="py-6 py-xl-0 col-lg-8">
          <Card>
            <div className="p-6">
              <h2 className="mt-1 fw-bold text-center">Add Avatar</h2>
              <DropZone onFileSuccess={onHandleInsert} />
              {previewData()}
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default AvatarLoader;
