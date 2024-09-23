import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Tasks from "./components/Tasks.jsx/Tasks";
import Persons from "./components/Persons/Persons";
import AddPerson from "./components/Persons/AddPerson";
import { useSelector } from "react-redux";
function App() {
  const { persons = [] } = useSelector((state) => state.tasksReducer) || {};

  const [personsTasks, setPersonsTasks] = useState([
    {
      person: "Maria",
      tasks: [
        {
          name: "fazer almoço",
          description: " fazer almoço rapido",
          isCompleted: false,
        },
        {
          name: "lavar a roupa",
          description: " lavar a roupa de todos",
          isCompleted: false,
        },
      ],
    },
    {
      person: "Diogo",
      tasks: [
        {
          name: "arrumar a sala",
          description: " arrumar a sala toda e limpar",
          isCompleted: false,
        },
      ],
    },
  ]);

  return (
    <div className="w-screen h-screen flex flex-col items-center p-6 bg-sky-800">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddPerson />
        {persons.length != 0 && <Persons personsTasks={personsTasks} />}
      </div>
    </div>
  );
}

export default App;
