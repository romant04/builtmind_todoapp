import { FC, useCallback, useState } from "react";
import { Todo } from "../types/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { editTodo, removeTodo } from "../app/reducers/todo-slice";

interface Props {
  todo: Todo;
}

export const TodoField: FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);

  const handleTodoDelete = useCallback(() => {
    dispatch(removeTodo(todo.id));
  }, []);

  const handleTodoEdit = useCallback(() => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    setEditMode(false);
    dispatch(
      editTodo({ id: todo.id, title: title, completed: todo.completed })
    );
  }, [title]);

  return (
    <div className="bg-purple-900 py-3 px-5 flex flex-col gap-y-5 md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <input
          checked={todo.completed}
          onChange={() =>
            dispatch(editTodo({ ...todo, completed: !todo.completed }))
          }
          type="checkbox"
          className="w-4 h-4 accent-orange-600"
        />
        {editMode ? (
          <>
            <input
              type="text"
              className="bg-purple-800 text-white px-2 py-1 rounded-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FontAwesomeIcon
              onClick={handleTodoEdit}
              className="text-green-400 text-lg cursor-pointer"
              icon={faCheck}
            />
          </>
        ) : (
          <h3 className="text-white text-xl">
            {todo.title}
            <FontAwesomeIcon
              onClick={() => setEditMode(true)}
              className="ml-2 text-orange-400 hover:text-orange-500 cursor-pointer"
              icon={faPenToSquare}
            />
          </h3>
        )}
      </div>
      <button
        onClick={handleTodoDelete}
        className="bg-red-600 text-white px-8 rounded-sm hover:bg-red-700"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
