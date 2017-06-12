// JavaScript Document
var isDisposed = false;
var completionStatus = "not_attempted";
var passingStatus = 'failed';
var apiResult;

var minimumCompletionRequired = 1;
var percentageComplete = 0.0, prevPercentageComplete = 0.0, initialPercentageComplete = 0.0;

function onVideoWatchedPercentage( value, time )
{
   // Note: time is in seconds
   TSC.videoAnalytics.setCurrentPlayTime(time);

   // Note: the percentage reported via value reports how much was actually watched
   //       and not the percentage of the timeline that the playhead is at.
   //       So, for example, if you started up a video and then immediately seeked to
   //       the 75% pt, the values reported here would still start from zero.

   percentageComplete  = initialPercentageComplete + value;
   percentageComplete  = Math.max( 0, Math.min( 1, percentageComplete ) );

   // This gets called a lot, so we don't want to update the LMS every time.
   // We'll arbitrarily choose 2.5% increments 
   if ( percentageComplete - prevPercentageComplete >= 0.025 ) {
      if ( percentageComplete >= minimumCompletionRequired ) {
         completionStatus = 'completed';
      }
      if (apiVersion >= 1) {
         apiCall('setValue', 'cmi.exit', 'suspend');
         apiCall('setValue', 'cmi.progress_measure', percentageComplete);
         apiCall('setValue', 'cmi.location', time);
         apiCall('setValue', 'cmi.completion_status', completionStatus );
      }
      else {
         apiCall('setValue', 'cmi.core.exit', 'suspend');
         apiCall('setValue', 'cmi.suspend_data', percentageComplete);
         apiCall('setValue', 'cmi.core.lesson_location', time);

         // In 1.2, lesson_status hold both complete/incomplete and pass/fail.
         // So if we've already used it for pass/fail, we don't want to
         // overwrite with 'completed'
         var lessonStatus = apiCall( 'getValue', 'cmi.core.lesson_status' );
         if ( lessonStatus != 'failed' && lessonStatus != 'passed' ) {
            apiCall( 'setValue', 'cmi.core.lesson_status', completionStatus );
         }
      }
      apiCall( 'commit' );

      prevPercentageComplete = percentageComplete;
   }

}

/******************** SCORM Related Calls ***********************************/
var scoPassingScore = 80;
var lmsPassingScore;

function userSubmitToLMS( nScore , isComplete )
{	      
   var scoreNeeded = scoPassingScore;
   
   if ( !isNaN( nScore ) ) {
      if ( apiVersion >= 1 )
      {  
         lmsPassingScore = apiCall( 'getValue', 'cmi.scaled_passing_score' );
         apiCall( 'setValue', 'cmi.score.min', 0   );
         apiCall( 'setValue', 'cmi.score.max', 100 );
         apiCall( 'setValue', 'cmi.score.raw', nScore );	
         apiCall( 'setValue', 'cmi.score.scaled', nScore / 100 );
         
         //lms defined mastery level will take precedence over sco defined mastery level
         if ( lmsPassingScore != null && lmsPassingScore != "" && lmsPassingScore >= 0 && lmsPassingScore <= 1 )
         {
            scoreNeeded = lmsPassingScore * 100;
         }
      
         if ( nScore >= scoreNeeded )
         {
            passingStatus = 'passed';
            apiCall( 'setValue', 'cmi.success_status', passingStatus );	
         }
         else
         {
            apiCall( 'setValue', 'cmi.success_status', passingStatus );	
         }   
      }
      else
      {  
         lmsPassingScore = apiCall( 'getValue', 'cmi.student_data.mastery_score' );

         if ( lmsPassingScore != null && lmsPassingScore != "" && lmsPassingScore >= 0 && lmsPassingScore <= 100 )
         {
            scoreNeeded = lmsPassingScore;
         }

         apiCall( 'setValue', 'cmi.core.score.min', '0'    );
         apiCall( 'setValue', 'cmi.core.score.max', '100'  );
         apiCall( 'setValue', 'cmi.core.score.raw', nScore);
         apiCall( 'setValue', 'cmi.core.score.scaled', nScore / 100);

         if (nScore >= scoreNeeded) {
            passingStatus = 'passed';
            apiCall('setValue', 'cmi.core.lesson_status', passingStatus);
         }
         else {
            apiCall('setValue', 'cmi.core.lesson_status', passingStatus);
         }   
      }
   }

   // Note: isComplete tells us whether quizzing is complete but we want to report
   //       whether the viewing percentage requirement has been met
   if ( percentageComplete >= minimumCompletionRequired ) {
      completionStatus = "completed";
      var exitField = (apiVersion >= 1) ? 'cmi.exit' : 'cmi.core.exit';
      apiCall( 'setValue', exitField, '' );
      apiCall( 'commit' );
      dispose();
   }
   else {
      completionStatus = "incomplete";
   }
}


function userSubmitVideoCompletedToLMS()
{
    completionStatus = "completed";
    dispose();
}

function initSCORM()
{
   apiResult = apiCall( 'initialize' );
   if ( apiResult == 'false' )
   {
      alert( 'Failed to initialize communications with the LMS!' );
   }

   var lastTime = apiCall( 'getValue', (apiVersion >= 1) ? 'cmi.location' : 'cmi.core.lesson_location' );
   if ( lastTime != null && lastTime != '' ) {
      var lastPct = apiCall('getValue', (apiVersion >=1) ? 'cmi.progress_measure' : 'cmi.suspend_data' );
      if ( lastPct != null && lastPct != '' ) {
          percentageComplete = parseFloat( lastPct );
      }
      initialPercentageComplete = prevPercentageComplete = percentageComplete;

      // Disabling for now; seek may be ignored due to buffering
      //TSC.playerConfiguration.setScormStartPt( lastTime );
   }
}

function loadPage()
{
   completionStatus = "incomplete";
}


function dispose()
{
   var exitStatus = "suspend";

   if (percentageComplete >= minimumCompletionRequired )
   {
      completionStatus = "completed";
      exitStatus = "";
   }

   if ( !isDisposed )
   {
      // note: time reported in seconds here...
      var time = TSC.videoAnalytics.getCurrentPlayTime();
      if (apiVersion >= 1) {
         apiCall('setValue', 'cmi.progress_measure', percentageComplete);
         apiCall('setValue', 'cmi.location', time);
         apiCall('setValue', 'cmi.success_status', passingStatus);
         apiCall('setValue', 'cmi.completion_status', completionStatus);
      } else {
         apiCall('setValue', 'cmi.suspend_data', percentageComplete);
         apiCall('setValue', 'cmi.core.lesson_location', time);

         // In 1.2, lesson_status holds both complete/incomplete and pass/fail.
         // So if we've already used it for pass/fail, we don't want to overwrite
         // with 'completed'.
         var lessonStatus = apiCall( 'getValue', 'cmi.core.lesson_status' );
         if ( lessonStatus != 'failed' && lessonStatus != 'passed' ) {
            apiCall('setValue', 'cmi.core.lesson_status', completionStatus );
         }
      }
      apiCall('commit');

      isDisposed = true;
   }
}

function pageUnload() {
    dispose();
    apiCall('terminate');
}




function pageLoad()
{
	loadPage();	
}
