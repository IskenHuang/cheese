define [
    'views/BaseView'
    'text!templates/footer.html'
], (BaseView, footerTemplate) ->
    HeaderView = BaseView.extend
        el: '[data-js=footer]'

        initialize: (options = {})->

        template: _.template(footerTemplate)

        render: ->
            @$el.html @template

            return @$el.html()

    return HeaderView

