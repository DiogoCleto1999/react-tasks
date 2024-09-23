import TasksActionTypes from "./Action-Types";

export const addPerson = (payload) => ({
  type: TasksActionTypes.ADD_PERSON,
  payload,
});

export const removePerson = (payload) => ({
  type: TasksActionTypes.REMOVE_PERSON,
  payload,
});

export const addTask = (payload) => ({
  type: TasksActionTypes.ADD_TASK,
  payload,
});

export const removeTask = (payload) => ({
  type: TasksActionTypes.REMOVE_TASK,
  payload,
});

export const changeTaskStatus = (payload) => ({
  type: TasksActionTypes.CHANGE_TASK_STATUS,
  payload,
});
