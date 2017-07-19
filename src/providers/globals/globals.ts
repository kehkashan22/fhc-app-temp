import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsProvider {
  firebase_url: string = 'https://fhc-ionic-app.firebaseio.com/';
  courses: ['ca', 'cs'];
  caCollection = [
    {
      stageId: 'final',
      subject: [
        {
          subjectId: 'dt',
          subjectName: 'direct tax',
          type: ['general', 'ammendments', 'case laws'] //TYPE
        },

        {
          subjectId: 'idt',
          subjectName: 'indirect tax',
          type: ['general', 'ammendments', 'case laws'] // TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'intermediate',
      subject: [
        {
          subjectId: 'tax',
          subjectName: 'tax',
          type: ['general', 'ammendments', 'case laws'] //TYPE
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
          type: ['general', 'ammendments', 'case laws'] //TYPE
        }
      ] //SUBJECT
    }, {
      stageId: 'executive',
      subject: [
        {
          subjectId: 'ltp',
          subjectName: 'tax laws and practices',
          type: ['general', 'ammendments', 'case laws'] //TYPE
        }
      ] //SUBJECT
    }
  ]
}
