import sesionUserReducer from './sessionUserReducer';
import openSnackbarReducer from './openSnackbarReducer';

export const mainReducer = ({ sessionUser,openSnackbar }, action) => {

    return {
        sessionUser: sesionUserReducer(sessionUser, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action)
    }
}