import { useSelector } from "react-redux";
import rootReducer from "../../reducers/root-reducer";
import { TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { removePerson } from "../../reducers/Tasks/Actions";
import { useNavigate } from "react-router-dom";

function Persons({ personsTasks }) {
  const people = [...new Set(personsTasks.map((p) => p.person))];
  const dispatch = useDispatch();
  const { persons = [] } = useSelector((state) => state.tasksReducer) || {};

  const navigate = useNavigate();

  const handleRemovePersonClick = (person) => {
    dispatch(removePerson(person));
  };

  function onPersonTasksClick(person) {
    const query = new URLSearchParams();
    query.set("personId", person.id);

    navigate(`/person_task?${query.toString()}`);
  }

  // Optional: Handle the case where persons might be undefined or an empty array

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {persons.map((person) => (
          <li key={person.id} className="flex gap-2">
            <button
              onClick={() => onPersonTasksClick(person)}
              className=" bg-sky-900 w-full flex items-center gap-2 font-bold justify-center text-white p-2 rounded-md"
            >
              {person.personName}({person.countTasks})
            </button>
            <button
              onClick={() => handleRemovePersonClick(person)}
              className="bg-slate-400 p-2"
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Persons;
