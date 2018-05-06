import { INCREMENT } from './actionTypes';

export const increment = () => ({
    type: INCREMENT
});

// example for async actions
// export const incrementAsync = (delay = 1000) => dispatch => {
//     setTimeout(() => {
//         dispatch(increment())
//     }, delay)
// };