import {Component, Inject, bootstrap} from 'angular-components';

@Component({
    selector: 'app',
    templateUrl: 'html/app.html',
    dependencies: ['angular-ui']
})
class Application {

    @Inject()
    config(
        @Inject('$httpProvider') $httpProvider: ng.IHttpProvider,
        @Inject('$urlRouterProvider') $urlRouterProvider,
        @Inject('$stateProvider') $stateProvider) {

        let pages = [
            'app'
        ];

        $urlRouterProvider.otherwise('/');

        pages.forEach((page) => {
            $stateProvider
                .state(page, {
                    url: `/${page}`,
                    templateUrl: `html/${page}.html`
                });
        });
    }

    @Inject()
    run( @Inject('$log') log: ng.ILogService) {

        log.debug(`Angular ${angular.version.full}`);
    };

    constructor(
        @Inject('$timeout') private $timeout,
        @Inject('$state') private $state,
        @Inject('growlService') private growlService) {

        this.growlService.growl('Welcome back User!', 'inverse')

        // Detect Mobile Browser
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            angular.element('html').addClass('ismobile');
        }
    }

}

bootstrap(Application);
