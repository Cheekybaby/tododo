import  { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/types/todo";

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
};

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<Todo[]>) {
            state.todos = action.payload;
        },
        addTodo(state, action: PayloadAction<Todo>) {
            state.todos.unshift(action.payload);
        },
        updateTodo(state, action: PayloadAction<Todo>){
            state.todos = state.todos.map((todo) => 
                todo._id === action.payload._id ? action.payload : todo
            );
        },
        deleteTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload);
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todos.find((t) => t._id === action.payload);
            if (todo){
                todo.isCompleted = !todo.isCompleted
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setLoading,
    setError,
} = todoSlice.actions;
export default todoSlice.reducer;