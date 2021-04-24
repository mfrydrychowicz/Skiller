import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Spinner, Box } from '@chakra-ui/react';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, loading, error] = useAuthState(auth);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ error', error);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ loading', loading);
    console.log('🚀 ~ file: PrivateRoute.tsx ~ line 8 ~ PrivateRoute ~ user', user);

    if (loading)
        return (
            <Box Box position="absolute" top="50%" left="50%">
                <Spinner thickness="8px" speed="0.65s" emptyColor="gray.200" color="brand.orange" size="xl"></Spinner>
            </Box>
        );

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
