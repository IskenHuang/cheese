define [
    'backbone'
    'i18next'
], (Backbone, I18Next) ->
    App =
        init: () ->
            @cheeseRoutes = 
                routes : 
                    thanks : "showThanksView"
                    top100 : "showTop100View"
                    numbers : "showNumbersView"
                    exam : "showExamView"

                showThanksView : () ->
                    console.log "showThanksView"

                showTop100View : () ->
                    console.log "showTop100View"
                    
                showNumbersView : () ->
                    console.log "showNumbersView"

                showExamView : () ->
                    console.log "showExamView"

                        
            # initialize router, views, data and layouts
        start: () ->
            App.init()

            # i18n default and init
            locale = 'en-US';
            I18Next.init(
                lng: locale
                debug: true
                ns: 'translation'
                resGetPath: './scripts/locales/__lng__/__ns__.json'
                getAsync: true
                useLocalStorage: true
                localStorageExpirationTime: 1
            , (t)->
                $('[data-i18n]').i18n()
            )

            ourRouters = Backbone.Router.extend @cheeseRoutes
            new ourRouters

            Backbone.history.start()

        # Views: {}
        # Models: {}
        # Collections: {}

    return App;
