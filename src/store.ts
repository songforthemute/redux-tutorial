import { createStore } from "redux";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

// redux-persist configuration
const persistConfig = {
    key: "toDo",
    storage,
};

// actions
const ADD = "ADD" as const;
const REMOVE = "REMOVE" as const;

// initialize types & interface
export interface ToDoType {
    text: string;
    id: number;
}
export type ToDosType = ToDoType[];
export interface ActionType {
    type: string;
    text?: string;
    id: number;
}

// initialize state & id
const initState: ToDosType = [];

// reducer function
const reducer = (state = initState, action: ActionType): ToDosType => {
    // console.log(action);
    switch (action.type) {
        case ADD:
            if (action.text)
                return [
                    {
                        text: action.text,
                        id: action.id,
                    },
                    ...state,
                ];
            else return state;
        case REMOVE:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
};

// define redex store
const store = createStore(persistReducer(persistConfig, reducer));

// actions
export const addToDo = (text: string): ActionType => {
    return {
        type: ADD,
        text,
        id: Date.now(),
    };
};
export const removeToDo = (id: number): ActionType => {
    return {
        type: REMOVE,
        id,
    };
};

// export
export default store;
