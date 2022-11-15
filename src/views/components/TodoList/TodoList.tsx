import { useTodoStore } from "data/stores/todoStore";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

export default function TodoList()
{
    const {todos, delTodo, toggleEditMode, updateTodo } = useTodoStore(state => state); 
    
    return todos.length? (
        <ul className={styles.list}>
        {
            todos.map(todo =>
                <TodoItem key={todo.id}
                    delTodo={delTodo} updateTodo={updateTodo} toggleEdit={toggleEditMode}
                    {...todo}
                />
            )
        }
        </ul>
    ) : null;
        
}