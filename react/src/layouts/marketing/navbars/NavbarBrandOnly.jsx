import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Nav, Image } from "react-bootstrap";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";

const NavbarBrandOnly = () => {
  return (
    <Row>
      <Col as={Nav.Item} xl={{ offset: 1, span: 2 }} lg={12} md={12}>
        <div className="mt-4">
          <Link to="/">
            <Image src={Logo} alt="" className="w-15 h-15" /> Immersed
          </Link>
        </div>
      </Col>
    </Row>
  );
};
export default NavbarBrandOnly;
