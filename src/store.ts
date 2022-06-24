import { createStore } from "redux";

const ADD = "ADD" as const;
const REMOVE = "REMOVE" as const;

// initialize types & interface
interface Todo {
    text: string;
    id: number;
}
type Todos = Todo[];
interface Action {
    type: string;
    text: string;
    id: number;
}

// initialize state & id
const initState: Todos = [];
let nextId: number = 1;

// reducer function
const reducer = (state = initState, action: Action): Todos => {
    // console.log(action);
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: action.id }, ...state];
        case REMOVE:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
};

// define redex store
const store = createStore(reducer);

// actions
export const addToDo = (text: string): Action => {
    return {
        type: ADD,
        text,
        id: nextId,
    };
};
export const removeToDo = (id: number): Action => {
    return {
        type: REMOVE,
        text: "",
        id,
    };
};

// export
export default store;
