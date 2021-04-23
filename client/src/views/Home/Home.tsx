import firebase from 'firebase';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import RoomsList from '../../components/RoomsList/RoomsList';

export const Home = (): ReactElement => {
    return (
        <>
            <RoomsList />
        </>
    );
};
