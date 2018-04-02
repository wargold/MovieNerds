import {UPDATE_GENRE_SELECTION,UPDATE_OPTIONS} from '../constants/constants'

const initialState = {
    multi: true,
    value: ''
}

const GenreSelections = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GENRE_SELECTION:
            return{...state,value: action.value};
        default:
            return state;
    }
};

export default GenreSelections;

