import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types/todo";

export interface CounterState {
  todos: Todo[];
}

const initialState: CounterState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetTodos: (state) => {
      state.todos = [];
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    setMultipleTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, setMultipleTodos, removeTodo, editTodo, resetTodos } =
  todosSlice.actions;

export default todosSlice.reducer;
