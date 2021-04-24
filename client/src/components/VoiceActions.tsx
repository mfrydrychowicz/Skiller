import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Button, ButtonGroup, useColorMode
} from "@chakra-ui/react"

export const VoiceActions = (props) => {

  const { colorMode, toggleColorMode } = useColorMode()

  const commands = [
    {
      command: ['open (website) *', 'go to * (website)'],
      callback: (site) => {
        console.log('opening webiste: ', site.split(" ").join(""))
        window.open("http://" + site.split(" ").join(""));
      },
    },
    {
      command: ['select *', 'pick *', 'answer *'],
      callback: (answer) => {
        props.pickAnswerFunction(answer);
      },
    },
    {
      command: "change to dark mode",
      callback: () => {
        console.log('switching to dark mode!')
        if (colorMode === "light") {
          toggleColorMode();
        }
      },
    },
    {
      command: "change to light mode",
      callback: () => {
        console.log('switching to light mode!')
        if (colorMode === "dark") {
          toggleColorMode();
        }
      },
    },
    {
      command: ['show chatroom', 'open chatroom'],
      callback: () => {
        console.log('opening chatroom site')
        window.location.href = '/'
      },
    },
    {
      command: ['show ranking', 'open ranking', 'show hall of fame', 'open hall of fame'],
      callback: () => {
        console.log('opening chatroom site')
        window.location.href = '/halloffame'
      },
    },
  ]

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const resetTransriptAndStopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  }

  console.log('transcript: ', transcript);

  return (
    <ButtonGroup
      w="100%"
      justifyContent="center">
      <Button onClick={() => SpeechRecognition.startListening({
        continuous: true,
        language: 'en-US',
      })}>Start listening</Button>
      <Button onClick={resetTransriptAndStopListening}>Stop listening</Button>
    </ButtonGroup>
  );
}

