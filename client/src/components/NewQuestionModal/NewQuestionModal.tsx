import React, { FormEvent, useState } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { IQuizQuestion } from '../../interfaces/QuizQuestion.interface';
import { addNewQuiz } from '../../db/newQuizQuestion';
import { useRouteMatch } from 'react-router-dom';

type props = {
    isOpen: boolean;
    onClose: () => void;
};

const NewQuestionModal = ({ isOpen, onClose }: props) => {
    const [question, setQuestion] = useState<string>('');
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const [notCorrect1, setNotCorrect1] = useState<string>('');
    const [notCorrect2, setNotCorrect2] = useState<string>('');
    const [notCorrect3, setNotCorrect3] = useState<string>('');
    const match: any = useRouteMatch();
    const roomId = match.params?.roomId;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const questionFromUser: IQuizQuestion = {
            question,
            answers: [correctAnswer, notCorrect1, notCorrect2, notCorrect3],
            correctAnswer: correctAnswer
        };

        const quizQuestion = await addNewQuiz(questionFromUser, roomId);

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Add New Question!</ModalHeader>
                <ModalCloseButton />
                <Box width="80%" m="0 auto">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <FormControl id="question" mb={5}>
                            <FormLabel>Question</FormLabel>
                            <Textarea name="question" onChange={(e) => setQuestion(e.target.value)} isRequired />
                        </FormControl>

                        <FormControl id="correctAnswer" mb={5}>
                            <FormLabel>Correct Answer</FormLabel>
                            <Input isRequired onChange={(e) => setCorrectAnswer(e.target.value)} />
                        </FormControl>

                        <FormControl id="notCorrectAnswer1" mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired onChange={(e) => setNotCorrect1(e.target.value)} />
                        </FormControl>

                        <FormControl id="notCorrectAnswer2" mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired onChange={(e) => setNotCorrect2(e.target.value)} />
                        </FormControl>

                        <FormControl id="notCorrectAnswer3" mb={5}>
                            <FormLabel> Not Correct Answer</FormLabel>
                            <Input isRequired onChange={(e) => setNotCorrect3(e.target.value)} />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme={'green'}
                            m="25px 0 25px 74%"
                            isinline
                            justyify="baseline"
                            leftIcon={<AddIcon />}
                        >
                            {' '}
                            Save
                        </Button>
                    </form>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default NewQuestionModal;
