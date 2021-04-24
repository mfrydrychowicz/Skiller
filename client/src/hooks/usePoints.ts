import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { auth } from '../firebase/firebase';

export const usePoints = () => {
    const [user] = useAuthState(auth);
    const ref = firebase.firestore().collection('Users');
    const [value, loading, error] = useCollection(ref);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user?.uid) {
            value?.docs.forEach((d) => {
                console.log(d);
                console.log('🚀 ~ file: usePoints.ts ~ line 23 ~ usePoints ~ user', user);
                if (d.id === user.uid) {
                    setCurrentUser(d.data());
                }
            });
        }
    }, [user]);

    return { currentUser, loading, error };
};
