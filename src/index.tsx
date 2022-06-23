/**
 * '--isolatedModules'에서는 'index.tsx'을(를) 컴파일할 수 없는데 전역 스크립트 파일로 간주되기 때문입니다.
 * 모듈로 만들려면 가져오기, 내보내기 또는 빈 'export {}' 문을 추가하세요.
 * 에러 해결: export {};
 *  혹은 다른 패키지를 import 하는 경우 해결됨.
 */
import { createStore } from "redux";
// === legacy_createStore

const add = document.getElementById("add") as HTMLButtonElement;
const min = document.getElementById("min") as HTMLButtonElement;
const num = document.getElementById("num") as HTMLSpanElement;

// reducer: function === function of modifying data, so return modified data
const countModifier = (count: string = "0", action: { type: string }) => {
    const cnt = Number(count);

    switch (action.type) {
        case ADD:
            return String(cnt + 1);
        case MINUS:
            return String(cnt - 1);
        default:
            return count;
    }
};

// init HTMLElement
num.textContent = "0";

// action.type variable: string으로 설정 시 오타났을 때의 찾기 어려운 에러를 방지 가능
const ADD: string = "ADD";
const MINUS: string = "MINUS";

// init redux store
const countStore = createStore(countModifier);

/**
 * console.log(store) == { dispatch, subscribe, getState, replaceReducer }
 * - getState: state의 상태
 *      if (reducer == return "hello")
 *          console.log(store.getState()) == "hello"
 * - dispatch: action: {}을 전달하는 방법, action은 { type: string } 형태로 전달해야함.
 * - subscribe: store 내부의 변화를 알 수 있게 함.
 *      store.subscribe(arg: function)
 */

// config redux store's subscribe
const onChange = () => {
    num.textContent = countStore.getState();
};
countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
min.addEventListener("click", () => countStore.dispatch({ type: MINUS }));
