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
export interface StateType {
    items: ToDosType;
}

// initialize state & id
const initState: StateType = { items: [] };

// reducer function
const reducer = (state = initState, action: ActionType): StateType => {
    // console.log(state, action);
    switch (action.type) {
        case ADD:
            if (action.text)
                return {
                    items: [
                        {
                            text: action.text,
                            id: action.id,
                        },
                        ...state.items,
                    ],
                };
            else return state;
        case REMOVE:
            return {
                items: state.items.filter((todo) => todo.id !== action.id),
            };
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
