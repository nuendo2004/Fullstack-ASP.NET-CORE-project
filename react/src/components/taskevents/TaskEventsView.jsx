import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import taskEventsService from "../../services/taskEventsService";
import toastr from "toastr";
import debug from "sabio-debug";
import TaskEventsCard from "./TaskEventsCard";
import { Row } from "react-bootstrap";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

const _logger = debug.extend("TaskEventsView");
function TaskEventsView() {
  const [taskEvents, setTaskEvents] = useState({
    taskEventsList: null,
    taskEventsListComponents: null,
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  });

  useEffect(() => {
    taskEventsService
      .getPaged(taskEvents.pageIndex)
      .then(onGetTaskEventSuccess)
      .catch(onGetTaskEventError);
  }, [taskEvents.pageIndex]);

  const onGetTaskEventSuccess = (response) => {
    let arrayOfTaskEvents = response.item.pagedItems;
    arrayOfTaskEvents.map((x) => {
      const newTaskEvent = x;
      newTaskEvent.isBoolValue = newTaskEvent.boolValue;
      delete newTaskEvent.boolValue;
      return newTaskEvent;
    });
    _logger(arrayOfTaskEvents);

    setTaskEvents((prevState) => {
      const newObject = { ...prevState };
      newObject.taskEventsList = arrayOfTaskEvents;
      newObject.taskEventsListComponents =
        arrayOfTaskEvents.map(mapTemplateList);
      newObject.totalCount = response.item.totalCount;
      newObject.pageIndex = response.item.pageIndex;
      newObject.pageSize = response.item.pageSize;
      newObject.totalPages = response.item.totalPages;
      return newObject;
    });
  };

  const onGetTaskEventError = () => {
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const mapTemplateList = (aTaskEvent) => {
    return (
      <TaskEventsCard
        taskEvent={aTaskEvent}
        key={aTaskEvent.id}
      ></TaskEventsCard>
    );
  };

  const onPageChange = (page) => {
    setTaskEvents((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageIndex = page - 1;
      return newPageData;
    });
  };

  return (
    <React.Fragment>
      <h2>Task Events</h2>
      <Row className="ms-0 px-0">{taskEvents.taskEventsListComponents}</Row>
      <Pagination
        onChange={onPageChange}
        current={taskEvents.pageIndex + 1}
        pageSize={taskEvents.pageSize}
        total={taskEvents.totalCount}
        locale={locale}
      />
    </React.Fragment>
  );
}

export default TaskEventsView;
