import { Flex, Icon, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
    HandRightOutline,
    HandRight,
    MicOutline,
    MicOffOutline,
    VideocamOutline,
    VideocamOffOutline,
    LaptopOutline
} from 'react-ionicons';

export default function VideoActions(props) {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isHandRaised, setIsHandRaised] = useState(false);

    const handleMute = () => {
        setIsMuted((isMuted) => !isMuted);
    };

    const handleCamera = () => {
        setIsCameraOn((isCameraOn) => !isCameraOn);
    };

    const handleHandRaise = () => {
        setIsHandRaised((isHandRaised) => !isHandRaised);
    };

    return (
        <Flex
            flexDirection="row"
            bgColor="brand.orange"
            display="inline-flex"
            alignItems="center"
            paddingX={4}
            paddingY={4}
            rounded="md"
        >
            <HStack spacing="2em">
                <Icon as={isCameraOn ? VideocamOffOutline : VideocamOutline} onClick={handleCamera} />
                <Icon as={isMuted ? MicOffOutline : MicOutline} onClick={handleMute} />
                <Icon as={isHandRaised ? HandRight : HandRightOutline} onClick={handleHandRaise} />
                <Icon as={LaptopOutline} onClick={props.clickScreenSharing} />
            </HStack>
        </Flex>
    );
}
