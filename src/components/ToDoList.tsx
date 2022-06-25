import { MouseEvent } from "react";

interface ToDoListProps {
    text: string;
    id: number;
    _onClick: (e: MouseEvent) => void;
}

const ToDoList = ({ text, id, _onClick }: ToDoListProps) => {
    return (
        <li id={String(id)}>
            <span>{text}</span>
            <button onClick={_onClick}>❌</button>
        </li>
    );
};

export default ToDoList;
