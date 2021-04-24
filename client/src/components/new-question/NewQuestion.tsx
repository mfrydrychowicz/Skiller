import { Button, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';

import { AddIcon } from '@chakra-ui/icons';
import { FaStar } from 'react-icons/fa';

const NewQuestion = ({ roomId: string }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <Icon as={FaStar} onClick={() => onToggleIsOpen()} h={6} w={6} color="brand.orange"></Icon>
            <NewQuestionModal isOpen={isOpen} onClose={onToggleIsOpen} />
        </>
    );
};

export default NewQuestion;
