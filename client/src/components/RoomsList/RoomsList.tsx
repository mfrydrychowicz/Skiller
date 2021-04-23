import { Box, Button, Input, Spinner } from '@chakra-ui/react';
import { css } from '@emotion/react';
import firebase from 'firebase';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link, useHistory } from 'react-router-dom';
import { newRoom } from '../../db/newRoom';

const RoomsList = () => {
    const [roomName, setRoomName] = useState('');
    const history = useHistory();
    const [rooms, loading, error] = useCollection(firebase.firestore().collection('Rooms'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });

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
            <Box maxWidth="sm">
                <Box m={4} textAlign="center">
                    <div>
                        <div>
                            {rooms.docs.map((room) => (
                                <Box
                                    key={room.id}
                                    css={css`
                                        display: flex;
                                        padding: 5px;
                                    `}
                                >
                                    <Box
                                        css={css`
                                            text-transform: uppercase;
                                        `}
                                    >
                                        {room.data().name}
                                    </Box>
                                    <Button
                                        variant="contained"
                                        css={css`
                                            margin-left: auto;
                                            margin-right: 0;
                                            font-size: 10px;
                                        `}
                                    >
                                        <Link to={`/room/${room.id}`}>test</Link>
                                    </Button>
                                </Box>
                            ))}
                        </div>
                        <Input
                            css={css`
                                margin-top: 50px;
                            `}
                            type="text"
                            placeholder="Pokój"
                            value={roomName}
                            onChange={handleRoomNameChange}
                        />
                        <Button
                            css={css`
                                margin-top: 10px;
                                background-color: #673ab7;
                                color: white;
                                &:hover {
                                    background-color: #673ab7;
                                }
                            `}
                            variant="contained"
                            onClick={handleRoomNameSubmit}
                        >
                            Stwórz pokój
                        </Button>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default RoomsList;
