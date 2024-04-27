import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "../types/todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addTodo,
  resetTodos,
  setMultipleTodos,
} from "../app/reducers/todo-slice";
import { TodoField } from "../components/todo-field";

export const Home: FC = () => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const savedTodos = useSelector((state: RootState) => state.todos.todos);

  const handleTodoAdd = useCallback(() => {
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 100,
        title: todoTitle,
        completed: false,
      },
    ]);
    dispatch(
      addTodo({
        id: todos.length + 100,
        title: todoTitle,
        completed: false,
      })
    );
    setTodoTitle("");
  }, [todos, todoTitle]);

  useEffect(() => {
    if (!loading) {
      setTodos((prev) => savedTodos);
    }
  }, [savedTodos]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      setTodos(res.data);
      dispatch(setMultipleTodos(res.data));
      setLoading(false);
    };

    if (savedTodos.length === 0) {
      void fetchData();
    } else {
      setTodos((prev) => savedTodos);
      setLoading(false);
    }

    return () => {
      setTodos([]);
      setLoading(true);
      dispatch(resetTodos());
    };
  }, []);

  return (
    <div className="w-[max(75%,320px)] mx-auto mt-10">
      <div className="mt-2 flex flex-col gap-y-2 md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Todos</h1>
        <div className="flex gap-1">
          <input
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="border-2 dark:border-gray-300 dark:bg-gray-600 dark:text-white border-gray-500 px-2 p-1 rounded-sm"
            type="text"
            placeholder="Todo title"
          />
          <button
            onClick={handleTodoAdd}
            className="bg-orange-600 text-white rounded-sm px-2 hover:bg-orange-700"
          >
            Add new todo
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <TodoField todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};
