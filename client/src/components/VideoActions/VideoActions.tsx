import { Box, Image, Flex, Heading, Text, Spacer, Icon, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TrophyOutline, HandRightOutline, MicOutline, MicOffOutline, CameraOutline } from 'react-ionicons';
import { Link } from 'react-router-dom';

export default function VideoActions() {
    const [isMuted, setIsMuted] = useState(false);

    const handleMute = () => {
        setIsMuted((isMuted) => !isMuted);
    };

    return (
        <Flex flexDirection="row" bgColor="red" display="inline-flex" alignItems="center">
            <HStack spacing="2em">
                <Icon as={CameraOutline} />
                <Icon as={isMuted ? MicOffOutline : MicOutline} onClick={handleMute} />
                <Icon as={HandRightOutline} />
            </HStack>
        </Flex>
    );
}
