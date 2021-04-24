import { Image, Flex, Heading, Text, Spacer, Icon, HStack, useColorMode, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IoTrophyOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { newUser } from '../../db/newUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Logout/Logout';

// Use this https://codepen.io/sosuke/pen/Pjoqqp to get filter for desired icon color

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
        firebase.auth().signOut();
    };
    const { colorMode, toggleColorMode } = useColorMode();

    const changeColorMode = (newMode) => {
        if (colorMode !== newMode) {
            toggleColorMode();
        }
    };

    const colorModeIcon =
        colorMode === 'light' ? (
            <MoonIcon color="brand.orange" onClick={changeColorMode} h={6} w={6} />
        ) : (
            <SunIcon color="brand.orange" onClick={changeColorMode} h={6} w={6} />
        );

    return (
        <>
            <Flex
                bgColor={colorMode === 'light' ? 'brand.darkgrey' : 'brand.middlegrey'}
                paddingX="3em"
                height="4em"
                alignItems="center"
            >
                <Link to="/">
                    <HStack spacing="1em">
                        <Image
                            src="./logo.svg"
                            alt="Skiller logo"
                            height="3em"
                            filter="invert(49%) sepia(69%) saturate(3966%) hue-rotate(359deg) brightness(103%) contrast(110%);"
                        />
                        <Heading size="md" color="brand.orange">
                            SKILLER
                        </Heading>
                    </HStack>
                </Link>
                <Spacer />

                {user?.uid ? (
                    <HStack spacing="2em">
                        <Icon as={IoTrophyOutline} color="brand.orange" h={6} w={6} />
                        <Text mr="2" color="brand.orange">
                            {points} pt.
                        </Text>
                        <Text mr="2" color="brand.orange">
                            {user.displayName}
                        </Text>
                        {colorModeIcon}
                        <Logout />
                    </HStack>
                ) : (
                    <Button colorScheme="orange" variant="solid" size="md" onClick={login}>
                        Register/ Login
                    </Button>
                )}
            </Flex>
        </>
    );
}
