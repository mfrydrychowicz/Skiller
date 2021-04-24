import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import firebase from 'firebase';
import { useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link, useHistory } from 'react-router-dom';
import { newRoom } from '../../db/newRoom';
import RoomCard from './RoomCard/RoomCard';
import { AddIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';

const RoomsList = () => {
    const [roomName, setRoomName] = useState('');
    const history = useHistory();
    const [rooms, loading, error] = useCollection(firebase.firestore().collection('Rooms'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const handleRoomNameChange = (event: any) => {
        setRoomName(event.target.value);
    };

    const handleRoomNameSubmit = async () => {
        setRoomName('');
        const id = await newRoom(roomName);
        console.log('🚀 ~ file: RoomsList.tsx ~ line 23 ~ handleRoomNameSubmit ~ id', id);
        history.push(`/room/${id}`, { isHost: true });
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Flex wrap="wrap" maxWidth="100%" justify="center">
                {rooms.docs.map((room) => (
                    <Box m="50px" key={room.id}>
                        <Link to={`/room/${room.id}`}>
                            <RoomCard id={room.id} name={room.data().name} />
                        </Link>
                    </Box>
                ))}
            </Flex>
            <Button
                leftIcon={<AddIcon />}
                sx={{ position: 'absolute', bottom: '25px', right: '35px', zIndex: '10' }}
                onClick={onOpen}
            >
                {' '}
                Add New Room
            </Button>
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
