import { ReactElement } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { newUser } from '../../db/newUser';
import {
    Image,
    Flex,
    Heading,
    Text,
    Icon,
    HStack,
    SimpleGrid,
    Box,
    List,
    ListItem,
    ListIcon,
    VStack,
    Button
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

export const WelcomeScreen = (): ReactElement => {
    const MotionListItem = motion(ListItem);
    const MotionButton = motion(Button);
    const buttonVariants = {
        hover: {
            scale: 1.2,
            textShadow: '0px 0px 8px rgb(255,255,255)',
            boxShadow: '0px 0px 8px rgb(255,255,255)',
            transition: {
                duration: 0.3,
                yoyo: 5
            }
        }
    };
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
        <Flex flexDirection="column" height="100%">
            <SimpleGrid columns={3} spacingY="40px" marginTop="34px">
                <Box d="flex" justifyContent="center" alignItems="center" w="100%" h="100%">
                    <List spacing={12}>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: -2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Effective skill-sharing
                        </MotionListItem>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: -2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120, delay: 0.8 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Gamification in action
                        </MotionListItem>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: -2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120, delay: 1.6 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Quick communication
                        </MotionListItem>
                    </List>
                </Box>
                <Box d="flex" justifyContent="center" alignItems="center" w="100%" h="100%">
                    <Image src="good_team.svg" boxSize="400px" objectFit="contain" />
                </Box>

                <Box d="flex" justifyContent="center" alignItems="center" w="100%" m="0">
                    <List spacing={12}>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: 2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120, delay: 1.6 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Increased motivation
                        </MotionListItem>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: 2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120, delay: 0.8 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Better productivity
                        </MotionListItem>
                        <MotionListItem
                            textTransform="uppercase"
                            initial={{ x: 2500 }}
                            animate={{ x: 0 }}
                            transition={{ type: 'spring', stiffness: 120 }}
                        >
                            <ListIcon as={StarIcon} color="brand.orange" />
                            Improved cooperation
                        </MotionListItem>
                    </List>
                </Box>
            </SimpleGrid>
            <Box d="flex" justifyContent="center" alignItems="center">
                <MotionButton
                    width="30%"
                    colorScheme="orange"
                    variant="solid"
                    size="lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    onClick={login}
                >
                    Join us!
                </MotionButton>
            </Box>
        </Flex>
    );
};
