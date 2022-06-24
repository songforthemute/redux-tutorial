import { ChangeEvent, FormEvent, useState } from "react";

const Home = () => {
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

export default Home;
