# Redux

## 목차

- [`createStore`](#createstore)
- [Example](#example)
- [with React](#with-react)

---

### `createStore`
- data를 넣을 수 있는 store를 생성하는 함수.
- 인수1: `reducer` 리듀서(리듀싱) 함수.
  - reducer는 data를 modify하는 역할로, modified data를 반환하는 함수.
  - `state, action`을 인수로 받음. state는 말 그대로 데이터, action은 명령을 의미. action은 반드시 plain object여야 하여, type 프로퍼티가 필요함.
- 인수2: `[preloadedState]`, 초기 상태.
- 반환: `{ dispatch: f dispatch(action), subscribe: f subscribe(listener), getState: f getState(), replaceReducer: f replaceREducer(nextReducer) }`
  - `dispatch(action)`: 상태 변경을 위해 스토어로 액션을 보내는 함수.
  - `subscribe()`: 변경 사항에 대한 리스너. 액션이 보내져 상태 트리의 일부가 변경될 수 있을 때마다 호출됨. 

```javascript
import { createStore } from "redux";

const number = document.querySelector(".number");
const add = document.querySelector(".add");
const minus = document.querySelector("minus");

const ADD = "ADD";
const MINUS = "MINUS";

const reducer = (state = 0, action: {}) => {
  if (action.type === ADD) {
    return state + 1;
  }
  if (action.type === MINUS) {
    return state - 1;
  }
  return state;
};

const store = createStore(reducer);

store.subscibe(() => {
  // store에 변화가 생길 때마다 함수의 블록문 실행
  number.innerText = countStore.getState();
});

add.addEventListener('click', () => {
  store.dispatch({ type: ADD });
});
minus.addEventListener('click', () => {
  store.dispatch({ type: MINUS });
});

```
- [`createStore(reducer, [preloadedState], [enhancer])` | redux.js.org](https://ko.redux.js.org/api/createstore/)

---

### Example

#### Redux 적용 이전
```javascript
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const todos = [];

const createTodo = (todo) => {
  const li = document.createElement("li");
  li.textContent = todo;
  ul.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  createTodo(todo);
};

form.addEventListener("submit", onSubmit);
```


#### Redux 적용 후
```javascript
import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const [ADD_TODO, DELETE_TODO] = ["ADD_TODO", "DELETE_TODO"];

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return [...state.filter(todo => todo.id !== +action.id)];
    default:
      return [];
  }
};

const store = createStore(reducer);

const renderTodos = () => {
  const todos = store.getState();
  todos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.addEventListener("click", deleteTodo);
    li.id = todo.id;
    li.textContent = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// store의 state가 변경될 때마다 실행
store.subscribe(renderTodos);

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text
  };
};

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  };
};

const dispatchDeleteTodo = (e) => {
  const { id } = e.target.parentNode;
  store.dispatch(id);
};

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  addTodo(todo);
};

form.addEventListener("submit", onSubmit);
```

---

### with React

-   `redux`, `react-redux`
-   `redux-persist`, `@reduxjs/toolkit`

-   [Home.js](#homejs)
-   [Todo.js](#todojs)
-   [store.js](#storejs)
-   [index.js](#indexjs)

#### Home.js

```javascript
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "./todo";

const Home = ({ todos, dispatch }) => {
    console.log(todos); // state is provided by the store
    const [text, setText] = React.useState("");

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatchAddTodo(text);
        setText("");
    };

    return (
        <React.Fragment>
            <h1>To do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <Todo {...todo} key={todo.id} />
                ))}
            </ul>
        </React.Fragment>
    );
};

/**
 * @param {state} state store's state
 * @param {ownProps} props Component's props
 * @return to push state in component's props
 * Redux state를 컴포넌트에 prop으로 전달하는 함수.
 */
const mapStateToProps = (state) => {
    return { todos: state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchAddTodo: (text) => dispatch(actionCreators.addTodo(text)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

#### Todo.js

```javascript
import { connect } from "react-redux";
import { actionCreators } from "../store";

const Todo = ({ text, onBtnClick }) => {
    return (
        <li>
            {text} <button onClick={onBtnClick}>❌</button>
        </li>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBtnClick: () => dispatch(actionCreators.delTodo(+ownProps.id)),
    };
};

export default connect(null, mapDispatchToProps)(Todo);
```

#### store.js

```javascript
import { createStore } from "redux";

const [ADD, DLE] = ["ADD", "DEL"];

const addTodo = (text) => {
    return {
        type: ADD,
        text,
    };
};

const delTodo = (id) => {
    return {
        type: DEL,
        id,
    };
};

export const actionCreators = {
    addTodo,
    delTodo,
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
        case DLE:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
};

const store = createStore(reducer);

/**
 * 바닐라 앱이었다면 여기서 렌더 함수를 넣었겠지만,
 * React는 모든 것을 다시 렌더링하지 않기 때문에 react-redux 필요.
 */
// store.subscribe();

export default store;
```

#### index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "@components/app";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

