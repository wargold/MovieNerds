import {SEARCH} from '../constants/constants'

const initialState = {
    value: ''
}

const Search = (state = initialState, action) => {
    switch (action.type){
        case SEARCH:
            return Object.assign({}, state, {
                value:action
            });
        default:
            return state;
    }
};

export default Search;