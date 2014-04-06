(function() {
  var Exam;

  Exam = function() {};

  Exam.prototype.fetch = function(id, cb) {
    var _this;
    _this = this;
    return $.get("data/exam/" + id + ".json", function(data) {
      _this.examData = data;
      return cb(data);
    });
  };

  Exam.prototype.getExamCount = function() {
    return 3;
  };

  Exam.prototype.checkAnswer = function(yourAnswer) {
    if (yourAnswer === this.examData.content) {
      return true;
    }
    return false;
  };

  window.Exam = Exam;

  $(function() {
    var exam, examId;
    exam = void 0;
    examId = void 0;
    exam = new Exam;
    examId = 1 + Math.floor(Math.random() * 1000) % exam.getExamCount();
    $(".exam_wrapper, .exam_block").removeClass("hide");
    $(".user-input-submit").hide();
    exam.fetch(examId, function(examData) {
      $(".exam_block").html(examData.content);
      $(".submit-exam").removeAttr("disabled");
    });
    $(".submit-exam").on("click", function() {
      var ans;
      ans = void 0;
      ans = $(".user-input").val();
      if (exam.checkAnswer(ans)) {
        $.growlUI("答對了!!!");
      } else {
        $.growlUI("答錯了.... orz");
      }
    });
  });

}).call(this);
