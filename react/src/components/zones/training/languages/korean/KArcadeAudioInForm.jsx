import React from "react";
import { Card, Col } from "react-bootstrap";
import DropZone from "../../../../filemanager/DropZone";
import debug from "sabio-debug";

const _logger = debug.extend("KArcadeAudioInForm");

function KArcadeAudioInForm() {
  const fileUpload = (response) => {
    _logger("AudioInput ->", response);
  };

  return (
    <Card>
      <Card.Header>
        <h2>Audio Input</h2>
      </Card.Header>
      <Card.Body>
        <Col>
          <DropZone onFileSuccess={fileUpload}/>
        </Col>
      </Card.Body>
    </Card>
  )
};

export default KArcadeAudioInForm;