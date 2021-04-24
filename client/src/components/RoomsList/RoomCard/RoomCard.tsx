import { Box, Flex, Heading, Button, Text, Avatar } from '@chakra-ui/react';
import React from 'react';
import styles from './RoomCard.style';
import cardStyle from './RoomCard.style';
import { AddIcon } from '@chakra-ui/icons';

type props = {
    id: string;
    name: string;
};

const RoomCard = ({ id, name }: props) => {
    return (
        <Flex
            rounded="20px"
            overflow="hidden"
            w="100%"
            h="300px"
            justify="center"
            flexDirection="row"
            align="center"
            bg="white"
            shadow="sm"
            transform="scale(0.85)"
            transition="0.3s linear"
            _hover={{ transform: 'scale(1)', fontWeight: 'bold' }}
        >
            <Avatar size="2xl" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Box d="flex" flexDirection="column" m={1} w="50%">
                <Box>
                    <Text size="xl" color="gray.400" textTransform="uppercase" mb={0} textAlign="center">
                        Room topic
                    </Text>
                    <Text fontSize={24} sx={styles} color="gray.400">
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
                    {' '}
                    Join
                </Button>
            </Box>
        </Flex>
    );
};

export default RoomCard;
