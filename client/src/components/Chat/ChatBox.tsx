import { Container, Box, VStack } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useState } from 'react';
import useChat from '../../hooks/useChat';

const ChatBox = ({ roomID }) => {
    /*
    text: string;
    authorId: string;
    photoURL: string;
    roomId: string;
    createdAt: string;*/

    const { messages, loading, error, sendMessage } = useChat(roomID);
    return (
        <Container maxW="container.sm">
            <Box padding="4" bg="gray.700" d="flex" alignItems="baseline" justify="left" height="600">
                <VStack direction="column" width="100%">
                    <VStack overflowY="auto" height="500" width="100%">
                        {loading ? (
                            <Spinner size="lg" thickness="4px" speed="0.65s" emptyColor="gray.200" color="orange.500" />
                        ) : (
                            messages.map(({ photoURL, text }, id) => {
                                return <ChatMessage key={id} author={photoURL} message={text} />;
                            })
                        )}
                    </VStack>
                    <ChatInput onSubmit={sendMessage} />
                </VStack>
            </Box>
        </Container>
    );
};
export default ChatBox;
