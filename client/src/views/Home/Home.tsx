import firebase from 'firebase';
import { ReactElement } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export const Home = (): ReactElement => {
    const [rooms, loading, error] = useCollection(firebase.firestore().collection('Rooms'), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });
    if (loading) return null;

    rooms.docs.map((d) => console.log(d.data().name));

    return (
        <>
            <h1>This is an example app</h1>
            {rooms.docs.map((d) => (
                <li key={d.id}>{d.data().name}</li>
            ))}
        </>
    );
};
