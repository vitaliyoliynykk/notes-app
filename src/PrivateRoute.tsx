import React, { useContext } from 'react';
import { AuthContext } from './containers/Auth/AuthProvider';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line
const PrivateRoute = ({ component: RouteComponent, path }: { component: any; path: string }): React.ReactElement => {
    const currentUser = useContext<firebase.User | null>(AuthContext);

    return (
        <Route
            path={path}
            render={(routerProps): React.ReactNode =>
                !!currentUser ? <RouteComponent {...routerProps} /> : <Redirect to={'/auth'} />
            }
        ></Route>
    );
};

export default PrivateRoute;
