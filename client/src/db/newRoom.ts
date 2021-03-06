import firebase from 'firebase';

export const newRoom = async (name: string, user: any) => {
    try {
        const doc = await firebase.firestore().collection('Rooms').add({ name, user });
        const id = await (await doc.get()).id;
        return id;
    } catch (error) {
        console.log('🚀 ~ file: newRoom.ts ~ line 9 ~ newRoom ~ error', error);
    }
};
