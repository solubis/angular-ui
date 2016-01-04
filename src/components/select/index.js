import 'chosen/chosen.jquery.js';
import 'chosen/chosen.css';

import './chosen-spinner.css';
import './chosen.scss';


angular.module('angular-ui')
    .directive('chosen', ['$timeout', function ($timeout) {
        var CHOSEN_OPTION_WHITELIST,
            NG_OPTIONS_REGEXP;

        NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;
        CHOSEN_OPTION_WHITELIST = ['noResultsText', 'allowSingleDeselect', 'disableSearchThreshold', 'disableSearch', 'enableSplitWordSearch', 'inheritSelectClasses', 'maxSelectedOptions', 'placeholderTextMultiple', 'placeholderTextSingle', 'searchContains', 'singleBackstrokeDelete', 'displayDisabledOptions', 'displaySelectedOptions', 'width'];

        function snakeCase(input) {
            return input.replace(/[A-Z]/g, function ($1) {
                return "_" + ($1.toLowerCase());
            });
        };

        function isEmpty(value) {
            var key;
            if (angular.isArray(value)) {
                return value.length === 0;
            } else if (angular.isObject(value)) {
                for (key in value) {
                    if (value.hasOwnProperty(key)) {
                        return false;
                    }
                }
            }
            return true;
        };

        return {
            restrict: 'A',
            require: '?ngModel',
            terminal: true,
            link: function (scope, element, attr, ngModel) {
                var chosen = null,
                    defaultText = null,
                    empty = false,
                    match,
                    options,
                    origRender,
                    valuesExpr,
                    viewWatch;

                function startLoading() {
                    return element.addClass('loading').attr('disabled', true).trigger('chosen:updated');
                };

                function stopLoading() {
                    return element.removeClass('loading').attr('disabled', false).trigger('chosen:updated');
                };

                function initOrUpdate() {
                    if (chosen) {
                        return element.trigger('chosen:updated');
                    } else {
                        chosen = element.chosen(options).data('chosen');
                        return defaultText = chosen.default_text;
                    }
                };

                function removeEmptyMessage() {
                    empty = false;
                    return element.attr('data-placeholder', defaultText);
                };

                function disableWithMessage() {
                    empty = true;
                    return element.attr('data-placeholder', chosen.results_none_found).attr('disabled', true).trigger('chosen:updated');
                };

                element.addClass('chosen');

                options = scope.$eval(attr.chosen) || { width: '100%' };

                angular.forEach(attr, function (value, key) {
                    if (CHOSEN_OPTION_WHITELIST.indexOf(key) >= 0) {
                        return options[snakeCase(key)] = scope.$eval(value);
                    }
                });

                if (ngModel) {
                    origRender = ngModel.$render;
                    ngModel.$render = function () {
                        origRender();
                        return initOrUpdate();
                    };
                    if (attr.multiple) {
                        viewWatch = function () {
                            return ngModel.$viewValue;
                        };
                        scope.$watch(viewWatch, ngModel.$render, true);
                    }
                } else {
                    initOrUpdate();
                }

                attr.$observe('disabled', function () {
                    return element.trigger('chosen:updated');
                });

                if (attr.ngOptions && ngModel) {
                    match = attr.ngOptions.match(NG_OPTIONS_REGEXP);
                    valuesExpr = match[7];

                    scope.$watchCollection(valuesExpr, function (newVal, oldVal) {
                        var timer;

                        timer = $timeout(function () {
                            if (angular.isUndefined(newVal)) {
                                return startLoading();
                            } else {
                                if (empty) {
                                    removeEmptyMessage();
                                }
                                stopLoading();
                                if (isEmpty(newVal)) {
                                    return disableWithMessage();
                                }
                            }
                        });

                        scope.$on('$destroy', function (event) {
                            if (typeof timer !== "undefined" && timer !== null) {
                                return $timeout.cancel(timer);
                            }
                        });
                    });

                }
            }
        };
    }
    ]);