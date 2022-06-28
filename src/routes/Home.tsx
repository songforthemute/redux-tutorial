import ToDoList from "components/ToDoList";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToDoType, ToDosType, StateType, add, remove } from "store";

const Home = () => {
    const [text, setText] = useState("");

    /**
     * useSelector Hook === mapStateToProps & connect
     * useSelector() 사용시 스토어에서 바로 빼와서 컴포넌트 인자에 props를 적어줄 필요가 없음.
     * useSelector(callback)에서 callback의 state 인자 타입 === { state: RootState }
     */
    const toDos: ToDosType = useSelector(
        (state: StateType): ToDosType => state.items
    );
    const dispatcher = useDispatch(); // dispatcher(ACTION) === mapDispatchToProps

    // detecting input
    const _onChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setText(value);
    };

    // adding Todo
    const _onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatcher(add(text));
        setText("");
    };

    // removing Todo
    const _onClick = (e: MouseEvent) => {
        const { parentNode } = e.target as HTMLButtonElement;
        const { id } = parentNode as HTMLLIElement;
        dispatcher(remove(Number(id)));
    };

    // console.log("toDos: ", toDos);

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={_onSubmit}>
                <input type="text" value={text} onChange={_onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((todo: ToDoType) => (
                    <ToDoList
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        _onClick={_onClick}
                    />
                ))}
            </ul>
        </>
    );
};

export default Home;
