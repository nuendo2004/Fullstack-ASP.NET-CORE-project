import React, { useState, useEffect, Fragment } from "react";
import Loki from "react-loki";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import ActorForm from "./ActorForm";
import ConsequenceForm from "./ConsequencesForm";
import ActorAccounts from "./ActorAccountForm";
import ActorReview from "./ActorReview";
import { FaWpforms } from "react-icons/fa";
import { GiHammerDrop } from "react-icons/gi";
import debug from "sabio-debug";
import actorBatchService from "../../services/actorBatchService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";
import "./wizardui.css";
import "./wizard.css";

const _logger = debug.extend("actorWizard");

function ActorWizard(props) {
  const user = props.currentUser;

  const [formData, setFormData] = useState({
    actorName: "",
    actorDescription: "",
    actorTypeId: "",
    statusTypeId: "",
    createdBy: user.id,
    modifiedBy: user.id,
    conName: "",
    conDescription: "",
    consequenceTypeId: "",
    zoneId: "",
    actorAccount: [
      {
        userName: "",
        avatarUrl: "",
        accountStatusId: 0,
      },
    ],
    actorType: [],
    statusType: [],
  });

  const { state } = useLocation();

  useEffect(() => {
    if (state?.type === "Actor_Update") {
      setFormData((prevState) => {
        const newActor = { ...prevState };
        const updateActor = state.payload;
        newActor.actorName = updateActor.name;
        newActor.actorDescription = updateActor.description;
        newActor.actorTypeId = updateActor.actorTypeId.id;
        newActor.statusTypeId = updateActor.statusTypeId.id;
        newActor.createdBy = user.id;
        newActor.modifiedBy = user.id;
        newActor.conDescription = updateActor.conDescription;
        newActor.conName = updateActor.conName;
        newActor.consequenceTypeId = updateActor.consequenceType.id;
        newActor.zoneId = updateActor.zoneId.id;
        newActor.actorAccount.userName = updateActor.actorAccount.userName;
        newActor.actorAccount.avatarUrl = updateActor.actorAccount.avatarUrl;
        newActor.actorAccount.accountStatusId =
          updateActor.actorAccount.accountStatus.id;
        newActor.id = updateActor.id;
        newActor.actorAccount.zoneId = updateActor.zoneId.id;
        return newActor;
      });
    }
  }, [state]);

  const onHomeClicked = () => {
    window.location.reload();
  };

  const getFormData = (values) => {
    _logger("values from review card--->", values);

    const mapActorAccount = (item) => {
      return {
        userName: item.userName,
        avatarUrl: item.avatarUrl,
        accountStatusId: parseInt(item.accountStatusId),
      };
    };
    let actorAccountArray = values.actorAccount.map(mapActorAccount);

    var data = {
      actorName: values.actorName,
      actorDescription: values.actorDescription,
      actorTypeId: parseInt(values.actorTypeId),
      statusTypeId: parseInt(values.statusTypeId),
      createdBy: user.id,
      modifiedBy: user.id,
      conName: values.conName,
      conDescription: values.conDescription,
      consequenceTypeId: parseInt(values.consequenceTypeId),
      zoneId: parseInt(values.zoneId),
      actorAccount: actorAccountArray,
    };
    _logger(data);

    if (formData.id) {
      data.id = formData.id;
    }
    return data;
  };

  const mergeValues = (values) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const onSubmit = (values) => {
    const payload = getFormData(values);

    if (payload.id) {
      toastr.success("You have an Id");
    } else {
      actorBatchService
        .actorBatchAdd(payload)
        .then(onAddLokiSuccess)
        .catch(onAddLokiError);
    }
    setTimeout(() => {
      window.location.href = "http://localhost:3000/actors";
    }, 1000);
  };

  const onAddLokiSuccess = () => {
    toastr.success("You Created an Actor Batch");
    setTimeout(() => {
      onHomeClicked();
    }, 1000);
  };

  const onAddLokiError = (res) => {
    _logger(res);
    toastr.error("Oops, That Didn't work");
  };

  const steps = [
    {
      label: "Actor Form",
      icon: <FaWpforms />,
      component: (
        <ActorForm
          formData={formData}
          user={user}
          onHomeClicked={onHomeClicked}
        />
      ),
    },
    {
      label: "Consequences",
      icon: <GiHammerDrop />,
      component: (
        <ConsequenceForm
          formData={formData}
          user={user}
          onHomeClicked={onHomeClicked}
        />
      ),
    },
    {
      label: "Actor Account",
      icon: <FaWpforms />,
      component: (
        <ActorAccounts formData={formData} onHomeClicked={onHomeClicked} />
      ),
    },
    {
      label: "Review Actor",
      icon: <FaWpforms />,
      component: (
        <ActorReview
          formData={formData}
          user={user}
          onHomeClicked={onHomeClicked}
          onFinish={onSubmit}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <div className="py-4 bg-primary">
        <Row className="primary-row">
          <div className="org-loki-container loki-container">
            <Loki
              steps={steps}
              onNext={mergeValues}
              onBack={mergeValues}
              onFinish={onSubmit}
              backLabel={"Back"}
              nextLabel={"Next"}
              noActions
            />
          </div>
        </Row>
      </div>
    </Fragment>
  );
}

ActorWizard.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

export default ActorWizard;
