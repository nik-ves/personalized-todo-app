import { useContext } from "react";

import { TodoContext } from "../context/todo-context";
import useTodo from "../hooks/use-input";

const TodoForm = () => {
  const {
    inputValue: todo,
    valueChangeHandler: todoChangeHandler,
    valueReset: resetInput,
  } = useTodo();

  const todoCtx = useContext(TodoContext);

  const submitHandler = (event) => {
    event.preventDefault();

    todoCtx.addTodo(todo);

    resetInput();
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input type="text" id="text" value={todo} onChange={todoChangeHandler} />

      <button type="submit">Add todo</button>
    </form>
  );
};

export default TodoForm;