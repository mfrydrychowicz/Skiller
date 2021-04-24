import { Image, Flex, Heading, Text, Spacer, Icon, HStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TrophyOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { newUser } from '../../db/newUser';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TopNavBar() {
    const [points, setPoints] = useState(0);
    const [user] = useAuthState(auth);
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

    const logout = () => {
        firebase.auth().signOut()
    }
    return (
        <Flex bgColor="brand.darkgrey" paddingX="3em" height="4em" alignItems="center">
            <Link to="/">
                <HStack spacing="1em">
                    <Image src="./logo.svg" alt="Skiller logo" height="3em" color="brand.orange" />
                    <Heading size="md" color="brand.orange">
                        SKILLER
                    </Heading>
                </HStack>
            </Link>
            <Spacer />
            {user?.uid ? (
                <HStack spacing="2em">
                    <Icon as={TrophyOutline} fill="brand.orange" />
                    <Text mr="2" color="brand.orange">
                        {points} pt
                    </Text>
                    <Text mr="2" color="brand.orange">
                        {user.displayName}
                    </Text>                    
                </HStack>
            ) : (
                <Button colorScheme="orange" variant="solid" size="md" onClick={login}>
                    Register/ Login
                </Button>
            )}
        </Flex>
    );
}
