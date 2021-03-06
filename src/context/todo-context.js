import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "./auth-context";

export const TodoContext = React.createContext({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  fetchData: () => {},
});

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const { generatedUsername, currentUser } = useContext(AuthContext);

  let username = generatedUsername(currentUser?.email);

  let baseUrl =
    "https://auth-todo-app-234f0-default-rtdb.europe-west1.firebasedatabase.app/";

  const fetchData = () => {
    axios.get(`${baseUrl}/${username}.json`).then((response) => {
      const loadedTodos = [];
      const data = response.data;

      for (const key in data) {
        loadedTodos.push({
          id: key,
          todo: data[key].todo,
        });
      }
      setTodos(loadedTodos);
    });
  };

  const addTodoHandler = (todo) => {
    axios({
      method: "POST",
      url: `${baseUrl}/${username}.json`,
      data: { todo: todo },
    }).then((response) => {
      setTodos((prevState) => {
        return [...prevState, { id: response.data.name, todo: todo }];
      });
    });
  };

  const removeTodoHandler = (todoId) => {
    axios.delete(`${baseUrl}/${username}/${todoId}.json`).then((response) => {
      setTodos(todos.filter((todo) => todo.id !== todoId));
    });
  };

  const contextValue = {
    todos,
    setTodos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    fetchData,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
