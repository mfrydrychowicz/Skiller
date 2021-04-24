import ReactDOM from 'react-dom';
import App from './views/App/App';
import './firebase/firebase';
import { Box, ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';

// customized colors,fonts, basically everything for Chakra (optional)
const colors = {
    brand: {
        orange: '#FF6500',
        darkgrey: '#262626',
        middlegrey: '#363636',
        lightgrey: '#eaeaea',
        white: '#FAFAFA',
        purewhite: '#ffffff'
    }
};

export const customTheme = extendTheme({
    colors,
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false
    }
});

ReactDOM.render(
    <>
        <ChakraProvider theme={customTheme}>
            <App />
        </ChakraProvider>
    </>,
    document.getElementById('root')
);
