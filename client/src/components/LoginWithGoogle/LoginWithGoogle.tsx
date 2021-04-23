import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { newUser } from '../../db/newUser';

const LoginWithGoogle = () => {
    const history = useHistory();

    const login = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            // const credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            await newUser(user);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button leftIcon={<FcGoogle />} onClick={login}>
            Sign in with google
        </Button>
    );
};

export default LoginWithGoogle;
