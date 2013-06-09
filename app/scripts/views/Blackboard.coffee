define [
    'views/BaseView'
    'text!templates/blackboard.html'
    'DrawChinese'
    'raphael'
], (BaseView, BlackboardTemplate, DrawChinese, Raphael) ->
    BlackboardView = BaseView.extend
        el: '[data-js=blackboard]'

        template: _.template(BlackboardTemplate)

        events:
        	'click [data-js=submit]' : 'drawChinese'

        initialize: (options = {})->
        	@draw = new DrawChinese()

        render: ->
        	@$el.append @template
        	@draw.strokeWord('永');

        drawChinese: (e)->
        	console.log '[data-js=inputChinese] = ', $('[data-js=inputChinese]').val()
        	@draw.strokeWord('永');

    return BlackboardView
