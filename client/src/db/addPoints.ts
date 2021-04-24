import firebase from 'firebase';

export const addPoints = (val, user) => {
    console.log('🚀 ~ file: addPoints.ts ~ line 4 ~ addPoints ~ val', val);
    console.log(user.uid);

    firebase
        .firestore()
        .collection('Users')
        .doc(user.uid)
        .update({ points: firebase.firestore.FieldValue.increment(val) });
};
