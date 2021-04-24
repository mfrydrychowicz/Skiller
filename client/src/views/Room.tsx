import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';

import { isTemplateTail } from 'typescript';
import { Icon, Box, IconButton, HStack, Flex, Grid, GridItem, Button, useColorMode } from '@chakra-ui/react';
import { FiCamera, FiCameraOff, FiMic, FiMicOff, FiLogOut } from 'react-icons/fi';
import { IoHandRight, IoHandRightOutline } from 'react-icons/io5';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';

import ChatBox from '../components/Chat/ChatBox';
import { useDocumentDataOnce, useDocumentOnce } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

const StyledVideo = styled.video`
    background: black;
    height: 100%;
    width: 100%;
    /* position: relative; */
`;

const StyledChat = styled.div`
    height: 100%;
    width: 30%;
    border-radius: 10px;
`;

StyledChat.defaultProps = {
    colormode: 'light'
};

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
    const [isHost, setIsHost] = useState(props.location?.state?.isHost ?? false);
    const socketRef = useRef() as MutableRefObject<any>;
    const userVideo = useRef() as MutableRefObject<any>;
    const peersRef = useRef([]) as MutableRefObject<any>;
    const roomID = props.match.params.roomId;
    const userStream = useRef() as MutableRefObject<any>;
    const [screenShare, setScreenShare] = useState(false);
    const screenTrackRef = useRef() as MutableRefObject<any>;

    const { colorMode } = useColorMode();

    // console.log('🚀 ~ file: Room.tsx ~ line 44 ~ Room ~ isHost', isHost);
    // console.log(props.match.params);
    const history = useHistory();
    // const [userVideoAudio, setUserVideoAudio] = useState({
    //     localUser: { video: true, audio: true }
    // });

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
        window.addEventListener('popstate', goToBack);
        socketRef.current = io('/');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            if (isHost) {
                userVideo.current.srcObject = stream;
                userStream.current = stream;
            }
            socketRef.current.emit('join room', roomID, isHost);
            socketRef.current.on('all users', (users, youAreTheHost) => {
                console.log('🚀 ~ file: Room.tsx ~ line 84 ~ socketRef.current.on ~ youAreTheHost', youAreTheHost);
                console.log('🚀 ~ file: Room.tsx ~ line 86 ~ socketRef.current.on ~ users', users);
                const peers = [];
                users.forEach((userID, info) => {
                    let { video, audio } = info;
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer
                    });

                    peers.push({ peerID: userID, peer });
                    // setUserVideoAudio((preList) => {
                    //     return {
                    //         ...preList,
                    //         [peer.userName]: { video, audio }
                    //     };
                    // });
                });
                if (youAreTheHost) {
                    history.replace(`/room/${roomID}/${Math.random()}`, { isHost: true });
                }

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

            socketRef.current.on('FE-user-leave', ({ userId, userName }) => {
                const peerIdx = findPeer(userId);
                peerIdx.peer.destroy();
                setPeers((users) => {
                    users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
                    return [...users];
                });
            });
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    function findPeer(id) {
        return peersRef.current.find((p) => p.peerID === id);
    }

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

    // const toggleCameraAudio = (e) => {
    //     const target = e.target.getAttribute('data-switch');

    //     console.log(target);

    //     setUserVideoAudio((preList) => {
    //         let videoSwitch = preList['localUser'].video;
    //         let audioSwitch = preList['localUser'].audio;

    //         if (target === 'video') {
    //             const userVideoTrack = userVideo.current.srcObject.getVideoTracks()[0];
    //             videoSwitch = !videoSwitch;
    //             userVideoTrack.enabled = videoSwitch;
    //         } else {
    //             const userAudioTrack = userVideo.current.srcObject.getAudioTracks()[0];
    //             audioSwitch = !audioSwitch;

    //             if (userAudioTrack) {
    //                 userAudioTrack.enabled = audioSwitch;
    //             } else {
    //                 userStream.current.getAudioTracks()[0].enabled = audioSwitch;
    //             }
    //         }

    //         return {
    //             ...preList,
    //             localUser: { video: videoSwitch, audio: audioSwitch }
    //         };
    //     });
    // };

    const goToBack = (e) => {
        e.preventDefault();
        socketRef.current.emit('BE-leave-room', { roomID, leaver: peersRef.current.peerID });
        window.location.reload();
        window.location.href = '/';
    };

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
        <Flex direction="row" p={3} h="100%" bgColor={colorMode === 'light' ? 'brand.middlegrey' : 'brand.white'}>
            <Grid h="100%" w="70%" templateRows="5fr 1fr" templateColumns="repeat(8, 1fr)">
                {isHost ? (
                    <GridItem rowSpan={5} colSpan={8}>
                        <StyledVideo muted ref={userVideo} autoPlay playsInline borderRadius={2} />
                    </GridItem>
                ) : (
                    peers.map((peer) => {
                        return (
                            <GridItem rowSpan={5} colSpan={8}>
                                <Video key={peer.peerID} peer={peer.peer} />
                            </GridItem>
                        );
                    })
                )}

                <Box d="flex" justifyContent="center" w="69%" pos="absolute" bottom={0} mb={4}>
                    <Flex
                        flexDirection="row"
                        bgColor="brand.darkgrey"
                        borderColor="brand.orange"
                        display="inline-flex"
                        alignItems="center"
                        paddingX={4}
                        paddingY={3}
                        rounded="md"
                    >
                        <HStack spacing="2em">
                            {/* <div onClick={toggleCameraAudio} data-switch="video">
                                {'camera'}
                            </div>
                            <div onClick={toggleCameraAudio} data-switch="audio">
                                audio
                            </div> */}
                            <Icon
                                as={isCameraOn ? FiCameraOff : FiCamera}
                                onClick={handleCamera}
                                h={6}
                                w={6}
                                color="brand.orange"
                            />
                            <Icon
                                as={isMuted ? FiMicOff : FiMic}
                                onClick={handleMute}
                                h={6}
                                w={6}
                                color="brand.orange"
                            />
                            <Icon
                                as={isHandRaised ? IoHandRight : IoHandRightOutline}
                                onClick={handleHandRaise}
                                h={6}
                                w={6}
                                color="brand.orange"
                            />
                            <Icon
                                as={screenShare ? MdStopScreenShare : MdScreenShare}
                                onClick={clickScreenSharing}
                                h={6}
                                w={6}
                                color="brand.orange"
                            />
                            <Icon as={FiLogOut} onClick={goToBack} h={6} w={6} color="brand.orange" />
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
