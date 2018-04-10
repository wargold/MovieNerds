import { AUTH_FACEBOOK, AUTH_FACEBOOK_SUCCESS, AUTH_FACEBOOK_FAIL } from '../constants/constants'

const initialState = {
    user: '',
    authenticated: false,
    redirect: false,
    error: null
}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_FACEBOOK:
            return { ...state, authenticated: false, redirect: false};
        case AUTH_FACEBOOK_SUCCESS:
            return { ...state, authenticated: true, redirect: true, user: action.user};
        case AUTH_FACEBOOK_FAIL:
            return { ...state, authenticated: false, redirect: false, error: action.error };
        default:
            return state;
    }
};

export default Auth;

