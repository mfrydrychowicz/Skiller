import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Spinner } from '@chakra-ui/react';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, loading, error] = useAuthState(auth);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ error', error);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ loading', loading);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ user', user);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        console.log(error);
        return <div>Erroor</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/start',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
