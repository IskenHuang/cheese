(function() {

  $(function() {
    var bumblerSpeech, draw, talkAndDraw;
    bumblerSpeech = new BumblerSpeech();
    draw = new DrawChinese();
    $(".top100_block").append($("#template-top100-holder").html());
    $(".demo_wrapper > .container").prepend($("#template-number-buttons").html());
    $(".btn").click(function(e) {
      talkAndDraw($(e.currentTarget).text());
    });
    $(".user-input").change(function(e) {
      talkAndDraw($(this).val());
    });
    $(".user-input").blur(function() {
      $(".user-input").val("");
    });
    talkAndDraw = function(word) {
      $("#holder").empty();
      draw.strokeWord(word);
      setTimeout((function() {
        var num;
        num = bumblerSpeech.chineseNumberToNumber(word);
        num = num.replace(/d/g, "");
        bumblerSpeech.numberQueue = [num, "thank"];
        bumblerSpeech.play();
        $(".user-input").val("");
      }), 400);
    };
  });

}).call(this);
