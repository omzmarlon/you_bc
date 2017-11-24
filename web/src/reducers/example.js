import { INCREMENT } from '../actions/actionTypes';

const example = (state = {counter: 0}, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                counter: state.counter + 1
            };
        default:
            return state;
    }
};

export default example;