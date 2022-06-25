import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Todo, Todos, addToDo, removeToDo } from "store";

// TSX
const Home = () => {
    const [text, setText] = useState("");

    /**
     * useSelector Hook === mapStateToProps & connect
     * useSelector() 사용시 스토어에서 바로 빼와서 컴포넌트 인자에 props를 적어줄 필요가 없음.
     * useSelector(callback)에서 callback의 state 인자 타입 === { state: RootState }
     */
    const toDos = useSelector((state: Todos) => state);
    const dispatcher = useDispatch(); // dispatcher(ACTION) === mapDispatchToProps

    const _onChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setText(value);
    };

    const _onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatcher(addToDo(text));
        console.log(toDos);
        setText("");
    };

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={_onSubmit}>
                <input type="text" value={text} onChange={_onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((todo: Todo) => (
                    <li key={todo.id} id={String(todo.id)}>
                        <span>{todo.text}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
