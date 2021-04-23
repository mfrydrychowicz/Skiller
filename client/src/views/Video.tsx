import { Box, Button, Input } from '@chakra-ui/react';
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import useChat from '../../views/useChat';

const Video = () => {
    const [roomName, setRoomName] = useState('');
    const rooms = ['1', '2', '3'];
    // const { newRoom, newRooms } = useChat();

    // useEffect(() => {
    //     axios.get('/api/rooms').then(({ data }) => {
    //         setRooms(data);
    //     });
    // }, [newRooms]);

    const handleRoomNameChange = (event: any) => {
        setRoomName(event.target.value);
    };

    // const handleRoomNameSubmit = () => {
    //     newRoom(roomName);
    //     setRoomName('');
    // };

    return (
        <>
            <Box maxWidth="sm">
                <Box m={4} textAlign="center">
                    <div>
                        <div>
                            {rooms.map((r) => (
                                <Box
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
                                        {r}
                                    </Box>
                                    <Button
                                        variant="contained"
                                        css={css`
                                            margin-left: auto;
                                            margin-right: 0;
                                            font-size: 10px;
                                        `}
                                    >
                                        <a href={`/video/${r}`}>test</a>
                                    </Button>
                                </Box>
                            ))}
                        </div>
                        {/* <Input
                            css={css`
                                margin-top: 50px;
                            `}
                            type="text"
                            placeholder="Pokój"
                            value={roomName}
                            onChange={handleRoomNameChange}
                        /> */}
                        {/* <Button
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
                        </Button> */}
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Video;
