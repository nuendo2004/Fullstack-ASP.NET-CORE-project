import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as zoneConfigService from "../../services/trainingZones/zoneConfigService";
import debug from "sabio-debug";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _logger = debug.extend("UserRegister");

function TablesOfZone() {
  const [pageData, setPageData] = useState({
    data: [],
    dataComponents: [],
  });

  const [searchTable, setSearchTable] = useState({ searchQuery: "" });

  const onSearchChange = (event) => {
    _logger("onChange", { syntheticEvent: event });

    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name;

    setSearchTable((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
  };

  const onGetSuccess = (response) => {
    _logger("on get success", response.item);
    let searchResult = response.item;
    setPageData((prevState) => {
      const pd = { ...prevState };

      pd.data = searchResult;
      return pd;
    });
  };

  const onGetError = (response) => {
    _logger("on get error", response);
    toast.error("Records not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    const query = searchTable.searchQuery;
    zoneConfigService.getById(query).then(onGetSuccess).catch(onGetError);
  };

  return (
    <React.Fragment>
      <div className="input-group row">
        <div className="form-outline">
          <input
            value={searchTable.searchQuery}
            onChange={onSearchChange}
            name="searchQuery"
            id="searchQuery"
            type="search"
            className="form-control"
          />
          <label className="form-label" htmlFor="form1"></label>
          <Button
            onClick={onSearch}
            id="searchQuery"
            type="button"
            className="btn btn-primary"
          >
            {" "}
            Search
            <i className="fas fa-search ms-1"></i>
          </Button>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <br />
        </div>
      </div>
      <div className="row mt-3">
        {pageData?.data && (
          <div className="container">
            <Table className="text-nowrap table-primary">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Speed</th>
                  <th scope="col">Spread</th>
                  <th scope="col">Organization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{pageData.data.id}</th>
                  <td>{pageData.data.name}</td>
                  <td>{pageData.data.description}</td>
                  <td>{pageData.data.speedCategory?.name}</td>
                  <td>{pageData.data.spreadLevel?.name}</td>
                  <td>{pageData.data.organization?.name}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default TablesOfZone;
