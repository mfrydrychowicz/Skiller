import React, { FormEvent, useState } from 'react';
import {
    Box,
    Button, Center, FormControl, FormLabel, Icon, Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Textarea,
    useDisclosure
} from '@chakra-ui/react';

import {AddIcon} from '@chakra-ui/icons'
type props = {
    isOpen: boolean,
    onClose: () => void
}

const NewQuestionModal = ({ isOpen, onClose }: props) => {

    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [notCorrect1, setNotCorrect1] = useState('');
    const [notCorrect2, setNotCorrect2] = useState('');
    const [notCorrect3, setNotCorrect3] = useState('');


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>Add New Question!</ModalHeader>
                <ModalCloseButton />
                <Box width='80%' m='0 auto'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <FormControl id='question' mb={5}>
                            <FormLabel>Question</FormLabel>
                            <Textarea
                                name='question'
                                onChange={(e) => setQuestion(e.target.value)}
                                isRequired />
                        </FormControl>

                        <FormControl id='correctAnswer' mb={5}>
                            <FormLabel>Correct Answer</FormLabel>
                            <Input isRequired/>
                        </FormControl>

                        <FormControl id='notCorrectAnswer1' mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired/>
                        </FormControl>

                        <FormControl id='notCorrectAnswer2' mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired/>
                        </FormControl>

                        <FormControl id='notCorrectAnswer3' mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired/>
                        </FormControl>
                        <Button
                            type='submit'
                            colorScheme={'green'}
                            m='25px 0 25px 74%'
                            isInline
                            justyify='baseline'
                            leftIcon={<AddIcon />}
                        > Save</Button>
                    </form>
                </Box>
            </ModalContent>
        </Modal>
    );


};

export default NewQuestionModal;
