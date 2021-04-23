import { Button, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';

const NewQuestion: React.FC = (): JSX.Element => {

    const [isOpen, setIsOpen] = useState(false);

   const onToggleIsOpen = () => setIsOpen(!isOpen)


    return(
    <>
        <Button onClick={() => onToggleIsOpen()}>Add New Question</Button>
        <NewQuestionModal isOpen={isOpen} onClose={onToggleIsOpen} />
    </>)
};

export default NewQuestion;
