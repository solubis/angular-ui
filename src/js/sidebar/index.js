angular.module('angular-ui')


// =========================================================================
// MAINMENU COLLAPSE
// =========================================================================

    .directive('toggleSidebar', function ($timeout) {

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },

            link: function (scope, element, attr) {
                scope.$watch('modelLeft', function (value) {
                    $(document.body).toggleClass('overflow-hidden', !!value);
                })

                element.on('click', function () {

                    if (typeof scope.modelLeft !== 'undefined') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function () {
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function () {
                                scope.modelLeft = false;
                            })
                        }
                    }

                    if (typeof scope.modelRight !== 'undefined') {
                        if (scope.modelRight === false) {
                            scope.$apply(function () {
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function () {
                                scope.modelRight = false;
                            })
                        }
                    }
                })
            }
        }

    })



// =========================================================================
// SUBMENU TOGGLE
// =========================================================================

    .directive('toggleSubmenu', function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        }
    })
