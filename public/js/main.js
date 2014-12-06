$(document).ready(function() {

  // Place JavaScript code here...

  $('div.toggle input[type=checkbox]').click(function() {
  	$(this).parent().toggleClass('show');
  });

});
