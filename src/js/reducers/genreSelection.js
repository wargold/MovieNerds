import {UPDATE_GENRE_SELECTION,RESET_GENRE_SELECTION} from '../constants/constants'

const initialState = {
    multi: true,
    value: ''
}

const GenreSelections = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_GENRE_SELECTION:
            return{...state,value: action.value};
        case RESET_GENRE_SELECTION:
            return{...state,value: ''};
        default:
            return state;
    }
};

export default GenreSelections;

