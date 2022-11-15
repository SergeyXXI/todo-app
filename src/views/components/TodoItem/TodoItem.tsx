import { useRef, useEffect } from "react";
import { Todo } from "data/stores/todoStore";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import styles from "./TodoItem.module.scss";

const checkBtnId = "check-btn";

type TodoItemProps =
{
    id: Todo["id"],
    title: Todo["title"],
    isEditMode: Todo["isEditMode"],
    delTodo: (id: Todo["id"]) => void,
    toggleEdit: (id: Todo["id"]) => void,
    updateTodo: (id: Todo["id"], title: Todo["title"]) => void
};

export default function TodoItem(
    { id, title, isEditMode, delTodo, toggleEdit, updateTodo }: TodoItemProps
)
{    
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e =>
    {
        if(e.key === "Enter") onFinishEdit(null);
        if(e.key === "Escape") toggleEdit(id); 
    };
    const onBlur: React.FocusEventHandler<HTMLInputElement> = e =>
    {            
        if(e.relatedTarget?.id === checkBtnId) return;

        toggleEdit(id);
    }; 
    // const onBlur: React.FocusEventHandler<HTMLInputElement> = e => null;
    const onStartEdit: React.MouseEventHandler<HTMLButtonElement> = e => toggleEdit(id);    
    const onFinishEdit = (e: React.MouseEvent | null) =>
    {
        if(!inputRef.current?.value) return;          

        updateTodo(id, inputRef.current.value);
        toggleEdit(id);
    } 
    const onDelete: React.MouseEventHandler<HTMLButtonElement> = e => delTodo(id);

    useEffect(() =>
    {
        if(isEditMode && inputRef.current)
            inputRef.current.focus();
    }, [isEditMode]);

    return (
        <li className={styles.item}>
        {
            isEditMode ?
            <>
                <input type="text" ref={inputRef} defaultValue={title}
                    onKeyDown={onKeyDown} onBlur={onBlur}
                />
                <button className={styles.checkBtn} onClick={onFinishEdit} id={checkBtnId}>
                    <CheckIcon />
                </button>
            </>
            :
            <>
                <span>{title}</span>
                <button className={styles.editBtn} onClick={onStartEdit}>
                    <EditIcon />
                </button>
            </>
        }           
            <button className={styles.delBtn} onClick={onDelete} disabled={isEditMode}>
                <TrashIcon />
            </button>
        </li>
    );
}