import { AUTH_FACEBOOK, AUTH_FACEBOOK_SUCCESS, AUTH_FACEBOOK_FAIL, AUTH_LOGOUT, AUTH_UNREGISTERED } from '../constants/constants'

const initialState = {
    user: '',
    loading: true,
    authenticated: false,
    redirect: false,
    redirectLogout: false,
    error: null
}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_UNREGISTERED:
            return { ...state, authenticated: false, redirect: false, loading: false };
        case AUTH_FACEBOOK_SUCCESS:
            return { ...state, authenticated: true, redirectLogout: false, redirect: true, user: action.user, loading: false };
        case AUTH_FACEBOOK_FAIL:
            return { ...state, authenticated: false, redirect: false, error: action.error, loading: false };
        case AUTH_LOGOUT:
            return { ...state, authenticated: false, redirectLogout: true, error: action.error, loading: false };
        default:
            return state;
    }
};

export default Auth;

