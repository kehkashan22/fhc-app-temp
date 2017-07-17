import { Quizzes } from "../quizzes.interface";

export interface QuizStore {
    subjectId: string;
    chapterId: string;
    chapterType: string;
    quiz: Quizzes;
}
