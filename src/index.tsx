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
interface Action {
    type: string;
    text: string;
    id: number;
}
let nextId: number = 1;

// reducer
const reducer = (state = initState, action: Action): Todos => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return [{ text: action.text, id: action.id }, ...state];
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
};

// redux store
const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

// functions
const addToDo = (text: string) => {
    store.dispatch({ type: ADD_TODO, text, id: nextId });
};

const removeToDo = (e: Event) => {
    const item = (e.target as HTMLButtonElement).parentNode;

    // 해결: "에러: 'EventTarget' 형식에 'id' 속성이 없습니다"
    if (item instanceof HTMLLIElement) {
        const { id, innerText } = item;
        store.dispatch({
            type: REMOVE_TODO,
            text: innerText.slice(0, -1),
            id: Number(id),
        });
    }
};

// render in ul list
const renderToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach((toDo: Todo) => {
        const li = document.createElement("li") as HTMLLIElement;
        const btn = document.createElement("button") as HTMLButtonElement;
        btn.textContent = "❌";
        btn.addEventListener("click", removeToDo);
        li.id = String(toDo.id);
        li.textContent = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
};

store.subscribe(renderToDos);

// input submit
const onSubmit = (e: Event) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
