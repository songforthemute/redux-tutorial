import { createStore } from "redux";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { createAction } from "@reduxjs/toolkit";

// redux-persist configuration
const persistConfig = {
    key: "toDo",
    storage,
};

// actions
export const addToDo = createAction("ADD", function prepare(text: string) {
    return {
        payload: {
            text,
            id: Date.now(),
        },
    };
});
export const removeToDo = createAction("REMOVE", function prepare(id: number) {
    return {
        payload: {
            id,
        },
    };
});

// initialize types & interface
export interface ToDoType {
    text: string;
    id: number;
}
export type ToDosType = ToDoType[];
export interface PayloadType {
    text: string;
    id: number;
}
export interface ActionType {
    type: string;
    payload: PayloadType;
}
export interface StateType {
    items: ToDosType;
}

// initialize state & id
const initState: StateType = { items: [] };

// reducer function
const reducer = (state = initState, action: ActionType): StateType => {
    console.log(action);
    switch (action.type) {
        case addToDo.type:
            return {
                items: [
                    {
                        text: action.payload.text,
                        id: action.payload.id,
                    },
                    ...state.items,
                ],
            };
        case removeToDo.type:
            return {
                items: state.items.filter(
                    (todo) => todo.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
};

// define redex store
const store = createStore(persistReducer(persistConfig, reducer));

// export
export default store;
