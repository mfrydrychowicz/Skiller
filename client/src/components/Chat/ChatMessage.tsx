import { Box, HStack } from '@chakra-ui/react';
import { Text, Avatar } from '@chakra-ui/react';
const ChatMessage = ({ author, message }) => {
    return (
        <Box d="flex" align-items="center" justify="left" width="100%">
            <HStack width="100%">
                <Avatar size="md" mt={2} mr={3} src={author} />
                <Text fontSize="sm" color="white">
                    {message}
                </Text>
            </HStack>
        </Box>
    );
};
export default ChatMessage;
