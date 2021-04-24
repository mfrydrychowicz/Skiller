import { Container, Box, HStack, IconButton, Icon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { Send } from 'react-ionicons';

const ChatInput = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const handleChange = (event) => setValue(event.target.value);
    const sendMessage = () => {
        onSubmit(value);
        setValue('');
    };
    return (
        <HStack display="flex" alignItems="start" width="100%">
            <Textarea
                value={value}
                onChange={handleChange}
                size="md"
                variant="outline"
                placeholder="Type sth here"
                bg="whiteAlpha"
                rows={1}
                max-rows={20}
                minHeight="2.5em"
                height="2.5em"
            />
            <IconButton aria-label="Send" onClick={sendMessage} icon={<Icon as={Send} color="brand.orange" />} />
        </HStack>
    );
};
export default ChatInput;
