define [
    'backbone'
    'i18next'
], (Backbone, I18Next) ->
    App =
        init: () ->
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

            Backbone.history.start()
        # Views: {}
        # Models: {}
        # Collections: {}
        # Routers: {}

    return App;
