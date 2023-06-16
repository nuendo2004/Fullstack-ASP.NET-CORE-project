import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import CardRender from "./CardRender";
import debug from "sabio-debug";
import actorsService from "../../services/actorsService";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import { useEffect } from "react";

const _logger = debug.extend("ActorCard");

function ActorCard(props) {
  let user = props.currentUser;

  const [Actors, setActors] = useState({
    actors: [],
    actorsComponents: [],
    paginationData: {
      pageIndex: 0,
      pageSize: "",
      totalPages: "",
      totalCount: "",
    },
  });

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
    let actors = res.item;   
    setActors((prevState) => {
      let mappedActors = { ...prevState };
      mappedActors.paginationData.pageIndex = actors.pageIndex;
      mappedActors.paginationData.pageSize = actors.pageSize;
      mappedActors.paginationData.totalPages = actors.totalPages;
      mappedActors.paginationData.totalCount = actors.totalCount;
      mappedActors.actors = actors.pagedItems;
      mappedActors.actorsComponents = actors.pagedItems.map(mapActors);
      return mappedActors;
    });
  };

  const onActorsError = () => {
    toastr.success("Uh oh, actors not received");
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
        let page = Actors.paginationData.pageIndex;
        actorsService
          .getPaginatedActors(page)
          .then(onActorsSuccess)
          .catch(onActorsError);
        newActor.actors.splice(indexOf, 1);
        newActor.actorsComponents = newActor.actors.map(mapActors);
        setCurrent(page + 1);
      }
      return newActor;
    });
  };

  const onDeleteError = (res) => {
    toastr.success("Uh oh, Card not deleted");
    _logger("Delete Error", res);
  };

  const mapActors = (actor) => {
    return (
      <CardRender
        card={actor}
        key={"List" + actor.id}
        onActorClick={onDeleteRequest}
      />
    );
  };

  const navigate = useNavigate();

  const goToPage = (e) => {
    let actorPage = e.currentTarget.dataset.page;
    navigate(actorPage);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row d-flex flex-test">{Actors.actorsComponents}</div>
      </div>
      <div className="row d-flex">
        <div className=" d-flex mx-auto my-2 justify-content-between">
          <div className="d-flex align-items-center">
            <Pagination
              onChange={onChange}
              current={current}
              total={Actors.paginationData.totalCount}
              pageSize={Actors.paginationData.pageSize}
              showLessItems
              locals={locale}
            />
          </div>
          <button
            className="btn btn-success add-actor"
            data-page="add"
            onClick={goToPage}
          >
            {" "}
            Add Actor
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

ActorCard.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActorCard;
