import React, { useReducer } from "react";
import { TaskKanbanContext } from "context/Context";
import {
  TeamMembers,
  TaskKanbanItems,
} from "data/dashboard/task-kanban/TaskKanbanData";
import { TaskKanbanReducer } from "reducers/TaskKanbanReducer";
import PropTypes from "prop-types";

const TaskKanbanProvider = ({ children }) => {
  const [TaskKanbanState, TaskKanbanDispatch] = useReducer(TaskKanbanReducer, {
    teamMembers: TeamMembers,
    taskList: TaskKanbanItems,
  });

  return (
    <TaskKanbanContext.Provider value={{ TaskKanbanState, TaskKanbanDispatch }}>
      {children}
    </TaskKanbanContext.Provider>
  );
};

TaskKanbanProvider.propTypes = {
  children: PropTypes.string,
};

export default TaskKanbanProvider;
