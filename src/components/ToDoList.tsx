import { MouseEvent } from "react";
import { Link } from "react-router-dom";

interface ToDoListPropsType {
    text: string;
    id: number;
    _onClick: (e: MouseEvent) => void;
}

const ToDoList = ({ text, id, _onClick }: ToDoListPropsType) => {
    return (
        <li id={String(id)}>
            <Link to={`/${id}`}>
                <span>{text}</span>
            </Link>
            <button onClick={_onClick}>❌</button>
        </li>
    );
};

export default ToDoList;
