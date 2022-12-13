import { motion, LayoutGroup } from "framer-motion";
import TodoForm from "views/components/TodoForm/TodoForm";
import TodoList from "views/components/TodoList/TodoList";
import styles from "./App.module.scss";

export default function App()
{        
    return (  
        <LayoutGroup>
            <motion.div className={styles.app}  transition={{ duration: .3}} layout>
                <motion.h1 layout>To Do</motion.h1>
                <TodoForm />
                <TodoList />
            </motion.div>      
        </LayoutGroup>      
    );
}