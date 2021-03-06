import { Image, Flex, Heading, Text, Spacer, Icon, HStack, useColorMode, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IoTrophyOutline } from 'react-icons/io5';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { newUser } from '../../db/newUser';
import { usePoints } from '../../hooks/usePoints';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Logout/Logout';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { onUserLogout } from '../Logout/Logout';

// Use this https://codepen.io/sosuke/pen/Pjoqqp to get filter for desired icon color

export default function TopNavBar() {
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [points, setPoints] = useState(0);

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

    const { colorMode, toggleColorMode } = useColorMode();

    const changeColorMode = (newMode) => {
        if (colorMode !== newMode) {
            toggleColorMode();
        }
    };

    useEffect(() => {
        if (user) {
            firebase
                .firestore()
                .collection('Users')
                .doc(user.uid)
                .onSnapshot((d) => {
                    setPoints(d.data().points);
                });
        }
    }, [user]);

    const colorModeIcon =
        colorMode === 'light' ? (
            <MoonIcon color="brand.orange" onClick={changeColorMode} h={6} w={6} />
        ) : (
            <SunIcon color="brand.orange" onClick={changeColorMode} h={6} w={6} />
        );


    const commands = [
        {
            command: ['open (website) *', 'go to * (website)'],
            callback: (site) => {
            console.log('opening webiste: ', site.split(" ").join(""))
            window.open("http://" + site.split(" ").join(""));
            },
        },
        // {
        //     command: ['select *', 'pick *', 'answer *'],
        //     callback: (answer) => {
        //     props.pickAnswerFunction(answer);
        //     },
        // },
        {
            command: "change to dark mode",
            callback: () => {
            console.log('switching to dark mode!')
            if (colorMode === "light") {
                toggleColorMode();
            }
            },
        },
        {
            command: "change to light mode",
            callback: () => {
            console.log('switching to light mode!')
            if (colorMode === "dark") {
                toggleColorMode();
            }
            },
        },
        {
            command: ['show chatroom', 'open chatroom'],
            callback: () => {
            console.log('opening chatroom site')
            window.location.href = '/'
            },
        },
        {
            command: ['show ranking', 'open ranking', 'show hall of fame', 'open hall of fame'],
            callback: () => {
            console.log('opening ranking site')
            window.location.href = '/halloffame'
            },
        },
        {
            command: ['log out', 'logout', 'log off'],
            callback: () => {
                console.log('logging out...')
                onUserLogout();
            },
        },
        {
            command: ['mute (mic)'],
            callback: () => {
                SpeechRecognition.stopListening();
            },
        },
        ]
        
    const { transcript, resetTranscript } = useSpeechRecognition({ commands });

    const [isListening, setIsListening] = useState(false);
    
    const turnOnListening = () => {
        console.log('turning on listening');
        setIsListening(true);
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US',
          })
    
    }

    const turnOffListening = () => {
        console.log('turning off listening');
        setIsListening(false);
        SpeechRecognition.stopListening();
        resetTranscript();
      
    }

    const microphoneIcon = isListening ? 
    <Icon as={FaMicrophoneSlash} color="brand.orange" onClick={turnOffListening} /> :
    <Icon as={FaMicrophone} color="brand.orange" onClick={turnOnListening} />;


    return (
        <>
            <Flex
                bgColor={colorMode === 'light' ? 'brand.white' : 'brand.darkgrey'}
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
                        <Icon as={IoTrophyOutline} color="brand.orange" h={6} w={6} 
                        onClick={() => window.location.href = "/halloffame"} />
                        <Text mr="2" color="brand.orange">
                            {points}
                        </Text>
                        <Text mr="2" color="brand.orange">
                            {user.displayName}
                        </Text>
                        {colorModeIcon}
                        {microphoneIcon}
                        <Logout />
                    </HStack>
                ) : (
                    <Button color="brand.orange" variant="solid" size="md" onClick={login}>
                        Register/ Login
                    </Button>
                )}
            </Flex>
        </>
    );
}
