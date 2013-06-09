define [
    'views/BaseView'
    'text!templates/header.html'
], (BaseView, headerTemplate) ->
    HeaderView = BaseView.extend
        el: '[data-js=header]'

        initialize: (options = {})->

        template: _.template(headerTemplate)

        render: ->
            @$el.html @template

            return @$el.html()

    return HeaderView

