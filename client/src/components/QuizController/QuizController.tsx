import firebase from 'firebase';
import { DisplayQuiz } from '../DisplayQuiz';
import { IQuizQuestion } from '../../interfaces/QuizQuestion.interface';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const QuizController = ({ roomId }) => {
    const collectionRef = firebase.firestore().collection('QuizQuestions');
    const query = collectionRef.limit(1);
    const [questions, loading, error] = useCollectionDataOnce<IQuizQuestion>(collectionRef, { idField: 'id' });

    if (loading || error) return null;
    console.log('🚀 ~ file: QuizController.tsx ~ line 9 ~ QuizController ~ questions', questions);

    return <div></div>;
    // return <DisplayQuiz />;
};

export default QuizController;
