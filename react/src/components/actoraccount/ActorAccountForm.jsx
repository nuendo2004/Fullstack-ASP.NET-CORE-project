import React, {  useState ,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {  Row, Card, Col } from "react-bootstrap";
import actorAccountService from "../../services/actorAccount";
import logger from "sabio-debug";
import addActorAccountSchema from "../../schemas/addActorAccountSchema";
import toastr from "toastr";
import zonesService from "services/zonesServices";
import lookUpService from "services/lookUpService";

const _logger = logger.extend("AddActorAccountForm");

function AddActorAccountForm() {
  const [pageData] = useState({
    userName: "",
    password: "",
    avatarUrl: "",
    zoneId: "",
    actorId: "",
    accountStatusId: "",
  });

  const handleSubmit = (values,{resetForm}) => {
    let payload = values;
    payload.zoneId = parseInt(payload.zoneId);
    payload.actorId = parseInt(payload.actorId);
    payload.accountStatusId = parseInt(payload.accountStatusId);
    actorAccountService
      .addActorAccount(payload)
      .then(onActorAccountAddSuccess)
      .catch(onActorAccountAddError)
    resetForm({values:""});
  };

  const onActorAccountAddSuccess =(response)=>{
    _logger("OnAddSuccess",response);
    toastr.success("Account Successfully Created");
  }
  const onActorAccountAddError=(err)=>{
    _logger("OnAddError",err);
    toastr.error("Account NOT Successfully Created",err);
}
const [arrayOfZones, setArrayOfZones] = useState([]);
const [arrayOfAccStatus,setArrayOfAccStatus]= useState([]);
  
useEffect(()=>{
 getAllInfo()
  },[])

  const getAllInfo=()=>{
     actorAccountService
       .getAllActors()
       .then(onGetActorsSuccess)
       .catch(onGetActorsError);
     lookUpService
       .LookUp(["AccountStatus"])
       .then(onLookUpSuccess)
       .catch((err) => _logger("AccountStatus Not Found", err));
     zonesService
      .getAll()
      .then(onGetZoneSucces)
      .catch(onGetZoneError);
  }
  const onLookUpSuccess=(response)=>{
    let arrayOfAccStatus = response.item.accountStatus;
    _logger("accountStatus =>", arrayOfAccStatus);
    setArrayOfAccStatus(arrayOfAccStatus)
  }

  const onGetZoneSucces=(response)=>{
  let arrayOfZones = response.items;
  setArrayOfZones(arrayOfZones);
  _logger("ZoneSucces=>", arrayOfZones);
  }
  const onGetZoneError = (err)=>{
    return err;
  }
  const [arrayOfActors,setArrayOfActors]= useState([]);

  const onGetActorsSuccess=(response)=>{
  let arrayOfActors =response.items;
  _logger("arrayOfActors",arrayOfActors)
  setArrayOfActors(arrayOfActors)
  };

  const onGetActorsError =(err)=>{
  return err;
  };

  const mapAll = (item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={6} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <h1 className="mb-1 fw-bold">Add Actor Account</h1>
              <div className="mb-4"></div>
              <Formik
                enableReinitialize={true}
                initialValues={pageData}
                validationSchema={addActorAccountSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="userName">UserName</label>
                      <Field
                        name="userName"
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Enter UserName"
                      />
                      <ErrorMessage
                        name="userName"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="avatarUrl">Avatar Url</label>
                      <Field
                        name="avatarUrl"
                        type="text"
                        className="form-control"
                        id="avatarUrl"
                        placeholder="Enter Avatar Url"
                      />
                      <ErrorMessage
                        name="avatarUrl"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zoneId">Zone</label>
                      <Field
                        as="select"
                        name="zoneId"
                        className="form-group form-select text-dark"
                        onChange={(input) => {
                          handleChange(input);
                        }}
                      >
                        <option
                          value=""
                          label="Select A Zone"
                          className="text-muted"
                        />
                        {arrayOfZones.map(mapAll)}
                      </Field>
                      <ErrorMessage
                        name="zoneId"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="actorId">Actor</label>
                      <Field
                        as="select"
                        name="actorId"
                        className="form-group form-select text-dark"
                        onChange={(input) => {
                          handleChange(input);
                        }}
                      >
                        <option
                          value=""
                          label="Select an Actor"
                          className="text-muted"
                        />
                        {arrayOfActors.map(mapAll)}
                      </Field>
                      <ErrorMessage
                        name="actorId"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="accountStatusId">Account Status</label>
                      <Field
                        as="select"
                        name="accountStatusId"
                        className="form-group form-select text-dark"
                        onChange={(input) => {
                          handleChange(input);
                        }}
                      >
                        <option
                          value=""
                          label="Select an Account Status"
                          className="text-muted"
                        />
                        {arrayOfAccStatus.map(mapAll)}
                      </Field>
                      <ErrorMessage
                        name="accountStatusId"
                        component="p"
                        className=".has-error"
                      />
                    </div>
                    <div className="div-md-12 div-sm-12">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        name="submit"
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-warning"
                        name="reset"
                      >
                        Clear
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  ); 
}
export default AddActorAccountForm;
