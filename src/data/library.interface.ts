import { Videos } from './videos.interface';

export interface Library {
  courseId: string, //ca or cs
  stage: [
    {
      stageId: string, //final, intermediate, cpt, foundation, executive, professional
      subject: [
        {
          subjectId: string, //dt, idt, tax
          type: [
            {
              typeId: string, //general, ammendments, case laws
              sets:Videos[]
            }
          ]
        }
      ]
    }
  ]
}
