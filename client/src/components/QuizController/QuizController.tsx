import firebase from 'firebase';
import { DisplayQuiz } from '../DisplayQuiz';
import { IQuizQuestion } from '../../interfaces/QuizQuestion.interface';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const QuizController = ({ roomId }) => {
    const collectionRef = firebase.firestore().collection('QuizQuestions');
    const query = collectionRef.orderBy('expirationTime', 'desc').limit(1);
    const [questions, loading, error] = useCollectionData<any>(query, { idField: 'id' });

    if (loading || error) return null;
    console.log('🚀 ~ file: QuizController.tsx ~ line 9 ~ QuizController ~ questions', questions);
    if (questions[0].expirationTime >= Date.now()) return <DisplayQuiz {...questions[0]} />;
    return null;
};

export default QuizController;
