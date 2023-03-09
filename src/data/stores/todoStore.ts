import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { generateId } from 'data/helpers';

type Todo =
{
    id: string,
    title: string,
    isEditMode: boolean
    createdAt: number
};

type TodoStore =
{
    todos: Todo[],
    addTodo: (title: string) => void,
    toggleEditMode: (id: Todo["id"]) => void,
    updateTodo: (id: Todo["id"], title: Todo["title"]) => void,
    delTodo: (id: Todo["id"]) => void,
    reorder: (newOrder: Todo[]) => void
};

const useTodoStore = create<TodoStore>()
    (persist(devtools(set => (
    {
        todos: [],
        addTodo(title)
        {
            const todoNew: Todo =
            {
                id: generateId(),
                title,
                isEditMode: false,
                createdAt: Date.now()
            };

            set(state => ({ todos: [todoNew, ...state.todos]}), false, "todo/addTodo");
        },
        toggleEditMode: id => set(state => (
        {
            todos: state.todos.map(todo => (
            {
                ...todo,
                isEditMode: todo.id === id ? !todo.isEditMode : todo.isEditMode
            }))
        }), false, "todo/toggleEditMode"),
        updateTodo: (id, title) => set(state => (
        {
            todos: state.todos.map(todo => (
            {
                ...todo,
                title: todo.id === id ? title : todo.title
            }))
        }), false, "todo/updateTodo"),
        delTodo: id => set(state => (
        {
            todos: state.todos.filter(todo => todo.id !== id)
        }), false, "todo/delTodo"),
        reorder: newOrder => set(state => (
        {
            todos: newOrder
        }), false, "todo/reorder")

    }), { enabled: import.meta.env.DEV }), { name: "todos-storage" }));

export { useTodoStore, type Todo };