$ ->
    bumblerSpeech = new BumblerSpeech()
    draw = new DrawChinese()
    $(".top100_block").append $("#template-top100-holder").html()
    $(".demo_wrapper > .container").prepend $("#template-number-buttons").html()
    $(".btn").click (e) ->
        talkAndDraw $(e.currentTarget).text()
        return

    $(".user-input").change (e) ->
        talkAndDraw $(this).val()
        return


    # var word, num;

    # $('#holder').empty();

    # word = $(this).val();
    # draw.strokeWord(word);

    # setTimeout(function(){
    #   num = bumblerSpeech.chineseNumberToNumber(word);
    #   num = num.replace(/d/ig, '');
    #   bumblerSpeech.numberQueue = [ num, 'thank'];
    #   bumblerSpeech.play();

    #   $('.user-input').val('');

    # }, 400);
    $(".user-input").blur ->
        $(".user-input").val ""
        return

    talkAndDraw = (word) ->
        $("#holder").empty()
        draw.strokeWord word
        setTimeout (->
            num = bumblerSpeech.chineseNumberToNumber(word)
            num = num.replace(/d/g, "")
            bumblerSpeech.numberQueue = [
                num
                "thank"
            ]
            bumblerSpeech.play()
            $(".user-input").val ""
            return
        ), 400
        return

    return
