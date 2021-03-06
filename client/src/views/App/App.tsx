import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Room from '../Room';
import { Box, ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';
import { Home } from '../Home/Home';
import { WelcomeScreen } from '../Home/WelcomeScreen';
import Login from '../Login/Login';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import NewQuestion from '../../components/new-question/NewQuestion';
import { HallOfFame } from '../HallOfFame';
import { DisplayQuiz } from '../../components/DisplayQuiz';

const App = (): ReactElement => {
    const exampleQuestion = {
        question: 'pytanie?',
        answers: ['odpowiedz 1', 'odpowiedz 2', 'odpowiedz 3', 'odpowiedz 4'],
        correctAnswer: 'odpowiedz 1'
    };

    const { colorMode } = useColorMode();

    return (
        <div>
            <BrowserRouter>
                <Box h="100vh" bg={colorMode === 'light' ? 'brand.lightgrey' : 'brand.middlegrey'}>
                    <TopNavBar />
                    <Switch>
                        <Box h="calc(100vh - 4rem)">
                            <PrivateRoute exact path="/room/:roomId" component={Room} />
                            <PrivateRoute exact path="/room/:roomId/:randomValue" component={Room} />
                            <PrivateRoute exact path="/" component={Home} />
                            <Route exact path="/start" component={WelcomeScreen} />
                            <Route exact path="/halloffame" component={HallOfFame} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/quiz" component={() => DisplayQuiz({ ...exampleQuestion })} />
                            {/* <Route component={NotFound} /> */}
                        </Box>
                    </Switch>
                </Box>
            </BrowserRouter>
        </div>
    );
};

export default App;
