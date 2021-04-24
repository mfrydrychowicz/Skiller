import { Container, Box, HStack, IconButton, Icon, useColorMode } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';

const ChatInput = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const [emojiShown, setEmojiShown] = useState(false);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        if (value.trim().length > 0) onSubmit(value);
        setValue('');
    };
    const { colorMode } = useColorMode();
    const onEmojiClick = (e, emojiObject) => {
        let emoji = emojiObject.emoji;
        setValue(value + emoji);
    };
    const toogleEmojiState = () => {
        setEmojiShown(!emojiShown);
    };

    if (emojiShown) {
        return (
            <>
                <span>
                    <Picker
                        groupVisibility={{
                            recently_used: false
                        }}
                        disableSearchBar
                        pickerStyle={{ width: '100%', height: '300px' }}
                        onEmojiClick={onEmojiClick}
                    />
                </span>
                <HStack display="flex" alignItems="start" width="100%">
                    <Box cursor="pointer" marginTop="9px" onClick={toogleEmojiState}>
                        {'😎'}
                    </Box>
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
                        bgColor={colorMode === 'light' ? 'brand.lightgrey' : 'brand.middlegrey'}
                        borderColor={colorMode === 'light' ? 'brand.lightgrey' : 'brand.middlegrey'}
                        color={colorMode === 'light' ? 'brand.middlegrey' : 'brand.lightgrey'}
                        focusBorderColor="brand.orange"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                sendMessage(ev);
                            }
                        }}
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
            </>
        );
    } else {
        return (
            <>
                <HStack display="flex" alignItems="start" width="100%">
                    <span>
                        <Box cursor="pointer" marginTop="9px" onClick={toogleEmojiState}>
                            {'😎'}
                        </Box>
                    </span>
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
                        bgColor={colorMode === 'light' ? 'brand.lightgrey' : 'brand.middlegrey'}
                        borderColor={colorMode === 'light' ? 'brand.lightgrey' : 'brand.middlegrey'}
                        color={colorMode === 'light' ? 'brand.middlegrey' : 'brand.lightgrey'}
                        focusBorderColor="brand.orange"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                sendMessage(ev);
                            }
                        }}
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
            </>
        );
    }
};
export default ChatInput;
