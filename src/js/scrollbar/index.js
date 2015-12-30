import 'nicescroll';

angular.module('angular-ui')

    .directive('scrollbar', function () {
        return {
            restrict: 'A',
            scope: {
            },
            link: function (scope, element, attrs) {
                let options = scope.$eval(attrs.scrollbarOptions)

                let scrollbar = element.niceScroll(options);

                scope.$on('$destroy', function () {
                    if (angular.isDefined(scrollbar.version)) {
                        scrollbar.remove();
                    }
                })
            }
        }
    })