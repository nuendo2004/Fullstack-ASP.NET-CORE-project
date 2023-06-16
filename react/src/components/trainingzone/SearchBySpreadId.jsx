import React, { useState } from "react";
import debug from "sabio-debug";
import { Button, Table } from "react-bootstrap";
import * as zoneConfigService from "../../services/trainingZones/zoneConfigService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchBySpreadId() {
  const [pageData, setPageData] = useState({
    searchResult: [],
    pageIndex: 0,
    pageSize: 3,
    orgId: 1,
    totalCount: 0,
  });
  const [searchSpread, setSearchSpread] = useState({ searchQuery: "" });
  const [showSpreads, setShowSpreads] = useState(false);

  const _logger = debug.extend("UserRegister");

  const onSearchChange = (event) => {
    _logger("onChange", { syntheticEvent: event });

    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name;

    setSearchSpread((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
  };
  const onSearch = (e) => {
    e.preventDefault();
    const query = searchSpread.searchQuery;
    zoneConfigService
      .getBySpreadId(
        pageData.pageIndex,
        pageData.pageSize,
        query,
        pageData.orgId
      )
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  function onSearchSuccess(response) {
    _logger("success", response);
    let searchItems = response.item.pagedItems;
    setPageData((prevState) => {
      const dataSearch = { ...prevState };
      dataSearch.searchResult = searchItems.map(mapArray);
      dataSearch.pageSize = response.item.pageSize;
      dataSearch.totalCount = response.item.totalCount;

      return dataSearch;
    });
    setShowSpreads(!showSpreads);
  }

  function onSearchError(response) {
    _logger("error", response);
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
  }

  function mapArray(aSpeed) {
    return (
      <React.Fragment>
        <tbody>
          <tr>
            <th scope="row">{aSpeed?.id}</th>
            <td>{aSpeed?.name}</td>
            <td>{aSpeed?.speedCategory.name}</td>
            <td>{aSpeed?.spreadLevel.name}</td>
            <td>{aSpeed?.organization.name}</td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="input-group row">
        <div className="form-outline">
          <input
            value={SearchBySpreadId.searchQuery}
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
          </Button>{" "}
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
          <div className="container">
            <Table className="text-nowrap table-primary">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Speed</th>
                  <th scope="col">Spread</th>
                  <th scope="col">Organization</th>
                </tr>
              </thead>
              {showSpreads && pageData.searchResult}{" "}
            </Table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchBySpreadId;
