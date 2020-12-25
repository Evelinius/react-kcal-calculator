import { createStore } from 'redux';

const store = createStore(reducer);

export default store;

export const ActionTypes = {
    KBGU_CALCULATE: 'KBGU_CALCULATE'
}

function reducer(state, action) {
    switch (action.type) {
        case 'KBGU_CALCULATE':
            return { kbgu: action.kbgu };

        default:
            return state;
    }
}