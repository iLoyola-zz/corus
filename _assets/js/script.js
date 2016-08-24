var corusURL = 'https://static.globalnews.ca/content/test/results-2011.js';

function gNews_getRidingDetailsCallback( data ) {
  console.log( data.length );
  var corusCardOutput = '';
  for( var i = 0; i<data.length; i++ ){
    corusCardOutput += '<input class="corus-open" type="radio" id="corus-' + data[i].num + '" name="corus" aria-hidden="true" hidden="" checked="checked"><div class="corus-item' + data[i].num + '"><div class="corus-card"><h1 class="corus-card-heading"></h1><ol class="corus-card-list"><li class="corus-card-list-item"><div class="corus-card-party"></div><div class="corus-card-candidate"></div><div class="corus-card-total"></div><div class="corus-card-percent"></div></li></ol></div></div>'
    $( '.js-riding-card-container' ).append( corusCardOutput );
    corusCardOutput = '';
  }
  $( '.corus-item1' ).attr( 'checked','checked' );
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