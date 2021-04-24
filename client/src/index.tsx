import ReactDOM from 'react-dom';
import App from './views/App/App';
import './firebase/firebase';
import { customTheme } from './views/App/App';
import { ColorModeScript } from '@chakra-ui/react';

ReactDOM.render(
    <>
        <body>
            <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
            <App />
        </body>
    </>,
    document.getElementById('root')
);
