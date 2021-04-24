import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Room from '../Room';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from '../Home/Home';
import Login from '../Login/Login';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import NewQuestion from '../../components/new-question/NewQuestion';
import { HallOfFame } from '../HallOfFame';
import { DisplayQuiz } from '../../components/DisplayQuiz';

// customized colors,fonts, basically everything for Chakra (optional)
const colors = {
    brand: {
        orange: '#FF6500',
        darkgrey: '#252422',
        middlegrey: '#403D39',
        lightgrey: '#CCC5B9',
        white: '#FFFCF2'
    }
};

const customTheme = extendTheme({ colors });

const App = (): ReactElement => {
    const exampleQuestion = {
        question: 'pytanie?',
        answers: ['odpowiedz 1', 'odpowiedz 2', 'odpowiedz 3', 'odpowiedz 4'],
        correctAnswer: 'odpowiedz 1'
    };

    return (
        <div>
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <Box h="100vh" bg="brand.middlegrey">
                        <TopNavBar />
                        <Switch>
                            <Box h="calc(100vh - 4rem)">
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute exact path="/room/:roomId" component={Room} />
                                <PrivateRoute exact path="/room/:roomId/:randomValue" component={Room} />
                                <Route exact path="/halloffame" component={HallOfFame} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/quiz" component={() => DisplayQuiz({ ...exampleQuestion })} />
                                {/* <Route component={NotFound} /> */}
                            </Box>
                        </Switch>
                    </Box>
                </ChakraProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
