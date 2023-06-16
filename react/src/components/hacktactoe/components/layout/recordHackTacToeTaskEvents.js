import taskEventsService from "services/taskEventsService";

const zoneId = 11;
const traineeEntity = 3;
const winLoss = 1;

const hackedOpponent = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: 2,
    boolValue: true,
    text: "Hacked Opponent",
    payload: "Hacked Opponent",
  });
};

const wasHacked = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: -2,
    boolValue: true,
    text: "Was Hacked By Opponent",
    payload: "Hacked",
  });
};

const wonHackTacToeGame = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: -1,
    boolValue: true,
    text: "Lost Hack Tac Toe game",
    payload: "Lost",
  });
};

const lostHackTacToeGame = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: 1,
    boolValue: true,
    text: `Won Hack Tac Toe game`,
    payload: "Won",
  });
};

const wasCountered = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: -3,
    boolValue: true,
    text: `Was Countered by Opponent while attempting Hack`,
    payload: "Was Countered",
  });
};

const counteredOpponent = (currentUser) => {
  taskEventsService.createNewTaskEvent({
    zoneId,
    entityTypeId: traineeEntity,
    entityId: currentUser.id,
    taskEventTypeId: winLoss,
    numericValue: 3,
    boolValue: true,
    text: `Countered Opponents Hack`,
    payload: "Countered Opponent",
  });
};

export {
  hackedOpponent,
  wasHacked,
  wonHackTacToeGame,
  lostHackTacToeGame,
  wasCountered,
  counteredOpponent,
};
