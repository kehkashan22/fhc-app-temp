export default [
  {
    courseId: 'ca',
    stage: [
      {
        stageId: 'final',
        subject: [
          {
            subjectId: 'direct tax',
            fa: [
              {
                faId: 'FA 2016',
                chapters: []//CHAPTERS END
              },
              {
                faId: 'FA 2017',
                chapters: []//CHAPTERS END
              }
            ]//FA
          },

          {
            subjectId: 'indirect tax',
            fa: [
              {
                faId: 'FA 2016',
                chapters: []//CHAPTERS END
              },
              {
                faId: 'FA 2017',
                chapters: []//CHAPTERS END
              }
            ]//FA
          } //SUBJECT CA FINAL INDIRECT TAX
        ] //SUBJECTS
      },

      {
        stageId: 'intermediate',
        subject: [
          {
            subjectId: 'tax',
            fa: [
              {
                faId: 'FA 2016',
                chapters: [ ]//CHAPTERS END
              },
              {
                faId: 'FA 2017',
                chapters: [ ]//CHAPTERS END
              }
            ]//FA
          }
        ] //SUBJECT CA INTERMEDIATE TAX
      }
    ] //STAGE CA INTERMEDIATE
  }, //COURSE CA
  {
    courseId: 'cs',
    stage: [
      {
        stageId: 'professional',
        subject: [
          {
            subjectId: 'advanced tax laws and practices',
            fa: [
              {
                faId: 'FA 2016',
                chapters: []//CHAPTERS END
              },
              {
                faId: 'FA 2017',
                chapters: []//CHAPTERS END
              }
            ]//FA
          }
        ] //SUBJECT CS PROFESSIONAL advanced tax laws and practices
      },

      {
        stageId: 'executive',
        subject: [
          {
            subjectId: 'tax laws',
            fa: [
              {
                faId: 'FA 2016',
                chapters: []//CHAPTERS END
              },
              {
                faId: 'FA 2017',
                chapters: []//CHAPTERS END
              }
            ]//FA
          }
        ] //SUBJECT CS EXECUTIVE TAX LAWS
      }
    ] //STAGE CS EXECUTIVE
  } //COURSE CS
]; //COURSE ID
