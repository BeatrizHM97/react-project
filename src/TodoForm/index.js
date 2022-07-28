import { useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import './TodoForm.css';


function TodoForm() {
  const [newTodoValue, setNewTodoValue] = useState('');
  const { addTodo, setCallModal } = useContext(TodoContext);

  const onChange = (event) => {
    setNewTodoValue(event.target.value); 
  }

  const onCancel = () => {
    setCallModal(false);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.length >= 1) {
      addTodo(newTodoValue);
      setCallModal(false);
    }
  }

  return (
    <form className="TodoForm" onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea value={newTodoValue} onChange={onChange} placeholder="Escribe aqui"/>
      <div className="buttons-container">
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">Agregar</button>
      </div>
    </form>
  );
}

export { TodoForm };