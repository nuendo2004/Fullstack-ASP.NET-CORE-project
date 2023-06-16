import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TraineeAccountsTable from "./TraineeAccountsTable";
import { getTraineeAccountsZoneIdPaged } from "../../services/traineeAccountsService";
import {
  Col,
  Row,
  Tab,
  Table,
  Breadcrumb,
  TabContainer,
} from "react-bootstrap";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import debug from "sabio-debug";
const _logger = debug.extend("TraineeAccounts");

function TraineeAccounts() {
  const [pageData, setPageData] = useState({
    arrayOfAccounts: [],
    accountsComponents: [],
    totalCount: 0,
    pageIndex: 0,
    pageSize: 5,
    zoneId: 1,
  });

  const navigate = useNavigate();

  const onAddClick = (e) => {
    _logger("add trainee accounts clicked", e);
    navigate(`/trainee/account/add`);
  };

  const onDashClicked = () => {
    navigate(`/dashboard/analytics`);
  };

  const onEditClick = (trainee) => {
    _logger("edit trainee accounts clicked", trainee);
    navigate(`/trainee/account/edit`);
  };

  useEffect(() => {
    _logger("firing useEffect for GetByZoneId");
    getAccounts(pageData.pageIndex);
  }, []);

  const getAccounts = (nextPage) => {
    getTraineeAccountsZoneIdPaged(nextPage, pageData.pageSize, pageData.zoneId)
      .then(onSuccess)
      .catch(onError);
  };

  const onSuccess = (response) => {
    let arrayOfAccounts = response.item.pagedItems;

    setPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfAccounts = [...pageData.arrayOfAccounts];
      pageData.accountsComponents = arrayOfAccounts.map(mapAccounts);

      pageData.pageIndex = response.item.pageIndex;
      pageData.totalCount = response.item.totalCount;
      pageData.pageSize = response.item.pageSize;
      return pageData;
    });
  };

  const onError = (err) => {
    _logger("API call error", err);
    toastr.error(
      "A error occured generating the trainee account data",
      "Error"
    );
  };

  const mapAccounts = (aTraineeAccount) => {
    return (
      <TraineeAccountsTable
        traineeAccount={aTraineeAccount}
        key={"ListA-" + aTraineeAccount.id}
        onEdit={onEditClick}
      />
    );
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      let pageData = { ...prevState };
      pageData.pageIndex = page - 1;
      return pageData;
    });
    getAccounts(page - 1);
  };

  return (
    <Fragment>
      <TabContainer defaultActiveKey="grid">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">All Trainee Accounts</h1>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={onDashClicked}>
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Trainee Accounts</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="d-grid gap-2 d-md-block" onClick={onAddClick}>
                <button type="button" className="btn btn-primary btn-md">
                  Add Trainee Account
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </TabContainer>

      <TabContainer>
        <Tab.Content>
          <div>
            <Table hover className="text-nowrap">
              <thead>
                <tr>
                  <th scope="col">Avatar</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Zone Name</th>
                  <th scope="col">Account Status</th>
                </tr>
              </thead>
              <tbody>{pageData.accountsComponents}</tbody>
            </Table>
          </div>
        </Tab.Content>
      </TabContainer>

      <TabContainer defaultActiveKey="grid">
        <Tab.Content>
          <Row>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <Pagination
                showLessItems
                locale={locale}
                showTitle={false}
                current={pageData.pageIndex + 1}
                onChange={onPageChange}
                pageSize={pageData.pageSize}
                total={pageData.totalCount}
                style={{ margin: "auto" }}
              />
            </div>
          </Row>
        </Tab.Content>
      </TabContainer>
    </Fragment>
  );
}

export default TraineeAccounts;
