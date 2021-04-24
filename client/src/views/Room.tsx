import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';

import { isTemplateTail } from 'typescript';
import { Icon, Box, IconButton, HStack, Flex, Grid, GridItem, Button } from '@chakra-ui/react';
import { FaCamera, FaHandPaper, FaMicrophoneSlash } from 'react-icons/fa';
import {
    HandRightOutline,
    HandRight,
    MicOutline,
    MicOffOutline,
    VideocamOutline,
    VideocamOffOutline,
    LaptopOutline
} from 'react-ionicons';

import ChatBox from '../components/Chat/ChatBox';

const StyledVideo = styled.video`
    background: black;
    height: 100%;
    width: 100%;
    /* position: relative; */
`;

const StyledChat = styled.div`
    height: 100%;
    width: 30%;
    borderradius: 10px;
`;

const Video = (props) => {
    const ref = useRef() as MutableRefObject<any>;

    useEffect(() => {
        props.peer.on('stream', (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef() as MutableRefObject<any>;
    const userVideo = useRef() as MutableRefObject<any>;
    const peersRef = useRef([]) as MutableRefObject<any>;
    const roomID = props.match.params.roomId;
    const userStream = useRef() as MutableRefObject<any>;
    const [screenShare, setScreenShare] = useState(false);
    const screenTrackRef = useRef() as MutableRefObject<any>;

    const isHost = props.location?.state?.isHost ?? false;
    // console.log('🚀 ~ file: Room.tsx ~ line 44 ~ Room ~ isHost', isHost);
    // console.log(props.match.params);

    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);

    const handleMute = () => {
        setIsMuted((isMuted) => !isMuted);
    };

    const handleCamera = () => {
        setIsCameraOn((isCameraOn) => !isCameraOn);
    };

    const handleHandRaise = () => {
        setIsHandRaised((isHandRaised) => !isHandRaised);
    };

    useEffect(() => {
        socketRef.current = io('/');
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;
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

    const clickScreenSharing = () => {
        if (!screenShare) {
            //@ts-ignore
            navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
                const screenTrack = stream.getTracks()[0];

                peersRef.current.forEach(({ peer }) => {
                    // replaceTrack (oldTrack, newTrack, oldStream);
                    peer.replaceTrack(
                        peer.streams[0].getTracks().find((track) => track.kind === 'video'),
                        screenTrack,
                        userStream.current
                    );
                });

                // Listen click end
                screenTrack.onended = () => {
                    peersRef.current.forEach(({ peer }) => {
                        peer.replaceTrack(
                            screenTrack,
                            peer.streams[0].getTracks().find((track) => track.kind === 'video'),
                            userStream.current
                        );
                    });
                    userVideo.current.srcObject = userStream.current;
                    setScreenShare(false);
                };

                userVideo.current.srcObject = stream;
                screenTrackRef.current = screenTrack;
                setScreenShare(true);
            });
        } else {
            screenTrackRef.current.onended();
        }
    };

    return (
        <Flex direction="row" p={3} h="100%">
            <Grid h="100%" w="70%" templateRows="5fr 1fr" templateColumns="repeat(8, 1fr)">
                <GridItem rowSpan={5} colSpan={8}>
                    <StyledVideo muted ref={userVideo} autoPlay playsInline borderRadius={2} />
                </GridItem>
                {peers.map((peer) => {
                    return (
                        <GridItem rowSpan={1} colSpan={1}>
                            <Video key={peer.peerID} peer={peer.peer} />
                        </GridItem>
                    );
                })}

                <Box d="flex" justifyContent="center" w="69%" pos="absolute" bottom={0} mb={4}>
                    <Flex
                        flexDirection="row"
                        bgColor="brand.orange"
                        display="inline-flex"
                        alignItems="center"
                        paddingX={4}
                        paddingY={4}
                        rounded="md"
                    >
                        <HStack spacing="2em">
                            <Icon as={isCameraOn ? VideocamOffOutline : VideocamOutline} onClick={handleCamera} />
                            <Icon as={isMuted ? MicOffOutline : MicOutline} onClick={handleMute} />
                            <Icon as={isHandRaised ? HandRight : HandRightOutline} onClick={handleHandRaise} />
                            <Icon as={LaptopOutline} onClick={clickScreenSharing} />
                        </HStack>
                    </Flex>
                </Box>
            </Grid>
            <StyledChat>
                <ChatBox roomID={roomID} />
            </StyledChat>
        </Flex>
    );
};

export default Room;
