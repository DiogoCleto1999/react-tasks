import { TrashIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { changeTaskStatus, removeTask } from "../../reducers/Tasks/Actions";
import { useNavigate } from "react-router-dom";

function ListPersonTasks({ person }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveTaskClick = (personId, taskId) => {
    dispatch(removeTask({ personId, taskId }));
  };

  const onPersonTasksClick = (personId, taskId) => {
    dispatch(changeTaskStatus({ personId, taskId }));
  };

  function onTasksDeatailsClick(task) {
    const query = new URLSearchParams();

    query.set("name", task.name);
    query.set("description", task.description);
    navigate(`/person_task/task?${query.toString()}`);
  }
  console.log("tasks", person.tasks);
  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {person.tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              onClick={() => onPersonTasksClick(person.id, task.id)}
              className={`bg-sky-900 w-full flex items-center gap-2 font-bold justify-center text-white p-2 rounded-md ${
                task.isCompleted ? "line-through" : ""
              }`}
            >
              {task.isCompleted && <CheckIcon />}
              {task.name}
            </button>
            <button
              onClick={() => onTasksDeatailsClick(task)}
              className="bg-slate-400 p-2"
            >
              <ChevronRightIcon />
            </button>
            <button
              onClick={() => handleRemoveTaskClick(person.id, task.id)}
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

export default ListPersonTasks;
