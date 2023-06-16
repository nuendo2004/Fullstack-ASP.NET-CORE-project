import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Breadcrumb,
  TabContainer,
  Form,
} from "react-bootstrap";
import { Formik } from "formik";
import lookUpService from "../../services/lookUpService";
import editAvatarSchema from "schemas/editAvatarSchema";
import debug from "sabio-debug";
const _logger = debug.extend("TraineeAccountEdit"); 

function TraineeAccountEdit({ traineeAccountData }) {
  const navigate = useNavigate();
  const { state } = useLocation();
 
  const onDashClicked = () => {
    navigate(`/dashboard/analytics`);
  };

  const onAccountsClicked = () => {
    navigate(`/trainee/accounts`); 
  };
  
  const [accountStatusData, setAccountStatusData] = useState({
    arrayOfStatus: [],
    accountStatusComponents: [],
  });

  const [setForm] = useState({}); 

  _logger(accountStatusData, "this is accountStatusData");

  useEffect(() => {
    lookUpService
      .LookUp(["AccountStatus"]) 
      .then(onGetAccountStatusSuccess)
      .catch(onGetAccountStatusError); 
  }, []);  

  useEffect(() => {
    if (!!state) {
      _logger("state", state);
      setForm((prevState) => {
        const form = { ...prevState };
        form.avatarUrl = state.avatarUrl;
        form.accountStatus = state.accountStatus;
        form.username = state.username; 
      });
    }
  });

  const onGetAccountStatusSuccess = (response) => {
    let aSt = response?.item.accountStatus;
    _logger("response status", aSt, response);
    setAccountStatusData((prevState) => {
      const a = { ...prevState };
      a.arrayOfStatus = aSt;
      a.accountStatusComponents = aSt.map(mapAccountStatusData);
      return a;
    });
  };

  const onGetAccountStatusError = (err) => {
    toastr.error(
      "An error occurred in getting your account status drop downs.",
      "Error"
    );
    _logger("onGetAccountStatusError", err);
  };

  const mapAccountStatusData = (accountStatusData) => { 
    return (
      <option
        value={accountStatusData.id}
        key={"accountStatusDataId" + accountStatusData.id}
      >
        {accountStatusData.name}
      </option>
    );
  };

  const onClick = (e) => {
    _logger(e, "button clicked");
    toastr.success("Trainee account updated successfully.");
  };

  return (
    <React.Fragment>
      <TabContainer defaultActiveKey="grid">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Edit Trainee Accounts</h1>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={onDashClicked}>
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={onAccountsClicked}>
                    Trainee Accounts
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
      </TabContainer>

      <div className="container">
        <Formik
          enableReinitialize={true}
          initialValues={traineeAccountData}
          validationSchema={editAvatarSchema}
        >
          <Form>
            <div>
              <br />
            </div>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="newAvatarUrl" visuallyHidden>
                  New Avatar URL
                </Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                    id="updatedAvatarUrlta"
                    placeholder="Update Avatar URL"
                    type="url"
                  />
                </InputGroup>
              </Col>
              <Col xs="auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClick}
                >
                  Submit
                </button>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="newUserNameta" visuallyHidden>
                  New Username
                </Form.Label>
                <InputGroup className="mb-2">
                  <FormControl id="taUserName" placeholder="Update Username" />
                </InputGroup>
              </Col>
              <Col xs="auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClick}
                >
                  Submit
                </button>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="newaccountStatus" visuallyHidden>
                  New Account Status
                </Form.Label>
                <Form.Select
                  aria-label="Update Account Status"
                  className="form-group"
                >
                  <option>Update Account Status</option>
                  {accountStatusData.accountStatusComponents}
                </Form.Select>
              </Col>
              <Col xs="auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClick}
                > 
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>
    </React.Fragment>
  );
}

TraineeAccountEdit.propTypes = {
  traineeAccountData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    accountStatus: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    avatarUrl: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default TraineeAccountEdit;
