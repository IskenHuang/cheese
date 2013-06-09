define [
    'views/BaseView'
    'views/Blackboard'
    'text!templates/service.html'
], (BaseView, BlackboardView, ServiceTemplate) ->
    IndexLayout = BaseView.extend
        el: '[data-js=content]'

        template: _.template(ServiceTemplate)

        initialize: (options = {})->

        render: ->
            console.log 'IndexLayout render'
            @$el.html @template

            @blackboard = new BlackboardView();
            @blackboard.render()



    return IndexLayout