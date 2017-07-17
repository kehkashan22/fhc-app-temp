import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsProvider {
  firebase_url: string = 'https://ionic-fhc-app.firebaseio.com/';
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
}
