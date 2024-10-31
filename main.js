//make the text change during the progress bar
//on complaint field, random letters are typoed
//a custom captcha that is technically impossible, but when you type a certain number of characters it says "close enough"
//a popup where the x moves, or is replaced by another one in the opposite corner
//on second progress bar increase, make it go over 100% and breakout of the container
//mid way through form, theres a satisfaction survey only answers are yes and no, if you select no, a link pops up that says "If you are not happy with your experience, please fill out our complaints form here"
//every (range between 30 seconds and 2 minutes) theres a "are you still there alert", if you select no, it refreshes the page
//on all fields, theres a help question mark, on hover it says "this is a form field"
//only on specific fields it alerts "are you sure you want to answer with that?"
//draw a perfect circle to continue
//stop the difference between very detailed paintings using a magnifing tool
//ads keeps poping up with autoplay music, on hover the close button gradually gets smaller so you have to be really quick
//on utilisation add more fields, make them multistep so you can't see them all at the start, it keeps adding more as you click a continue button also making them all required on live

$(document).ready(function() {
    if (localStorage.getItem('formSubmitted')) {
      $('#complaint-form-container').hide();
      $('#duck-image-container').show();
    } else {
      $('#complaint-form').submit(function(event) {
        event.preventDefault();
        $('#complaint-form-container').hide();
        $('#loading-container').show();
        
        simulateLoadingSequence();
      });
    }
  
    $('#reset-button').click(function() {
      localStorage.removeItem('formSubmitted');
      location.reload();
    });
  
    function simulateLoadingSequence() {
      setTimeout(function() {
        confirmSubmission(function() {
          setTimeout(function() {
            doubleCheck(function() {
              setTimeout(function() {
                confirmSubmission(function() {
                  setTimeout(function() {
                    simulateLoadingBar(function() {
                      $('#loading-container').hide();
                      $('#final-message').show();
                      
                      setTimeout(function() {
                        $('#final-message').fadeOut('slow', function() {
                          localStorage.setItem('formSubmitted', true);
                          $('#duck-image-container').fadeIn();
                        });
                      }, 7000);
                    });
                  }, 2000);
                });
              }, 5000);
            });
          }, 2000);
        });
      }, 7000);
    }
  
    function confirmSubmission(callback) {
      if (confirm("Are you sure you want to submit?")) {
        callback();
      } else {
        $('#loading-container').hide();
        $('#complaint-form-container').show();
      }
    }
  
    function doubleCheck(callback) {
      if (confirm("Are you really sure? Double-check your details.")) {
        alert("Last confirmation before submission.");
        callback();
      } else {
        $('#loading-container').hide();
        $('#complaint-form-container').show();
      }
    }
  
    function simulateLoadingBar(callback) {
      var $loadingBar = $('#loading-bar');
      var $loadingPercentage = $('#loading-percentage');
      var percentage = 0;
  
      function incrementLoadingBar() {
        if (percentage < 99) {
          percentage += 1;
          $loadingBar.css('width', percentage + '%');
          $loadingPercentage.text(percentage + '%');
          let delay = Math.random() < 0.2 ? 500 : 50; // 20% chance of a pause
          if (percentage > 95) {
            delay = Math.random() < 0.5 ? 500 : 100; // Slows down after 95%
          }
          setTimeout(incrementLoadingBar, delay);
        } else {
          setTimeout(function() {
            decrementLoadingBar();
          }, 3500);
        }
      }
  
      function decrementLoadingBar() {
        if (percentage > 0) {
          percentage -= 1;
          $loadingBar.css('width', percentage + '%');
          $loadingPercentage.text(percentage + '%');
          let delay = Math.random() < 0.1 ? 300 : 100; // 10% chance of a slow down
          setTimeout(decrementLoadingBar, delay);
        } else {
          setTimeout(incrementLoadingBar, 2800);
        }
      }
  
      incrementLoadingBar();
      
      setTimeout(function() {
        callback();
      }, 60000); // Ensure callback is called after sufficient delay
    }
  });
  
  $('.continue-button').on('click', function(e){
    let continuelink = $(e.target)[0].id;
    $('#'+continuelink).css('display', 'none');
    $('.'+continuelink).css('display', 'unset');
  });