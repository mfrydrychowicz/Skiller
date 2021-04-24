import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import VideoActions from '../components/VideoActions/VideoActions';

import { isTemplateTail } from 'typescript';
import { Icon, Box, IconButton, HStack, Flex, Grid } from '@chakra-ui/react';
import { FaCamera, FaHandPaper, FaMicrophoneSlash } from 'react-icons/fa';

import ChatBox from '../components/Chat/ChatBox';

const StyledVideo = styled.video`
    background: black;
    height: 100%;
    width: 100%;
    position: relative;
`;

const StyledChat = styled.div`
    height: 100%;
    width: 30%;
    borderradius: 10px;
`;

const HostStyledVideo = styled.video`
    height: 80%;
    width: 60%;
    margin: 0 auto;
    position: absolute;
`;

const Video = (props) => {
    const ref = useRef() as MutableRefObject<any>;

    useEffect(() => {
        props.peer.on('stream', (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return props.isHost ? (
        <HostStyledVideo playsInline autoPlay ref={ref} />
    ) : (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
};

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef() as MutableRefObject<any>;
    const userVideo = useRef() as MutableRefObject<any>;
    const peersRef = useRef([]) as MutableRefObject<any>;
    const roomID = props.match.params.roomId;

    const isHost = props.location?.state?.isHost ?? false;
    // console.log('🚀 ~ file: Room.tsx ~ line 44 ~ Room ~ isHost', isHost);
    // console.log(props.match.params);
    useEffect(() => {
        socketRef.current = io('/');
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit('join room', roomID);
            socketRef.current.on('all users', (users) => {
                const peers = [];
                users.forEach((userID) => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer
                    });
                    peers.push({ peerID: userID, peer });
                });
                setPeers(peers);
            });

            socketRef.current.on('user joined', (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer
                });

                const peerObj = {
                    peer,
                    peerID: payload.callerID
                };

                setPeers((users) => [...users, peerObj]);
            });

            socketRef.current.on('receiving returned signal', (payload) => {
                const item = peersRef.current.find((p) => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on('user left', (id) => {
                const peerObj = peersRef.current.find((p) => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter((p) => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            });
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('sending signal', { userToSignal, callerID, signal });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('returning signal', { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Flex direction="row" m={3}>
            <Box w="70%">
                <StyledVideo muted ref={userVideo} autoPlay playsInline h="700" borderRadius={2} />
                {peers.map((peer) => {
                    return <Video key={peer.peerID} peer={peer.peer} />;
                })}
                <Box d="flex" justifyContent="center" w="69%" pos="absolute" bottom={0} mb={4}>
                    <VideoActions></VideoActions>
                </Box>
            </Box>
            <StyledChat>
                <ChatBox roomID={roomID} />
            </StyledChat>
        </Flex>
    );
};

export default Room;
