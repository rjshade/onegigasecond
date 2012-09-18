output_state = 'hidden';
$(document).ready(function(){
  // toggles display of the "e.g. 1st April 1985" default text
  $(".defaultText").focus(function(srcc) {
    if ($(this).val() == $(this)[0].title) {
      $(this).removeClass("defaultTextActive");
      $(this).val("");
    }
  });

  $(".defaultText").blur(function() {
    if ($(this).val() == "") {
      $(this).addClass("defaultTextActive");
      $(this).val($(this)[0].title);
    }
  });

  $(".defaultText").blur();   

  $('#date_input').keyup(function() {
    //alert('Handler for .keyup() called.');

    //alert($('#date_input').val()) 
    var today = Date.today();
    var date_input = $('#date_input').val()
    birth = Date.parse(date_input)
    //$('#test_output').html("input = " + date_input + " , output = " + birth);

    if( birth != null  ) {
      var msec = today - birth;
      var secs = msec/1000;
      var days = parseInt(secs/86400);

      // assumption: no three year olds are using this site
      if( days > 1000 ) {
        var next10e4d = 10000 * Math.ceil(days / 10000)
        var next10e9s = 1000000000 * Math.ceil(secs / 1000000000)

        var next10e4d_date = new Date( Date.parse(date_input) ).addDays( next10e4d );
        var next10e9s_date = new Date( Date.parse(date_input) ).addSeconds( next10e9s );

        var dateFormat = 'ddd d MMM, yyyy'

          $('#output_age_days_val').html(days)
          $('#output_age_secs_val').html(secs)


          // convert date to string
          gCalDays_date = next10e4d_date.toString('yyyyMMdd');

        // for a full day calendar event we need a date string for the following day as well...
        gCalDays_date_inc = new Date(next10e4d_date).addDays(1).toString('yyyyMMdd');

        // create the link to add event to google calendar
        gCalDays = '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=' + next10e4d + ' days old&dates=' + gCalDays_date + '/' + gCalDays_date_inc + '&sprop=website:http://rjshade.com/projects/onegigasecond&sprop=name:onegigasecond&details=' + next10e4d + ' days old! find your next anniversary at http://rjshade.com/projects/onegigasecond"><img class="gcal" src="http://www.google.com/calendar/images/ext/gc_button6.gif" border="0" alt="Add to Google Calendar"></img></a><br/>';

        // now do the same for gigaseconds
        gCalSecs_date = next10e9s_date.toString('yyyyMMdd');
        gCalSecs_date_inc = new Date(next10e9s_date).addDays(1).toString('yyyyMMdd');
        gCalSecs = '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=' + next10e9s + ' seconds old&dates=' + gCalSecs_date + '/' + gCalSecs_date_inc + '&sprop=website:http://rjshade.com/projects/onegigasecond&sprop=name:onegigasecond&details=' + next10e9s + ' seconds old! find your next anniversary at http://rjshade.com/projects/onegigasecond"><img class="gcal" src="http://www.google.com/calendar/images/ext/gc_button6.gif" border="0" alt="Add to Google Calendar"></img></a><br/>';

        $('#output_days_val').html(next10e4d);
        $('#output_days_date').html(next10e4d_date.toString(dateFormat) + gCalDays);

        $('#output_secs_val').html(next10e9s);
        $('#output_secs_date').html(next10e9s_date.toString(dateFormat) + gCalSecs);

        if( output_state == 'hidden' ) {
          $('#output_container').show('blind', { direction: 'vertical' }, 200);
          output_state = 'visible';
        }
      }
    } else {
      if( output_state == 'visible' ) {
        $('#output_container').hide('blind', { direction: 'vertical' }, 100);
        output_state = 'hidden';
      }
    }
  });
});
