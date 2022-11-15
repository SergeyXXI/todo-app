import TodoForm from "views/components/TodoForm/TodoForm";
import TodoList from "views/components/TodoList/TodoList";
import styles from "./App.module.scss";

export default function App()
{        
    return (
        <div className={styles.app}>
            <h1>To Do</h1>
            <TodoForm />
            <TodoList />
        </div> 
    );
}