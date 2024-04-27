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
import { toast } from "react-toastify";

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
      toast.error("Title cannot be empty");
      return;
    }

    setEditMode(false);
    dispatch(
      editTodo({ id: todo.id, title: title, completed: todo.completed })
    );
  }, [title]);

  return (
    <div className="dark:bg-purple-700 bg-purple-800 py-3 px-5 flex flex-col gap-5 md:flex-row justify-between rounded-sm">
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
              className="dark:bg-purple-600 bg-purple-700 text-white px-2 py-1 rounded-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FontAwesomeIcon
              aria-label={`Confirm edit of todo ${todo.title}`}
              onClick={handleTodoEdit}
              className="text-green-400 text-lg cursor-pointer"
              icon={faCheck}
            />
          </>
        ) : (
          <h3 className="text-white text-lg">{todo.title}</h3>
        )}
      </div>
      <div className="flex gap-5">
        <button
          onClick={() => setEditMode(true)}
          className="dark:text-orange-500 text-orange-400 hover:text-orange-500 text-xl"
          aria-label={`Edit todo ${todo.title}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          onClick={handleTodoDelete}
          className="text-red-600 hover:text-red-700 text-xl"
          aria-label={`Delete todo ${todo.title}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
