import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Room from '../Room';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Home } from '../Home/Home';
import { WelcomeScreen } from '../Home/WelcomeScreen';
import Login from '../Login/Login';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import NewQuestion from '../../components/new-question/NewQuestion';
import { HallOfFame } from '../HallOfFame';

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
    return (
        <div>
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <TopNavBar />
                    <Switch>
                        <Route exact path="/start" component={WelcomeScreen} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/room/:roomId" component={Room} />
                        <PrivateRoute exact path="/halloffame" component={HallOfFame} />
                        <Route exact path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </ChakraProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
