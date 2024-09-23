import React from "react";
import TasksActionTypes from "./Action-Types";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos

// Função para carregar os dados do localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("persons");
    // Garante que o estado inicial sempre seja um objeto com 'persons' como um array
    return serializedState
      ? { persons: JSON.parse(serializedState) }
      : { persons: [] };
  } catch (e) {
    console.warn("Error loading from localStorage", e);
    return { persons: [] }; // Em caso de erro, retorna um array vazio
  }
};

// Estado inicial carregado do localStorage
const initialState = loadFromLocalStorage();

// Função para salvar os dados no localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.persons);
    localStorage.setItem("persons", serializedState);
  } catch (e) {
    console.warn("Error saving to localStorage", e);
  }
};

// Reducer para manipular o estado de pessoas e tarefas
const TasksReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case TasksActionTypes.ADD_PERSON:
      // Verifica se a lista de 'persons' é um array
      if (!Array.isArray(state.persons)) {
        state = { ...state, persons: [] };
      }

      // Verifica se a pessoa já existe
      const existingPerson = state.persons.some(
        (person) => person.personName === action.payload
      );

      if (!existingPerson) {
        // Adiciona a nova pessoa se não existir
        newState = {
          ...state,
          persons: [
            ...state.persons,
            {
              id: uuidv4(),
              personName: action.payload,
              tasks: [],
              countTasks: 0,
            },
          ],
        };
        saveToLocalStorage(newState); // Salva o novo estado no localStorage
        return newState;
      }
      return state;

    case TasksActionTypes.REMOVE_PERSON: {
      // Remove a pessoa pelo id
      const updatedPersons = state.persons.filter(
        (person) => person.id !== action.payload.id
      );

      newState = {
        ...state,
        persons: updatedPersons,
      };
      saveToLocalStorage(newState); // Salva o estado atualizado no localStorage
      return newState;
    }

    case TasksActionTypes.ADD_TASK: {
      // Encontra a pessoa pelo id
      const existingPersonIndex = state.persons.findIndex(
        (person) => person.id === action.payload.id
      );

      if (existingPersonIndex !== -1) {
        // Adiciona a nova tarefa à pessoa encontrada
        newState = {
          ...state,
          persons: state.persons.map((person, index) => {
            if (index === existingPersonIndex) {
              return {
                ...person,
                tasks: [
                  ...person.tasks,
                  {
                    id: uuidv4(),
                    name: action.payload.name,
                    description: action.payload.description,
                    isCompleted: false,
                  },
                ],
                countTasks: person.countTasks + 1,
              };
            }
            return person;
          }),
        };
        saveToLocalStorage(newState); // Salva o estado atualizado no localStorage
        return newState;
      }
      return state;
    }

    // New REMOVE_TASK case
    case TasksActionTypes.REMOVE_TASK: {
      const { personId, taskId } = action.payload;

      // Find the person by id
      const existingPersonIndex = state.persons.findIndex(
        (person) => person.id === personId
      );

      if (existingPersonIndex !== -1) {
        newState = {
          ...state,
          persons: state.persons.map((person, index) => {
            if (index === existingPersonIndex) {
              // Filter out the task with the matching id
              const updatedTasks = person.tasks.filter(
                (task) => task.id !== taskId
              );

              return {
                ...person,
                tasks: updatedTasks,
                countTasks: person.countTasks - 1,
              };
            }
            return person;
          }),
        };
        saveToLocalStorage(newState); // Save updated state to localStorage
        return newState;
      }
      return state;
    }

    case TasksActionTypes.CHANGE_TASK_STATUS: {
      const { personId, taskId } = action.payload;

      // Find the person by id
      const existingPersonIndex = state.persons.findIndex(
        (person) => person.id === personId
      );

      if (existingPersonIndex !== -1) {
        newState = {
          ...state,
          persons: state.persons.map((person) =>
            person.id === personId
              ? {
                  ...person,
                  tasks: person.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          isCompleted: !task.isCompleted,
                        }
                      : task
                  ),
                }
              : person
          ),
        };

        saveToLocalStorage(newState); // Save updated state to localStorage
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default TasksReducer;
