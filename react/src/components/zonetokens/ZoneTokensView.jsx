import React, { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup, Button } from "react-bootstrap";
import zoneTokenService from "services/zoneTokenService";
import ZoneTokenListItem from "./ZoneTokenListItem";
import Pagination from "rc-pagination";
import locale from "rc-pagination/assets/index.css";
import toastr from "toastr";
import { QRCodeSVG } from "qrcode.react";

function ZoneTokensView() {
  const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;

  const [pageData, setPageData] = useState({
    zoneTokens: [],
    zoneTokensComponent: [],
    pageIndex: 0,
    pageSize: 6,
    totalCount: 0,
    zoneTypeId: 6,
    qrValue: "",
  });

  useEffect(() => {
    zoneTokenService
      .getByTokenTypeId(
        pageData.zoneTypeId,
        pageData.pageIndex,
        pageData.pageSize
      )
      .then(onGetZoneTokenSuccess)
      .catch(onGetZoneTokenError);
  }, [pageData.pageIndex]);

  const onGetZoneTokenSuccess = (response) => {
    setPageData((prevState) => {
      const update = { ...prevState };
      update.zoneTokens = response.item.pagedItems;
      update.zoneTokensComponent = update.zoneTokens.map(mapZoneToken);
      update.totalCount = response.item.totalCount;
      return update;
    });
  };

  const mapZoneToken = (zoneToken, index) => {
    return (
      <ZoneTokenListItem
        key={index}
        zoneToken={zoneToken}
        generateQrCodeClicked={onGenerateQrCodeClicked}
      />
    );
  };

  const onGenerateQrCodeClicked = (token) => {
    setPageData((prevState) => {
      const update = { ...prevState };
      update.qrValue = `${API_HOST_PREFIX}/trainees/link?token=${token}`;
      return update;
    });
  };

  const onGetZoneTokenError = () => {
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      const updatePage = { ...prevState };
      updatePage.pageIndex = page - 1;
      return updatePage;
    });
  };

  return (
    <Container>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col className="mb-12">
          <h1 className="display-4 fw-bold mb-3 col-12">
            <span className="text-primary">Zone Tokens Qr Creator</span>
          </h1>
        </Col>
      </Row>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col className="d-flex justify-content-center align-items-center">
          {pageData.qrValue && (
            <QRCodeSVG value={pageData.qrValue} size={300} fgColor="#6343d8" />
          )}
          {pageData.qrValue && (
            <Button href={pageData.qrValue} className="m-3 btn-secondary">
              Go to Qr link
            </Button>
          )}
        </Col>
      </Row>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col className="mt-2">
          <Pagination
            onChange={onPageChange}
            current={pageData.pageIndex + 1}
            pageSize={pageData.pageSize}
            total={pageData.totalCount}
            locale={locale}
          />
        </Col>
      </Row>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mt-3">
        <Col>
          <ListGroup>{pageData.zoneTokensComponent}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ZoneTokensView;
