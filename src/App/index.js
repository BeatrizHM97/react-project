import { useState, useEffect } from "react";
import { AppUI } from "./AppUI";
import './App.css';

function useLocalStorage(itemName, initialValue) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
      
      if(!localStorageItem){
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      setItem(parsedItem);
      setLoading(false);
    }, 1000);
  });

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  }

  return [
    item,
    saveItem,
  ];
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = useState('');

  let serchedTodos = [];

  if(!searchValue.length >= 1) {
    serchedTodos = todos;
  } else {
    serchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completedTodos = serchedTodos.filter(todo => !!todo.completed).length;
  const totalTodos =  serchedTodos.length;

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      serchedTodos={serchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;