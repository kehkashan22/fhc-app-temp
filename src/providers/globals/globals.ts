import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsProvider {
  firebase_url: string = 'https://fhcbionicbapp.firebaseio.com/';
  courses: ['ca', 'cs'];
  caCollection = [
    {
      stageId: 'final',
      subject: [
        {
          subjectId: 'dt',
          subjectName: 'direct tax',
          type: ['general', 'ammendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017']
        },

        {
          subjectId: 'idt',
          subjectName: 'indirect tax',
          type: ['general', 'ammendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017'] // TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'intermediate',
      subject: [
        {
          subjectId: 'tax',
          subjectName: 'tax',
          type: ['general', 'ammendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017'] //TYPE
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
          type: ['general', 'ammendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017'] //TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'executive',
      subject: [
        {
          subjectId: 'ltp',
          subjectName: 'tax laws and practices',
          type: ['general', 'ammendments', 'case laws'], //TYPE
          fa: ['fa2016', 'fa2017'] //TYPE
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
      MgAgSg: "Great! You've done well in this segment. Now review the quizzes that you've already done.",
      MgAgSb: "You know the concepts and you can also apply them, but time will be an important factor during the examinations. Do more of writing practice!",
      MgAbSg: "You know the concepts but you also need to apply them properly in different cases. Solve more examples!",
      MgAbSb: "You know the concepts but you also need to focus upon application of that knowledge in various situations. Practice more and solve more examples!",
      MbAgSg: "You need to ensure that you remember the sections and law concepts better as these topics are very important from the examination point of view.",
      MbAgSb: "You need to have conceptual clarity and also be able to solve the questions quicker to excel in the examinations.",
      MbAbSg: "You need to remember the law concepts and be able to apply them in various situations. This segment is very important from the examination point of view, so pay more attention to them.",
      MbAbSb: "These topics are the most important from the examination point of view. Watch the lectures of these topics and give the quizzes again to get a better score! ",
    }	,

    B	: {
      MgAgSg: "Great! You've done well in this segment. Now review the quizzes that you've already done.",
      MgAgSb: "You have remembered the concepts but now you need to focus on solving questions faster. Do more of writing practice for this segment!",
      MgAbSg: "Apart from learning the concepts you also need to pay attention towards application of these concepts in all cases. Practice more!",
      MgAbSb: "You know the concepts but you also need to focus upon application of that knowledge in various situations. Practice more and solve more examples!",
      MbAgSg: "You need to ensure that you remember the sections and law concepts better.",
      MbAgSb: "You need to have conceptual clarity and also be able to solve the questions faster.",
      MbAbSg: "You need to remember the law concepts and be able to apply them in various situations. Solve more examples to get a grip on this segment.",
      MbAbSb: "These topics are relatively important from the examination point of view. Watch the lectures of these topics and give the quizzes again to get a better score! ",
    },
  C: {
      MgAgSg: "You've done well in this segment, but make sure to invest more time and attention towards the more important sections i.e. A and B.",
      MgAgSb: "You've done well in this segment, but make sure to invest more time and attention towards the more important sections i.e. A and B.",
      MgAbSg: "You've done well in this segment, but make sure to invest more time and attention towards the more important sections i.e. A and B.",
      MgAbSb: "You need to focus upon the application of the concepts and being able to solve them quickly. Practice more!",
      MbAgSg: "You need to ensure that you remember the sections and law concepts better.",
      MbAgSb: "You need to ensure conceptual clarity and being able to apply them in questions more quickly. Practice more!",
      MbAbSg: "You need to ensure conceptual clarity and being able to apply them in different questions and situations. Practice more!",
      MbAbSb: "You need to pay attention to these small topics too. Watch the lectures of these topics and give the quizzes again to get a better score! ",
    }
  }
}
