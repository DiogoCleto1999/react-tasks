import { useDispatch } from "react-redux";
import { addTask } from "../../reducers/Tasks/Actions";
import { useRef, useState } from "react";

function AddTask({ person }) {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [errorTitleMessage, setTitleErrorMessage] = useState(""); // Mensagem de erro
  const [errorDescriptionMessage, setDescriptionErrorMessage] = useState(""); // Mensagem de erro

  function taskExists(name) {
    const taskExists = person.tasks.some((task) => task.name === name);

    if (taskExists) {
      // Se uma tarefa com o mesmo título já existe, não adicione a nova tarefa
      return false;
    }
    return true;
  }

  function handleAddTaskClick() {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const task = {
      name,
      description,
      id: person.id,
    };
    dispatch(addTask(task));
    nameRef.current.value = "";
    descriptionRef.current.value = "";
  }

  return (
    <div className="space-y-4 p-6 bg-slate-200 flex items-center flex-col rounded-md shadow">
      <h1 className="text-2xl justify-center text-slate-500 font-bold">
        Adicionar Tarefa
      </h1>
      <input
        ref={nameRef}
        type="text"
        placeholder="Inserir nome da tarefa"
        className="bg-white p-2 w-full  rounded-md text-slate-600"
      ></input>
      {errorTitleMessage && (
        <p className="text-red-800 font-bold mt-1">{errorTitleMessage}</p> // Exibe mensagem de erro
      )}
      <input
        ref={descriptionRef}
        type="text"
        placeholder="Inserir discrição da tarefa"
        className="bg-white p-2 w-full  rounded-md text-slate-600"
      ></input>
      {errorDescriptionMessage && (
        <p className="text-red-800 font-bold mt-1">{errorDescriptionMessage}</p> // Exibe mensagem de erro
      )}
      <button
        onClick={() => {
          if (!nameRef.current.value.trim()) {
            setTitleErrorMessage("O título é obrigatório!!");
          } else if (!descriptionRef.current.value.trim()) {
            setDescriptionErrorMessage("A descrição é obrigatória!!");
          } else {
            // Caso tenha um valor, pode "enviar" os dados para algum lugar
            if (!taskExists(nameRef.current.value)) {
              setTitleErrorMessage("Tarefa já existe!!");
              nameRef.current.value = "";
              descriptionRef.current.value = "";

              setDescriptionErrorMessage("");
            } else {
              handleAddTaskClick();
              nameRef.current.value = "";
              descriptionRef.current.value = "";
              setTitleErrorMessage("");
              setDescriptionErrorMessage("");
            }
          }
        }}
        className="w-full p-2 font-bold bg-sky-900"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
