import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

import { useSelector } from "react-redux";
import Title from "../Title";
import AddTask from "./AddTask";
import ListPersonTasks from "./ListPersonTasks";
import { useEffect } from "react";

function Tasks({ tasks }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { persons = [] } = useSelector((state) => state.tasksReducer) || {};

  const personId = searchParams.get("personId");

  const personAux = persons.filter((person) => person.id == personId);

  const person = personAux[0];
  console.log("pessoa", personAux);
  return (
    <div className="w-screen h-screen flex flex-col items-center p-6 bg-sky-800 ">
      <div className="w-[500px] space-y-4">
        <div className="relative flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <ChevronLeftIcon />
          </button>
          <div className="flex-grow text-center">
            <Title>{person.personName}</Title>
          </div>
        </div>
        <AddTask person={person} />
        {person.tasks.length != 0 && <ListPersonTasks person={person} />}
      </div>
    </div>
  );
}

export default Tasks;
