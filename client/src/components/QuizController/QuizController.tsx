import firebase from 'firebase';
import { DisplayQuiz } from '../DisplayQuiz';
import { IQuizQuestion } from '../../interfaces/QuizQuestion.interface';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { addPoints } from '../../db/addPoints';

const QuizController = ({ roomId }) => {
    const collectionRef = firebase.firestore().collection('QuizQuestions');
    const query = collectionRef.orderBy('expirationTime', 'desc').limit(1);
    const [questions, loading, error] = useCollectionData<any>(query, { idField: 'id' });
    if (loading || error) return null;
    if (questions[0].expirationTime >= Date.now()) return <DisplayQuiz key={questions[0].id} {...questions[0]} />;
    return null;
};

export default QuizController;
