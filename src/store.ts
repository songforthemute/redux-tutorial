import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// initialize types & interface
export interface ToDoType {
    text: string;
    id: number;
}
export type ToDosType = ToDoType[];
export interface ActionType<T> {
    type: string;
    payload: T;
}
export interface StateType {
    items: ToDosType;
}

// initialize state
const initialState: StateType = { items: [] };

// define reducer, actions
const toDos = createSlice({
    name: "toDosReducer",
    initialState,
    reducers: {
        add: (state: StateType, action: ActionType<ToDoType["text"]>) => {
            state.items.push({
                text: action.payload,
                id: Date.now(),
            });
        },
        remove: (state: StateType, action: ActionType<ToDoType["id"]>) => {
            state.items = state.items.filter(
                (toDo) => toDo.id !== action.payload
            );
        },
    },
});

// export actions
export const { add, remove } = toDos.actions;

// redux-persist configuration
const persistConfig = {
    key: "toDo",
    storage,
};

// redux-persist
const _persistReducer = persistReducer(persistConfig, toDos.reducer);

// declare redux store(redux toolkit use immer.js)
const store = configureStore({
    reducer: _persistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// declare redux-persist store for localStorage
export const persistor = persistStore(store);
export default store;
