var corusAPI = 'http://static.globalnews.ca/content/test/results-2011.js';
obj = JSON.parse( corusAPI );

console.log( obj.count );


document.addEventListener( "DOMContentLoaded", function(event) {
  console.log( "DOM fully loaded and parsed stat" );
});