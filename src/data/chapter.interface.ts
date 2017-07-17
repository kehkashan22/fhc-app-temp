import { Quizzes } from './quizzes.interface';
export interface Chapter{
  chapterId: string;
  chapterType: string;
  quiz: Quizzes[];
}
