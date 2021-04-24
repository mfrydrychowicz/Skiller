import { Container, Box, VStack, useColorMode } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useRef, useState, useEffect, MutableRefObject } from 'react';
import useChat from '../../hooks/useChat';
import 'emoji-mart/css/emoji-mart.css';

const ChatBox = ({ roomID }) => {
    const { colorMode } = useColorMode();

    const { messages, loading, error, sendMessage } = useChat(roomID);
    const messagesEndRef = useRef() as MutableRefObject<any>;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    /*
    text: string;
    authorId: string;
    photoURL: string;
    roomId: string;
    createdAt: string;*/

    return (
        <Container maxW="container.sm" height="100%">
            <Box
                padding="4"
                bg={colorMode === 'light' ? 'brand.white' : 'brand.darkgrey'}
                d="flex"
                direction="column"
                justifyContent="space-between"
                height="100%"
            >
                <VStack width="100%">
                    <VStack overflowY="auto" height="100%" width="100%">
                        {loading || error ? (
                            <Spinner
                                size="lg"
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="brand.lightgrey"
                                color="brand.orange"
                            />
                        ) : (
                            messages.map(({ photoURL, text }, id) => {
                                return <ChatMessage key={id} author={photoURL} message={text} />;
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </VStack>
                    <ChatInput onSubmit={sendMessage} />
                </VStack>
            </Box>
        </Container>
    );
};
export default ChatBox;
