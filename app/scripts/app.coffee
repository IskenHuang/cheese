define [
    'backbone'
    'i18next'
    'views/Header'
    'views/Footer'
    'views/ContentManager'
], (Backbone, I18Next, HeaderView, FooterView, ContentManager) ->
    App =
        init: () ->
            @cheeseRoutes =
                routes :
                    thanks : 'showThanksView'
                    top100 : 'showTop100View'
                    numbers : 'showNumbersView'
                    exam : 'showExamView'

                showThanksView : () ->
                    console.log 'showThanksView'

                showTop100View : () ->
                    console.log 'showTop100View'

                showNumbersView : () ->
                    console.log 'showNumbersView'

                showExamView : () ->
                    console.log 'showExamView'

            # initialize router, views, data and layouts
            @headerView =  new HeaderView()
            $('[data-js=header]').html(@headerView.render())

            @footerView = new FooterView()
            $('[data-js=footer]').html(@footerView.render())

            @contentManager = new ContentManager()

        start: () ->
            # i18n default and init
            locale = 'zh-TW';
            I18Next.init(
                lng: locale
                debug: true
                ns: 'translation'
                resGetPath: './scripts/locales/__lng__/__ns__.json'
                getAsync: true
                # local cache disable for debug
                useLocalStorage: true
                localStorageExpirationTime: 1
            , (t)->
                $('[data-i18n]').i18n()
            )

            App.init()

            ourRouters = Backbone.Router.extend @cheeseRoutes
            new ourRouters

            Backbone.history.start()

        # Views: {}
        # Models: {}
        # Collections: {}

    return App;
