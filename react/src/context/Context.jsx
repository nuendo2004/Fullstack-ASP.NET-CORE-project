import React from 'react';
export const MailContext = React.createContext({ mails: [] });
export const ChatContext = React.createContext();
export const TaskKanbanContext = React.createContext({
	taskColumns: [],
	tasks: []
});
