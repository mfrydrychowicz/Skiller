import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentDataOnce, useDocument } from 'react-firebase-hooks/firestore';
import { auth } from '../firebase/firebase';

export const usePoints = (userID?) => {
    const [user] = useAuthState(auth);
    const [value, loading, error] = useDocument(
        firebase
            .firestore()
            .collection('Users')
            .doc(userID || user?.uid || 'nope'),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    );

    const plusOne = () => {
        firebase
            .firestore()
            .collection('Users')
            .doc(userID)
            .update({ points: value?.data().points + 1 });
    };
    console.log(value?.data());
    return [value?.data()?.points, plusOne, loading, error];
};

export const useGetPoints = () => {
    const collectionRef = firebase.firestore().collection('Users');
    const query = collectionRef.where('points', '!=', 0);
    const [users, loading, error] = useCollectionData(query);
    return users.map(({ displayName, points }) => {
        return { displayName, points };
    });
};

/*
export const UserResults = (userID) => {
    const user = firebase.firestore().collection('users').doc(userId);
    const [messages, loading, error] = useCollectionData(query);
    const [user] = useAuthState(auth);

    const sendMessage = async (text: string) => {
        await collectionRef.add({
            text,
            authorId: user.uid,
            photoURL: user.photoURL,
            roomId: roomId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    return { messages, loading, error, sendMessage };
};

export const MyResults = () => {
    const [user] = useAuthState(auth);
    return UserResults(user.uid);
};

export const HallOfFame = () => {};
*/
