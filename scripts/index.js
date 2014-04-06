(function() {

  $(function() {
    var draw, emptyAndDraw, submitWording;
    emptyAndDraw = function(wording) {
      $("#holder").empty();
      draw.strokeWord(wording);
    };
    submitWording = function() {
      var encodedWording, originalWording;
      originalWording = $(".user-input").val();
      encodedWording = encodeURIComponent(originalWording);
      if (originalWording === "") {
        $.growlUI("請輸入文字");
        return;
      } else {
        emptyAndDraw(originalWording);
        $.ajax({
          url: "https://www.moedict.tw/a/" + encodedWording + ".json",
          type: "GET",
          dataType: "json",
          async: true,
          error: function(jqXHR, b, c) {},
          success: function(data) {
            var english, kk, noun;
            noun = data.h[0].d[0].f;
            kk = data.h[0].p;
            english = data.translation.English[0];
            $("#explan_modal").find(".noun").text(noun).end().find(".kk").text(kk).end().find(".english").text(english);
          }
        });
      }
    };
    draw = new DrawChinese();
    $(".top100_block").append($("#template-top100-holder").html());
    $(".user-input-submit").on("click", submitWording);
    $(".show_intro_modal").removeClass("hide");
    $(".show_intro_modal").on("click", function() {
      $("#explan_modal").modal("show");
    });
  });

}).call(this);
