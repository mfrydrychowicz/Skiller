import axios from 'axios';
import {
    Button,
    ButtonGroup,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    IconButton
} from '@chakra-ui/react';

import { VoiceActions } from './VoiceActions';

interface QuizQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
}

export const DisplayQuiz = ({ question, answers, correctAnswer }: QuizQuestion) => {
    console.log('🚀 ~ file: DisplayQuiz.tsx ~ line 23 ~ DisplayQuiz ~ question', question);
    const { onClose } = useDisclosure();

    const sendAnswer = (isCorrect: boolean) => {};

    const handleClick = (answerIndex: number) => {
        console.log('clicked: ', answerIndex);
        let isCorrect = false;
        if (answers.indexOf(correctAnswer) === answerIndex) {
            isCorrect = true;
        }
        sendAnswer(isCorrect);
    };

    const mapToIndex = (letter) => {
        return Math.abs(65 - letter.charCodeAt(0));
    };

    const handleVoiceCommand = (letter) => {
        console.log('handle voice command invoked with param: ', letter);
        const answerIndex = mapToIndex(letter.toUpperCase());
        let isCorrect = false;
        if (answers.indexOf(correctAnswer) === answerIndex) {
            isCorrect = true;
        }
        console.log('voice answer: ', answers[answerIndex]);
        console.log('correct answer: ', correctAnswer);
        console.log('voice answer correct: ', isCorrect);
        sendAnswer(isCorrect);
    };

    const mapToLetter = (index) => {
        return String.fromCharCode(65 + index);
    };
    return (
        <Modal isOpen={true} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalBody mx="auto" my={5}>
                    <Heading mb={3}>{question}</Heading>
                    <ButtonGroup
                        variant="outline"
                        spacing="0"
                        flexDirection="column"
                        w="100%"
                        alignItems="center"
                        mb={4}
                    >
                        {answers.map((answer, index) => (
                            <Button
                                key={answer}
                                color="brand.orange"
                                size="md"
                                variant="outline"
                                isFullWidth={true}
                                mt={2}
                                onClick={() => handleClick(index)}
                            >
                                {mapToLetter(index)} {answer}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <VoiceActions pickAnswerFunction={handleVoiceCommand} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
