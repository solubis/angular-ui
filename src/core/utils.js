/* global Waves */
angular.module('angular-ui')

// =========================================================================
// WAVES
// =========================================================================

// For .btn classes
    .directive('btn', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                if (element.attr('m-ripple')) {
                    return;
                }

                if (element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                    Waves.attach(element, ['waves-circle']);
                }

                else if (element.hasClass('btn-light')) {
                    Waves.attach(element, ['waves-light']);
                }

                else {
                    Waves.attach(element);
                }

                Waves.init();
            }
        }
    })

// =========================================================================
// STOP PROPAGATION
// =========================================================================

    .directive('stopPropagate', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.preventDefault();
                });
            }
        }
    })


// =========================================================================
// PRINT
// =========================================================================

    .directive('print', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.click(function () {
                    window.print();
                })
            }
        }
    })

    .directive('scrollReveal', ($timeout) => {
        return {
            restrict: 'A',
            link: function (scope, element) {
                window.ScrollReveal.reveal('.card', { delay: 300, duration: 500, container: element[0] });
            }
        }
    })
