angular.module('angular-ui')

// =========================================================================
// INPUT FIELD
// =========================================================================

//Add blue animated border and remove with condition when focus and blur

    .directive('fgLine', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                let input = element.find('input');
                let parent = element.parent();

                input.on('focus', function () {
                    element.addClass('fg-toggled');
                })

                input.on('blur', function () {
                    let value = input.val();

                    if (parent.hasClass('fg-float')) {
                        if (value.length === 0) {
                            element.removeClass('fg-toggled');
                        }
                    } else {
                        element.removeClass('fg-toggled');
                    }
                })
            }
        }
    })


// =========================================================================
// AUTO SIZE TEXTAREA
// =========================================================================

    .directive('autoSize', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (element[0]) {
                    autosize(element);
                }
            }
        }
    })


// =========================================================================
// BOOTSTRAP SELECT
// =========================================================================

    .directive('selectPicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //if (element[0]) {
                element.selectpicker();
                //}
            }
        }
    })


// =========================================================================
// INPUT MASK
// =========================================================================

    .directive('inputMask', function () {
        return {
            restrict: 'A',
            scope: {
                inputMask: '='
            },
            link: function (scope, element) {
                element.mask(scope.inputMask.mask);
            }
        }
    })


// =========================================================================
// COLOR PICKER
// =========================================================================

    .directive('colordPicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).each(function () {
                    var colorOutput = $(this).closest('.cp-container').find('.cp-value');
                    $(this).farbtastic(colorOutput);
                });

            }
        }
    })

    .directive('mdCheckbox', function(){
        return {
            restrict: 'EA',
            scope: {
                ngModel: '='
            },
            replace: true,
            link: function(scope, element, attrs){},
            template: `
            <label class="checkbox checkbox-inline">
                <input type="checkbox" ng-model="ngModel">
                <i class="input-helper"></i>
            </label>`
        }
    })



// =========================================================================
// PLACEHOLDER FOR IE 9 (on .form-control class)
// =========================================================================

    .directive('formControl', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                if (angular.element('html').hasClass('ie9')) {
                    $('input, textarea').placeholder({
                        customClass: 'ie9-placeholder'
                    });
                }
            }

        }
    })
