import { HStack, IconButton, Icon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

const ChatInput = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const handleChange = (event) => setValue(event.target.value);
    const sendMessage = () => {
        if (value.trim().length > 0) onSubmit(value);
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
                rows={1}
                max-rows={20}
                minHeight="2.5em"
                height="2.5em"
                bgColor="brand.middlegrey"
                borderColor="brand.middlegrey"
                color="brand.lightgrey"
                focusBorderColor="brand.orange"
            />
            <IconButton
                aria-label="Send"
                onClick={sendMessage}
                backgroundColor="transparent"
                borderColor="brand.orange"
                _hover={{ bg: 'brand.middlegrey' }}
                variant="outline"
                icon={<Icon as={IoIosSend} color="brand.orange" h={6} w={6} />}
            />
        </HStack>
    );
};
export default ChatInput;
