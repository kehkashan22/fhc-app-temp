import { Quiz } from './quiz.interface';
export interface Quizzes{
  quizId: number;
  quizTitle: string;
  quizHeading: string;
  questions: Quiz[];
  timeInMins: number;
  marks?: number;
}
