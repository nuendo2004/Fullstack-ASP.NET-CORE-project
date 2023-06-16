import React, { useState, useEffect, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import CardCarousel from "./CardCarousel"
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
import "./actors.css";
import actorsService from "../../services/actorsService";
import toastr from "toastr";


const _logger = debug.extend("ActorMain");
function Actors(props) {
  _logger(props);
  let user = props.currentUser;
  const [search] = useState({
    query: "",
  });

  const [actors, setActors] = useState({
    actors: [],
    actorsComponents: [],
    paginationData: {
      pageIndex: 0,
      pageSize: "",
      totalPages: "",
      totalCount: "",
    },
  });

  const searchSubmit = (values, { resetForm }) => {
    actorsService
      .searchByActorName(0, values.query)
      .then(onSearchSuccess)
      .catch(onSearchError);
    resetForm();
  };

  const onSearchSuccess = (res) => {
    let responseActors = res.item;
    setActors((prevState) => {
      let mappedActors = { ...prevState };
      mappedActors.paginationData.pageIndex = responseActors.pageIndex;
      mappedActors.paginationData.pageSize = responseActors.pageSize;
      mappedActors.paginationData.totalPages = responseActors.totalPages;
      mappedActors.paginationData.totalCount = responseActors.totalCount;
      mappedActors.actors = responseActors.pagedItems;
      mappedActors.actorsComponents = responseActors.pagedItems.map(mapActors);
      return mappedActors;
    });
  };

  const onSearchError = (res) => {
    toastr.error("Actors not found");
    _logger(res);
  };

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    actorsService
      .getPaginatedActors(0)
      .then(onActorsSuccess)
      .then(onActorsError);
  }, []);

  const onChange = (page) => {
    actorsService
      .getPaginatedActors(page - 1)
      .then(onActorsSuccess)
      .catch(onActorsError);
    setCurrent(page);
  };

  const onActorsSuccess = (res) => {
    let responseActors = res.item;
    setActors((prevState) => {
      let mappedActors = { ...prevState };
      mappedActors.paginationData.pageIndex = responseActors.pageIndex;
      mappedActors.paginationData.pageSize = responseActors.pageSize;
      mappedActors.paginationData.totalPages = responseActors.totalPages;
      mappedActors.paginationData.totalCount = responseActors.totalCount;
      mappedActors.actors = responseActors.pagedItems;
      mappedActors.actorsComponents = responseActors.pagedItems.map(mapActors);
      return mappedActors;
    });
  };

  const onActorsError = (res) => {
    if (res) {
      _logger("Get actors Error--->", res);
    }
  };

  const onDeleteRequest = (actors) => {
    const deleteHandler = onDeleteSuccess(actors.id);
    actorsService
      .deleteActor(actors.id, user.id)
      .then(deleteHandler)
      .catch(onDeleteError);
  };

  const onDeleteSuccess = (idToBeDeleted) => {
    setActors((prevState) => {
      const newActor = { ...prevState };
      const indexOf = newActor.actors.findIndex((obj) => {
        let result = false;
        if (obj.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });
      if (indexOf >= 0) {
        let page = actors.paginationData.pageIndex;
        actorsService
          .getPaginatedActors(page)
          .then(onActorsSuccess)
          .catch(onActorsError);
        newActor.actors.splice(indexOf, 1);
        newActor.actorsComponents = newActor.actors.map(mapActors);
        setCurrent(page + 1);
      }
      toastr.success("Actor Deleted");
      return newActor;
    });
  };

  const onDeleteError = (res) => {
    _logger("Delete Error", res);
  };

  const mapActors = (actor, index) => {
    return (
      <React.Fragment>       
            <CardCarousel
              card={actor}
              key={"List" + actor.id + index}
              onActorClick={onDeleteRequest}
            />        
      </React.Fragment>
    );
  };

  const navigate = useNavigate();

  const goToPage = (e) => {
    let actorPage = e.currentTarget.dataset.page;
    navigate(actorPage);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row current-text-row">
          <div className="col-md-12 col-lg-6">
            <h1 className="current-text">Current Actors</h1>
          </div>
          <div className="col-md-12 col-lg-6 search-bar-actors">
            <Formik
              enableReinitialize={true}
              initialValues={search}
              onSubmit={searchSubmit}
            >
              <div className="row actor-form-row d-flex flex-end">
                <Form className="actor-form-col">
                  <Field
                    type="input"
                    name="query"
                    placeholder="Search By User"
                    className="form-control actor-search-input"
                  />
                  <ErrorMessage
                    name="query"
                    component="div"
                    className="has-error"
                  />
                  <button
                    type="submit"
                    className="btn btn-success btn-xs actor-search-button"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </Formik>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex">
        <div className="col d-flex justify-content-evenly mx-auto">
       {actors.actorsComponents}      
        </div>
      </div>
      <div className="row d-flex">
        <div className=" d-flex mx-auto my-2 justify-content-between">
          <div className="d-flex align-items-center">
            <Pagination
              onChange={onChange}
              current={current}
              total={actors.paginationData.totalCount}
              pageSize={actors.paginationData.pageSize}
              showLessItems
              locals={locale}
            />
          </div>
          <button
            className="btn btn-success add-actor"
            data-page="/actorwizard"
            onClick={goToPage}
          >
            {" "}
            Add Actor
          </button>
        </div>
      </div>
    </Fragment>
  );
}

Actors.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Actors;
