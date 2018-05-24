import {UPDATE_VERIFICATION_STATUS} from "../../actions/actionTypes";

const initial = {
    approved: false
};

const verification = (state = initial, action) => {
    switch (action.type) {
        case UPDATE_VERIFICATION_STATUS:
            return {...state, approved: action.approved};
        default:
            return state;
    }
};

export default verification;
