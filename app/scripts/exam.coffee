Exam = ->

Exam::fetch = (id, cb) ->
    _this = this
    $.get "data/exam/" + id + ".json", (data) ->
        _this.examData = data
        return cb(data)


Exam::getExamCount = ->
    return 3

Exam::checkAnswer = (yourAnswer) ->
    return true if yourAnswer is @examData.content
    false

window.Exam = Exam


$ ->
    exam = undefined
    examId = undefined
    exam = new Exam
    examId = 1 + Math.floor(Math.random() * 1000) % exam.getExamCount()
    $(".exam_wrapper, .exam_block").removeClass "hide"
    $(".user-input-submit").hide()
    exam.fetch examId, (examData) ->
        $(".exam_block").html examData.content
        $(".submit-exam").removeAttr "disabled"
        return

    $(".submit-exam").on "click", ->
        ans = undefined
        ans = $(".user-input").val()
        if exam.checkAnswer(ans)
            $.growlUI "答對了!!!"
        else
            $.growlUI "答錯了.... orz"
        return

    return
