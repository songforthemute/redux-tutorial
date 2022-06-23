import { createStore } from "redux";

// DOM
const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

// action constant
const ADD_TODO = "ADD_TODO" as const;
const REMOVE_TODO = "REMOVE_TODO" as const;

// initialize type
interface Todo {
    text: string;
    id: number;
}
type Todos = Todo[];
const initState: Todos = [];

// reducer
const reducer = (
    state = initState,
    action: { type: string; text: string }
): Todos => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return [{ text: action.text, id: Date.now() }, ...state];
        case REMOVE_TODO:
            return [];
        default:
            return state;
    }
};

// redux store
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

// render in ul list
const renderToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach((toDo: Todo) => {
        const li = document.createElement("li") as HTMLLIElement;
        li.id = String(toDo.id);
        li.innerText = toDo.text;
        ul.appendChild(li);
    });
};

store.subscribe(renderToDos);

// addTodo function
const addToDo = (text: string) => {
    store.dispatch({ type: ADD_TODO, text });
};

// input submit
const onSubmit = (e: Event) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
