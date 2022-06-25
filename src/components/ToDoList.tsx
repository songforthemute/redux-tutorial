import { MouseEvent } from "react";

interface ToDoListProps {
interface ToDoListPropsType {
    text: string;
    id: number;
    _onClick: (e: MouseEvent) => void;
}

const ToDoList = ({ text, id, _onClick }: ToDoListPropsType) => {
    return (
        <li id={String(id)}>
            <span>{text}</span>
            <button onClick={_onClick}>❌</button>
        </li>
    );
};

export default ToDoList;
