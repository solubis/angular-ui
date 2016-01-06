'use strict';

angular.module('m.data.table').directive('mColumn', mColumn);

function mColumn($compile) {

    return {
        compile: compile,
        require: ['^^mHead', '^^mTable'],
        restrict: 'A',
        scope: {
            numeric: '=?mNumeric',
            orderBy: '@?mOrderBy'
        }
    };

    function compile(tElement) {
        tElement.addClass('m-column');
        return postLink;
    }

    function postLink(scope, element, attrs, ctrls) {
        var headCtrl = ctrls.shift();
        var tableCtrl = ctrls.shift();

        function attachSortIcon() {
            var sortIcon = angular.element('<i class="zmi zmi-long-arrow-up"></i>');

            $compile(sortIcon.addClass('m-sort-icon').attr('ng-class', 'getDirection()'))(scope);

            if (element.hasClass('m-numeric')) {
                element.prepend(sortIcon);
            } else {
                element.append(sortIcon);
            }
        }

        function detachSortIcon() {
            Array.prototype.some.call(element.find('i'), function (icon) {
                return icon.classList.contains('m-sort-icon') && element[0].removeChild(icon);
            });
        }

        function disableSorting() {
            detachSortIcon();
            element.removeClass('m-sort').off('click', setOrder);
        }

        function enableSorting() {
            attachSortIcon();
            element.addClass('m-sort').on('click', setOrder);
        }

        function getIndex() {
            return Array.prototype.indexOf.call(element.parent().children(), element[0]);
        }

        function isActive() {
            if (!scope.orderBy) {
                return false;
            }

            return headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy;
        }

        function isNumeric() {
            if (attrs.hasOwnProperty('mNumeric') && attrs.mNumeric === '') {
                return true;
            }

            return scope.numeric;
        }

        function setOrder() {
            scope.$applyAsync(function () {
                if (!isActive()) {
                    headCtrl.order = scope.getDirection() === 'm-asc' ? scope.orderBy : '-' + scope.orderBy;
                } else {
                    headCtrl.order = scope.getDirection() === 'm-asc' ? '-' + scope.orderBy : scope.orderBy;
                }

                if (angular.isFunction(headCtrl.onReorder)) {
                    headCtrl.onReorder(headCtrl.order);
                }
            });
        }

        function updateColumn(index, column) {
            tableCtrl.$$columns[index] = column;

            if (column.numeric) {
                element.addClass('m-numeric');
            } else {
                element.removeClass('m-numeric');
            }
        }

        scope.getDirection = function () {
            if (!isActive()) {
                return attrs.hasOwnProperty('mDesc') ? 'm-desc' : 'm-asc';
            }

            return headCtrl.order === '-' + scope.orderBy ? 'm-desc' : 'm-asc';
        };

        scope.$watch(isActive, function (active) {
            if (active) {
                element.addClass('m-active');
            } else {
                element.removeClass('m-active');
            }
        });

        scope.$watch(getIndex, function (index) {
            updateColumn(index, { 'numeric': isNumeric() });
        });

        scope.$watch(isNumeric, function (numeric) {
            updateColumn(getIndex(), { 'numeric': numeric });
        });

        scope.$watch('orderBy', function (orderBy) {
            if (orderBy) {
                enableSorting();
            } else {
                disableSorting();
            }
        });
    }


}

mColumn.$inject = ['$compile'];