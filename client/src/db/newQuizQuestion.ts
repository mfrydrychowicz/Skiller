import firebase from 'firebase';
import { IQuizQuestion } from '../interfaces/QuizQuestion.interface';

export const addNewQuiz = async (userQuestion: IQuizQuestion, roomId: string) => {
    try {
        const question = await firebase
            .firestore()
            .collection('QuizQuestions')
            .add({ ...userQuestion, roomId, expirationTime: Date.now() + 60 * 1000 });
        const questionFromDb = await await question.get();
        return questionFromDb;
    } catch (e) {
        console.log('🚀 ~ file: db/newQuizQuestion.ts ~ line 9 ~ newQuizQuestion ~ error', e.message);
    }
};
