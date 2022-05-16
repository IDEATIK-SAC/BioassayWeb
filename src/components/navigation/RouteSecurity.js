import React from 'react';
import { Route ,Redirect} from 'react-router-dom';
import { useStateValue } from '../../context/store';

function RouteSecurity({ component: Component, ...rest }) {
    const [{ sessionUser }, dispatch] = useStateValue();
    
    return (
        <Route
            {...rest}
            render={(props) =>
                sessionUser ? (sessionUser.authenticated === true ? (
                    <Component {...props} {...rest} />
                ) :
                <Redirect to="/auth/login"/>
                ) :
                <Redirect to="/auth/login"/>
            }
        />
    );
}
export default RouteSecurity;