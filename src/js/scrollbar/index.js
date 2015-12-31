import 'nicescroll';

angular.module('angular-ui')

    .directive('scrollbar', function () {
        return {
            restrict: 'A',
            scope: {
            },
            link: function (scope, element, attrs) {
                let options = {
                    cursorcolor: attrs['scrollbarColor'] || 'rgba(0,0,0,0.2)',
                    cursorborder: 0,
                    cursorborderradius: 0,
                    cursorwidth: attrs['scrollbarWidth'] || '6px',
                    bouncescroll: true,
                    scrollspeed: 10,
                    mousescrollstep: 10
                };

                angular.extend(options, scope.$eval(attrs.scrollbar));

                let scrollbar = element.niceScroll(options);

                scope.$on('$destroy', function () {
                    if (angular.isDefined(scrollbar.version)) {
                        scrollbar.remove();
                    }
                })
            }
        }
    });

