var corusURL = 'https://static.globalnews.ca/content/test/results-2011.js';

function gNews_getRidingDetailsCallback( data ) {
  for( var i = 0; i<data.length; i++ ){
    console.log( i );
    var corusCardOutput = '';
    corusCardOutput += '<div class="corus-card corus-card-' + data[i].num + '"><h1 class="corus-card-heading">' + data[i].name + '</h1><ol class="corus-card-list">';
    console.log( i );
    for ( var j = 0; j<data[i].results.length; j++ ) {
      corusCardOutput += '<li class="corus-card-list-item"><span class="corus-card-party">' + data[i].results[j].partyCode + '</span><span class="corus-card-candidate">' + data[i].results[j].name + '</span><span class="corus-card-total">' + data[i].results[j].votes + '</span><span class="corus-card-percent"></span></li>';
    }
    corusCardOutput += '</ol></div>';
    $( '.js-corus-item' + i ).append( corusCardOutput );
  }
}

$( document ).ready( function(){
  $.ajax({
    url: corusURL,
    method: 'get',
    dataType: 'script',
    crossDomain: true,
    success: function( data, textStatus ) {
      console.log( textStatus );
    },
    fail: function( errMsg ) {
      console.log( errMsg );
    }
  });
});