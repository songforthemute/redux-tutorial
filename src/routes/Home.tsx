import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Todos } from "store";

// TSX
const Home = (props: { toDos: Todos; dispatch: Function }) => {
    console.log(props);

    const [text, setText] = useState("");

    const _onChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setText(value);
    };

    const _onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setText("");
    };

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={_onSubmit}>
                <input type="text" value={text} onChange={_onChange} />
                <button>Add</button>
            </form>
            <ul></ul>
        </>
    );
};

// react-redux: mapStateToProps(state, ownProps?)
// Redux state로부터 컴포넌트에 props으로써 전달
const getCurrentState = (state: Todos) => {
    // console.log(state);
    return { toDos: state };
};

// react-redux: connect(mapStateToProps)(Component)
// 컴포넌트로 보내는 props에 추가될 수 있도록 허용함.
export default connect(getCurrentState)(Home);
