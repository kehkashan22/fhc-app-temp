import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
  courses: ['ca', 'cs'];
  caCollection = [
    {
      stageId: 'final',
      subject: [
        {
          subjectId: 'dt',
          subjectName: 'direct tax',
          type: ['general', 'amendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017', 'fa2018']
        },

        {
          subjectId: 'idt',
          subjectName: 'indirect tax',
          type: ['general', 'amendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017', 'fa2018'] // TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'intermediate',
      subject: [
        {
          subjectId: 'tax',
          subjectName: 'tax',
          type: ['general', 'amendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017', 'fa2018'] //TYPE
        }
      ] //SUBJECT
    }
  ];

  csCollection = [
    {
      stageId: 'professional',
      subject: [
        {
          subjectId: 'altp',
          subjectName: 'advanced tax laws and practices',
          type: ['general', 'amendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017', 'fa2018'] //TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'executive',
      subject: [
        {
          subjectId: 'ltp',
          subjectName: 'tax laws and practices',
          type: ['general', 'amendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017', 'fa2018'] //TYPE
        }
      ] //SUBJECT
    }
  ];

  performanceMatrix = {};

  memoryMatrix = [20, 15, 7];
  applicationMatrix = [30, 10, 3];
  speedMatrix = [10, 5, 0];

  report = {
    A: {
      MgAgSg: "Great! You've done well in the A segment. This is the most important segment for the examinations. You can now review the quizzes that you've already done.",
      MgAgSb: "Your memory and application skills are good based on our analysis. You know the concepts and you can also apply them, but time will also be an important factor during the examinations, and you seem to be lacking where speed is concerned. To improve your speed, do more of writing practice! Especially since A type of chapters are very important.",
      MgAbSg: "Your application skills are taking your score down in A type of chapters, considering that application is the most important to score well in the A segment. You know the concepts but you also need to apply them properly in different cases. Your speed however seems to be good, so that is there. Solve more examples!",
      MgAbSb: "Application skills and speed carry more weightage than memory when it comes to A type of chapters and while you are good in remembering the concepts, your application skills and speed need to be worked upon. You know the concepts but you also need to focus upon application of that knowledge in various situations and doing it faster. Practice more and solve more examples!",
      MbAgSg: "Your score is based on good application skills and speed but you also now need to focus on memory. You need to ensure that you remember the sections and law concepts better as these topics are very important from the examination point of view.",
      MbAgSb: "Your application skills are good enough but you also need to work upon memory and speed portion of A segment which has the most weightage in the examinations. You need to have conceptual clarity and also be able to solve the questions quicker to excel in the examinations.",
      MbAbSg: "Memory and application have the most weightage in this segment. While your speed is good, you need to remember the law concepts and be able to apply them in various situations. This segment is very important from examination point of view, so pay more attention to them.",
      MbAbSb: "These topics are the most important from the examination point of view, and you seem to be severely lacking in these chapters. Watch the lectures of these topics and give the quizzes again to get a better score!"
    },
    B: {
      MgAgSg: "Great! You've done well in the B segment. Now review the quizzes that you've already done. And make sure you also give equal time to A type of chapters along with B type.",
      MgAgSb: "You have done well in the segment of memory and application skills for B type chapters but you also need to work upon the speed, as it seems to be bringing your score down. You have remembered the concepts but now you need to focus on solving questions faster. Do more of writing practice for this segment!",
      MgAbSg: "You have done well but your score has come down due to application skills. Apart from learning the concepts you also need to pay attention towards application of these concepts in all cases as your application skills are pulling your score down. Practice more!",
      MgAbSb: "You have mostly aced quizzes that check your memory, however now you need to work upon the application skills and speed. You know the concepts but you also need to focus upon application of that knowledge in various situations. Practice more and solve more examples!",
      MbAgSg: "You’ve done well in the appliaction skills and speed segment but memory is also very important in B section. You need to ensure that you remember the sections and law concepts better.",
      MbAgSb: "You've done well in the application skills section but you also need to work upon memory and speed. You need to have conceptual clarity and also be able to solve the questions faster.",
      MbAbSg: "Your score has come down due to less score in memory and application skills in B type of chapters. You need to remember the law concepts and be able to apply them in various situations. Solve more examples to get a grip on this segment.",
      MbAbSb: "B type topics are relatively important from the examination point of view. Watch the lectures of these topics and give the quizzes again to get a better score!",
    },
    C: {
      MgAgSg: "You've done well in this segment, but make sure you pay most of your attention to the more important sections i.e. A and B.",
      MgAgSb: "You've done okay in this segment, but make sure you pay most of your attention to the more important sections i.e. A and B.",
      MgAbSg: "You've done okay in this segment, but make sure you pay most of your attention to the more important sections i.e. A and B.",
      MgAbSb: "Application skills are also important to be good in this section (section C). You need to focus upon the application of the concepts and being able to solve them quickly. Practice more!",
      MbAgSg: "Your score has come down due to a low scoring in the memory section. Remember the concepts and learn them by making charts, etc. and practice more.",
      MbAgSb: "Your application skills are good but you also need to focus upon remembering the concepts from the memory section. You need to ensure conceptual clarity and being able to apply them in questions more quickly. Practice more!",
      MbAbSg: "The section C has small topics which also need to be prepared for the examinations. Develop an understanding of the concepts and application skills by solving more questions.",
      MbAbSb: "You need to pay attention to these small topics too. Watch the lectures of these topics and give the quizzes again to get a better score! "
    }
  }
}
