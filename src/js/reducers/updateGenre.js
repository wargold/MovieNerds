import {UPDATE_GENRES} from "../constants/constants";

const initialState = {
    updategenres:[],
    isFetching: false
}

const UpdateGenres = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GENRES:
            return Object.assign({}, state, {
                isFetching: action.fetchStatus,
                updategenres: action.data
            });
        default:
            return state;
    }
};

export default UpdateGenres;