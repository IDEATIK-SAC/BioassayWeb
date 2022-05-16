export const initalState = {
    user: {
        email: "",
        id: 0,
        isActive: false,
        login: '',
        name: "",
        password: '',
        phone: "",
        userProfileId: 0
    },
    authenticated: false
};

const sesionUserReducer = (state = initalState, action) => {

    switch (action.type) {
        case "SESSION_START":
            return {
                ...state,
                user: action.session,
                authenticated: action.authenticated
            };
        case "SESSION_END":
            return {
                ...state,
                user: action.newUser,
                authenticated: action.authenticated
            };
        case "SESSION_UPDATE":
            return {
                ...state,
                user: action.newUser,
                authenticated: action.authenticated
            };
        default: return state;
    }
};

export default sesionUserReducer;
