import { Reorder } from "framer-motion";
import { useTodoStore } from "data/stores/todoStore";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

export default function TodoList()
{
    const {todos, delTodo, toggleEditMode, updateTodo, reorder } = useTodoStore(state => state);      
    
    return todos.length? (               
            <Reorder.Group className={styles.list} transition={{ duration: .3 }}
                values={todos} onReorder={reorder} layout
            >                
            {
                todos.map(todo =>
                    <TodoItem key={todo.id} delTodo={delTodo} updateTodo={updateTodo}
                        toggleEdit={toggleEditMode} todo={todo}                       
                    />
                )
            }                     
            </Reorder.Group>                        
    ) : null;        
}