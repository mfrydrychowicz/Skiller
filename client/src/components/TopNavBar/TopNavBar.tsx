import { Image, Flex, Heading, Text, Spacer, Icon, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TrophyOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';

export default function TopNavBar() {
    const [username, setUsername] = useState('username');
    const [points, setPoints] = useState(0);

    return (
        <Flex bgColor="red" paddingX="3em" height="4rem" alignItems="center">
            <Link to="/">
                <HStack spacing="1em">
                    <Image src="./logo.svg" alt="Skiller logo" height="3em" />
                    <Heading size="md">SKILLER</Heading>
                </HStack>
            </Link>
            <Spacer />
            <HStack spacing="2em">
                <Icon as={TrophyOutline} />
                <Text mr="2">{points} pt</Text>
                <Text mr="2">{username}</Text>
            </HStack>
        </Flex>
    );
}
