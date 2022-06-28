import { createStore } from "redux";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { createAction, createReducer } from "@reduxjs/toolkit";

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
    text?: string;
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
const reducer = createReducer(initState, (builder) => {
    // createReducer는 mutation 가능 => state를 mutate하거나, new state를 반환해야 함.
    builder
        .addCase(addToDo, (state: StateType, action: ActionType) => {
            if (action.payload.text)
                state.items.push({
                    text: action.payload.text,
                    id: action.payload.id,
                });
        })
        .addCase(removeToDo, (state: StateType, action: ActionType) => {
            state.items = state.items.filter(
                (toDo) => toDo.id !== action.payload.id
            );
        });
});

// define redex store
const store = createStore(persistReducer(persistConfig, reducer));

// export
export default store;
