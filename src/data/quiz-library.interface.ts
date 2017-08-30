import { Quizzes } from "./quizzes.interface";

export interface QuizLibrary {
  courseId: string, //ca or cs
  stage: [
    {
      stageId: string, //final, intermediate, cpt, foundation, executive, professional
      subject: [
        {
          subjectId: string, //dt, idt, tax
          fa: [
            {
              faId: string, //general, ammendments, case laws
              chapters: [
                {
                  chapterId: string,
                  quiz: Quizzes[]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
