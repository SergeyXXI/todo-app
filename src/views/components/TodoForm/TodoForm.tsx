import { useTodoStore } from "data/stores/todoStore";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import styles from "./TodoForm.module.scss";
import React from "react";

type FormFields =
{
    taskTitle: HTMLInputElement
};

export default function TodoForm()
{
    const addTodo = useTodoStore(state => state.addTodo);

    const onSubmit = (e: React.FormEvent<HTMLFormElement & FormFields>) =>
    {
        e.preventDefault();
        
        const title = e.currentTarget.taskTitle.value;

        if(!title) return;

        addTodo(title);
        e.currentTarget.reset();
    };   
    
    return (
        <form className={styles.form} onSubmit={onSubmit} autoComplete="off">
            <input type="text" name="taskTitle" placeholder="Type your task here..." />
            <button>
                <Plus />
            </button>
        </form>
    );
}