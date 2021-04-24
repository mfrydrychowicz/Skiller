import {
    Box,
    Button,
    ButtonGroup,
    Drawer,
    Icon,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Spinner,
    useDisclosure,
    useColorMode
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import firebase from 'firebase';
import { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link, useHistory } from 'react-router-dom';
import { newRoom } from '../../db/newRoom';
import RoomCard from './RoomCard/RoomCard';
import { AddIcon, CloseIcon, CheckIcon, SearchIcon } from '@chakra-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

const RoomsList = () => {
    const [roomName, setRoomName] = useState('');
    const history = useHistory();
    const [rooms, loading, error] = useCollection(firebase.firestore().collection('Rooms'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });
    const [user] = useAuthState(auth);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const handleRoomNameChange = (event: any) => {
        setRoomName(event.target.value);
    };

    const handleRoomNameSubmit = async () => {
        setRoomName('');
        const id = await newRoom(roomName, {
            userId: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        });
        console.log('🚀 ~ file: RoomsList.tsx ~ line 23 ~ handleRoomNameSubmit ~ id', id);
        history.push(`/room/${id}`, { isHost: true });
    };

    const { colorMode } = useColorMode();

    if (loading) return <Spinner />;

    return (
        <>
            <Box d="flex" flexDirection="row" justifyContent="space-around" m={2}>
                <InputGroup w="30%">
                    <InputLeftElement pointerEvents="none" children={<Icon as={SearchIcon} />} />
                    <Input
                        type="room"
                        placeholder="Find room"
                        backgroundColor={colorMode === 'light' ? 'brand.white' : 'brand.darkgrey'}
                    />
                </InputGroup>
                <Button
                    leftIcon={<AddIcon />}
                    sx={{ position: 'inherit', bottom: '25px', right: '35px', zIndex: '10' }}
                    onClick={onOpen}
                    colorScheme="orange"
                >
                    {' '}
                    Add New Room
                </Button>
            </Box>
            <Flex
                wrap="wrap"
                maxWidth="100%"
                minHeight='86vh'
                justify="center"
                bg={colorMode === 'light' ? 'brand.white' : 'brand.darkgrey'}
            >
                <Text w="100%" pl={16} fontWeight="bold" mt={5}>
                    Active rooms
                </Text>
                {rooms.docs.map((room) => (
                    <Box m="20px" key={room.id} w="30%">
                            <RoomCard id={room.id} name={room.data().name} user={room.data().user} />
                    </Box>
                ))}
            </Flex>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>Room name</DrawerHeader>

                        <DrawerBody m="50px 0 ">
                            <Input
                                placeholder="Your new room"
                                onChange={(e) => setRoomName(e.target.value)}
                                isRequired
                            />
                        </DrawerBody>

                        <DrawerCloseButton />

                        <DrawerFooter>
                            <ButtonGroup>
                                <Button
                                    leftIcon={<CheckIcon />}
                                    variant="solid"
                                    colorScheme="blue"
                                    onClick={handleRoomNameSubmit}
                                    align="baseline"
                                >
                                    Add
                                </Button>
                            </ButtonGroup>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default RoomsList;
