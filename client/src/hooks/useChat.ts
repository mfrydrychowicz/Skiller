import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth } from '../firebase/firebase';

type Messages = {
    text: string;
    authorId: string;
    photoURL: string;
    roomId: string;
    createdAt: string;
};

const useChat = (roomId) => {
    const collectionRef = firebase.firestore().collection('Messages');
    const query = collectionRef;
    const [messages, loading, error] = useCollectionData<Messages>(query, { idField: 'id' });
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

export default useChat;
