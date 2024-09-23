import { useRef, useState } from "react";
import { addPerson } from "../../reducers/Tasks/Actions";
import { useDispatch } from "react-redux";

function AddPerson() {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const nameRef = useRef();
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const handleAddPersonClick = () => {
    const name = nameRef.current.value;
    console.log("name", name);
    dispatch(addPerson(name));
    nameRef.current.value = "";
  };
  return (
    <div className="space-y-4 p-6 bg-slate-200 flex items-center flex-col rounded-md shadow">
      <h1 className="text-2xl justify-center text-slate-500 font-bold">
        Adicionar Pessoa
      </h1>
      <input
        ref={nameRef}
        type="text"
        placeholder="Inserir nome"
        className="bg-white p-2 w-full  rounded-md text-slate-600"
      ></input>
      {errorMessage && (
        <p className="text-red-800 font-bold mt-1">{errorMessage}</p> // Exibe mensagem de erro
      )}
      <button
        onClick={() => {
          if (!nameRef.current.value.trim()) {
            setErrorMessage("Nome é obrigatório!!");
          } else {
            handleAddPersonClick();
          }
        }}
        className="w-full p-2 font-bold bg-sky-900 "
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddPerson;
