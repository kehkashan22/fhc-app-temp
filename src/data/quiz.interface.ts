import { Answer } from "./answer.interface";

export interface Quiz {
  questionNumber: number;
  tested: string;
  question:string;
  answers: Answer[];
  explanation: string;
}
