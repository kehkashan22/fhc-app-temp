import { Quiz } from './quiz.interface';
export interface Quizzes{
  quizId: string;
  quizTitle: string;
  quizHeading: string;
  questions: Quiz[];
  timeInMins: number;
  nature: string;
  marks?: number;
}
