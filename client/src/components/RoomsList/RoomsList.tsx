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

    if (loading)
        return (
            <Box Box position="absolute" top="50%" left="50%">
                <Spinner thickness="8px" speed="0.65s" emptyColor="gray.200" color="brand.orange" size="xl"></Spinner>
            </Box>
        );

    return (
        <>
            <Box d="flex" flexDirection="row" justifyContent="space-between" m={4}>
                <InputGroup w="30%" display="none">
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
                    color="brand.orange"
                >
                    {' '}
                    Add New Room
                </Button>
            </Box>

            <Text w="100%" fontWeight="bold" mt={5} textAlign="center" fontSize="2em" color="brand.orange">
                Active rooms
            </Text>

            <Flex wrap="wrap" maxWidth="100%" minHeight="86vh" justify="center">
                {rooms.docs.map((room) => (
                    <Box m="20px" key={room.id} w="30%">
                        <Link to={`/room/${room.id}`}>
                            <RoomCard id={room.id} name={room.data().name} user={room.data().user} />
                        </Link>
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
                                    color="brand.orange"
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
