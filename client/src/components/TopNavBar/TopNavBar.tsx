import { Image, Flex, Heading, Text, Spacer, Icon, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TrophyOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

export default function TopNavBar() {
    const [username, setUsername] = useState('username');
    const [points, setPoints] = useState(0);

    return (
        <Flex bgColor="brand.darkgrey" paddingX="3em" height="4rem" alignItems="center">
            <Link to="/">
                <HStack spacing="1em">
                    <Image src={logo} alt="Skiller logo" height="3em" color="brand.orange" />
                    <Heading size="md" color="brand.orange">
                        SKILLER
                    </Heading>
                </HStack>
            </Link>
            <Spacer />
            <HStack spacing="2em">
                <Icon as={TrophyOutline} fill="brand.orange" />
                <Text mr="2" color="brand.orange">
                    {points} pt
                </Text>
                <Text mr="2" color="brand.orange">
                    {username}
                </Text>
            </HStack>
        </Flex>
    );
}
