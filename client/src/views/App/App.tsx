import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Room from '../Room';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

// customized colors,fonts, basically everything for Chakra (optional)
const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  }
  const customTheme = extendTheme({ colors });


export const Home = (): ReactElement => {

    const [jsonData, setJsonData] = useState("");

        useEffect(() => {
        const url = '/api/example';
            axios.get(url).then((json) => {
                setJsonData(JSON.stringify(json.data));
            });
    }, []);


    return (
        <>
            <h1>This is an example app</h1>
            {jsonData}
        </>
    );
};




const App = (): ReactElement => {


    return (
        <div>
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <Switch>
                        <Route exact path="/"  component={Home} />
                        <Route exact path="/room"  component={Room} />
                        <Route component={NotFound} />
                    </Switch>
                </ChakraProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
