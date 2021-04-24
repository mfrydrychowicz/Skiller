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
import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link, useHistory } from 'react-router-dom';
import { newRoom } from '../../db/newRoom';
import RoomCard from './RoomCard/RoomCard';
import { AddIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import socket from '../../socket';

const RoomsList = (props) => {
    const [roomName, setRoomName] = useState('');
    const history = useHistory();
    const [rooms, loading, error] = useCollection(firebase.firestore().collection('Rooms'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });

    const roomRef = useRef() as MutableRefObject<any>;
    const userRef = useRef() as MutableRefObject<any>;
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

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

    useEffect(() => {
        socket.on('FE-error-user-exist', ({ error }) => {
            if (!error) {
                const roomName = roomRef.current.value;
                const userName = userRef.current.value;

                sessionStorage.setItem('user', userName);
                props.history.push(`/room/${roomName}`);
            } else {
                setErr(error);
                setErrMsg('User name already exist');
            }
        });
    }, [props.history]);

    function clickJoin() {
        const roomName = 'test';
        const userName = 'asia';

        if (!roomName || !userName) {
            setErr(true);
            setErrMsg('Enter Room Name or User Name');
        } else {
            socket.emit('BE-check-user', { roomId: roomName, userName });
        }
    }

    if (loading) return <Spinner />;

    return (
        <>
            <Flex wrap="wrap" maxWidth="100%" justify="center">
                {rooms.docs.map((room) => (
                    <Box m="50px" key={room.id} ref={roomRef} onClick={clickJoin}>
                        <Link to={`/room/${room.id}`}>
                            <RoomCard id={room.id} name={room.data().name} />
                        </Link>
                    </Box>
                ))}
            </Flex>
            jasne
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
                                    onClick={onClose}
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
