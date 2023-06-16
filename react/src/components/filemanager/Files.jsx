import React, { useEffect, useState } from "react";
import fileService from "services/fileService";
import FileCard from "./FileCard";
import logger from "sabio-debug";
import toastr from "toastr";
import { Nav, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

const _logger = logger.extend("Files");

function Files(props) {
_logger(props)
  const roles = props.currentUser.roles.toString();
  const currentUser = props.currentUser;


  const [fileData, setFileData] = useState({
    files: [],
    fileComponents: [],
    totalPages: 0,
    totalCount: 0,
    pageIndex: 0,
    pageSize: 5,
  });

  const [searchFormData, setSearchFormData] = useState({
    query: "",
  });

  // const [statusToFilterBy, setStatusToFilterBy] = useState("");

  useEffect(() => {
    fileService
    .getAllPaginated(fileData.pageIndex, fileData.pageSize)
    .then(onGetFilesSuccess)
    .catch(onGetFilesError)
  }, [fileData.pageIndex])

  const adminRoleChanges = () => {
    if (roles === "SysAdmin")
      return (
        <Nav.Item>
        <Nav.Link
          eventKey="allFiles"
          className="mb-sm-3 mb-md-0"
          onClick={onAllClicked}
        >
          All Files
        </Nav.Link>
      </Nav.Item>
      );
  };

  const onGetFilesSuccess = (response) => {
    toastr.success("Files Incoming!")
    let files = response.item;
    setFileData((prevState) => {
      let mappedFiles = { ...prevState };
      mappedFiles.pageIndex = files.pageIndex;
      mappedFiles.pageSize = files.pageSize;
      mappedFiles.totalPages = files.totalPages;
      mappedFiles.totalCount = files.totalCount;
      mappedFiles.files = files.pagedItems;
      mappedFiles.fileComponents = files.pagedItems.map(mapFiles);

      return mappedFiles;
    });
  };

  const onGetFilesError = (error) => {
    toastr.error("Unable to retreive files");
    _logger(error);
  };

  const mapFiles = (aFile) => {
    return <FileCard aFile={aFile} key={`List-A ${aFile.id}`} />;
  };

  const onSearchFormFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setSearchFormData((prevState) => {
      const newUserObject = {
        ...prevState,
      };
      newUserObject[name] = value;
      return newUserObject;
    });
  };

  const onSearchFilesSuccess = (response) => {
    _logger(response);
    toastr.success("Files Incoming!", response);
    let files = response.item;

    setFileData((prevState) => {
      let mappedFiles = { ...prevState };
      mappedFiles.pageIndex = fileData.pageIndex;
      mappedFiles.pageSize = files.pageSize;
      mappedFiles.totalPages = files.totalPages;
      mappedFiles.totalCount = files.totalCount;
      mappedFiles.files = files.pagedItems;
      mappedFiles.fileComponents = files.pagedItems.map(mapFiles);
      _logger(mappedFiles)
      return mappedFiles;
    });
  };

  const onSearchFilesError = (error) => {
    toastr.error("Cannot search files. Try new query.");
    _logger(error);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fileService
        .search(fileData.pageIndex, fileData.pageSize, searchFormData.query)
        .then(onSearchFilesSuccess)
        .catch(onSearchFilesError);
    }
  };

  const filterFiles = () => {
    fileData.files.filter(file => file.createdBy === props.users.user.id)
      return fileData.files
  };

  const onAllClicked = () => {
    _logger("all clicked", props.users);
    if ( props.users === null )
    fileService
      .getAllPaginated(fileData.pageIndex, fileData.pageSize)
      .then(onGetFilesSuccess)
      .catch(onGetFilesError);
      else (
        filterFiles())
  };



  const onMyFilesClicked = () => {
    fileService
    .getByUserId(fileData.pageIndex, fileData.pageSize, currentUser.id)
    .then(onGetFilesSuccess)
    .catch(onGetFilesError)
    _logger("my files clicked", currentUser);
    // fileData.files.filter(file => file.createdBy === currentUser.id)
    // return fileData.files;
  };

  const onDeletedClicked = () => {
    _logger("deleted clicked");
    if (roles === "SysAdmin") {
      fileService
        .getDeletedFilesAdmin(fileData.pageIndex, fileData.pageSize)
        .then(onGetFilesSuccess)
        .catch(onGetFilesError);
    } 
    else
    fileService
        .getDeletedFiles(fileData.pageIndex, fileData.pageSize, currentUser.id)
        .then(onGetFilesSuccess)
        .catch(onGetFilesError);
  };


  const onChange = (page) => {
    _logger(`Current page: ${page}`);
    setFileData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page;

      return pd;
    });
  };

  return (
    <div className="container-flex">
      <Card.Header>
        <Nav className="nav-lb-tab border-bottom-0">
          {adminRoleChanges()}
          <Nav.Item>
            <Nav.Link
              eventKey="myFiles"
              className="mb-sm-3 mb-md-0"
              onClick={onMyFilesClicked}
            >
              My Files
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="recent" className="mb-sm-3 mb-md-0">
              Recent
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="deleted"
              className="mb-sm-3 mb-md-0"
              onClick={onDeletedClicked}
            >
              Deleted
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <div className="mb-lg-0 mb-2 col-lg-9 col-md-7 col-sm-12 ">
        <input
          type="search"
          className="form-control mt-3"
          placeholder="Search File..."
          id="query"
          name="query"
          value={searchFormData.query}
          onChange={onSearchFormFieldChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <h4 className="mb-1 pt-4">Quick Access</h4>
      {fileData.fileComponents}
      <Pagination
        className="pt-3"
        onChange={onChange}
        locale={locale}
        current={fileData.pageIndex}
        pageSize={fileData.pageSize}
        total={fileData.totalCount}
      />
    </div>
  );
}
Files.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  files: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.string),
  }),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
};

export default Files;
