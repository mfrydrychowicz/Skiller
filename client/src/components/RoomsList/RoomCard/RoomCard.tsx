import { Box, Flex, Heading, Button, Text, Avatar, useColorMode } from '@chakra-ui/react';
import React from 'react';
import styles from './RoomCard.style';
import cardStyle from './RoomCard.style';
import { AddIcon } from '@chakra-ui/icons';

type props = {
    id: string;
    name: string;
    user: any;
};

const RoomCard = ({ id, name, user }: props) => {
    const { colorMode } = useColorMode();

    return (
        <Flex
            rounded="20px"
            overflow="hidden"
            w="100%"
            h="300px"
            justify="center"
            flexDirection="row"
            align="center"
            bg={colorMode === 'light' ? 'brand.purewhite' : 'brand.middlegrey'}
            shadow="md"
            transform="scale(0.85)"
            transition="0.3s linear"
            _hover={{ transform: 'scale(1)', fontWeight: 'bold' }}
        >
            <Avatar size="2xl" name="Ryan Florence" src={user?.photoURL ?? 'https://bit.ly/ryan-florence'} />
            <Box d="flex" flexDirection="column" m={1} w="50%">
                <Box bgColor="transparent">
                    <Text size="xl" color="gray.400" textTransform="uppercase" mb={0} textAlign="center">
                        Room topic
                    </Text>
                    <Text fontSize={24} sx={styles} color="gray.700" bgColor="none">
                        {name}
                    </Text>
                </Box>
                <Button
                    leftIcon={<AddIcon />}
                    sx={{ position: 'inherit', bottom: '25px', right: '35px', zIndex: '10' }}
                    colorScheme="orange"
                    marginTop="2rem"
                    w="50%"
                    alignSelf="flex-end"
                >
                    Join
                </Button>
            </Box>
        </Flex>
    );
};

export default RoomCard;
