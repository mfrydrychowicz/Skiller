import firebase from 'firebase';

export const saveRoomInfo = async (roomId: string, hostId: string) => {
    try {
        const doc = await firebase.firestore().collection('Rooms').doc(roomId);
        await doc.update({ hostId });
    } catch (error) {
        console.log('🚀 ~ file: newRoom.ts ~ line 9 ~ newRoom ~ error', error);
    }
};
