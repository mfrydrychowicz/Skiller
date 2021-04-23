import axios from 'axios';
import { Button, ButtonGroup, Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure
 } from "@chakra-ui/react"

interface QuizQuestion {
  question: string,
  answers: string[],
  correctAnswer: string;
}

export const DisplayQuiz = ({question, answers, correctAnswer}: QuizQuestion) => {

const { onClose } = useDisclosure()

const sendAnswer = (isCorrect: boolean) => {
 try {
    axios.post('/api/quiz', {
      isCorrect
    })
  } catch(error) {
    console.log('something went wrong when sending quiz answer...', error);
  }
}

const handleClick = (answer) => {
  console.log('clicked: ', answer);
  let isCorrect = false;
  if (answer === correctAnswer) {
    isCorrect = true;
  }
  sendAnswer(isCorrect);
}

  return (
      <Modal isOpen={true} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mx="auto" my={5}>
            <Heading
            mb={3}
            >{question}</Heading>
            <ButtonGroup 
            variant="outline" 
            spacing="0"  
            flexDirection="column"
            w="100%"
            alignItems="center" 
            mb={4}
            >
              {answers.map(answer => 
              <Button
              colorScheme="purple"
              size="md"
              variant="outline"
              isFullWidth={true}
              mt={2}
              onClick={() => handleClick(answer)}
              >{answer}</Button>)}
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
}