$ ->
    emptyAndDraw = (wording) ->

        # empty & draw
        $("#holder").empty()
        draw.strokeWord wording
        return
    submitWording = ->
        originalWording = $(".user-input").val()
        encodedWording = encodeURIComponent(originalWording)
        if originalWording is ""
            $.growlUI "請輸入文字"
            return
        else
            emptyAndDraw originalWording
            $.ajax
                url: "https://www.moedict.tw/a/" + encodedWording + ".json"

                # url: "https://www.moedict.tw/raw/" + encodedWording,
                type: "GET"
                dataType: "json"
                async: true
                error: (jqXHR, b, c) ->

                success: (data) ->
                    noun = data.h[0].d[0].f
                    kk = data.h[0].p
                    english = data.translation.English[0]
                    $("#explan_modal").find(".noun").text(noun).end().find(".kk").text(kk).end().find(".english").text english
                    return

        return
    draw = new DrawChinese()
    $(".top100_block").append $("#template-top100-holder").html()
    $(".user-input-submit").on "click", submitWording
    $(".show_intro_modal").removeClass "hide"
    $(".show_intro_modal").on "click", ->
        $("#explan_modal").modal "show"
        return

    return
