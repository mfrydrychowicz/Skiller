import firebase from 'firebase';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import RoomsList from '../../components/RoomsList/RoomsList';

export const Home = (): ReactElement => {
    return (
        <>
            <h1>This is an example app</h1>
            <RoomsList />
        </>
    );
};
