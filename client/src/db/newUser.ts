import firebase from 'firebase';

export const newUser = async ({ displayName, email, uid }: firebase.User) => {
    try {
        const user = await firebase.firestore().collection('Users').doc(uid).get();
        console.log(user.exists);
        if (user.exists) return;

        const data = {
            email,
            displayName,
            points: 0
        };

        await firebase.firestore().collection('Users').doc(uid).set(data);
    } catch (error) {
        console.log('🚀 ~ file: newUser.ts ~ line 16 ~ newUser ~ error', error);
    } finally {
        return;
    }
};
