'use strict';

import templateUrl from '../templates/md-table-pagination.html';

angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);

/*
return {
        restrict: 'E',
        scope: {},
        controller: 'FooDirCtrl',
        controllerAs: 'vm',
        bindToController: {
            name: '='
        },
        template: [
            '<div><input ng-model="vm.name"></div>'
        ].join(''),
        link: link
    };
*/


function mdTablePagination() {

    return {
        compile: compile,
        restrict: 'E',
        scope: {
            boundaryLinks: '=?mdBoundaryLinks',
            label: '@?mdLabel',
            limit: '=mdLimit',
            page: '=mdPage',
            pageSelect: '=?mdPageSelect',
            onPaginate: '=?mdOnPaginate',
            options: '=mdOptions',
            total: '@mdTotal'
        },
        templateUrl: templateUrl
    };

    function compile(tElement) {
        tElement.addClass('md-table-pagination');
        return postLink;
    }

    function postLink(scope, element, attrs) {
        scope.$label = angular.extend({
            page: 'Page:',
            rowsPerPage: 'Rows per page:',
            of: 'of'
        }, scope.$eval(scope.label) || {});

        function isPositive(number) {
            return number > 0;
        }

        function isZero(number) {
            return number === 0 || number === '0';
        }

        function onPaginationChange() {
            if (angular.isFunction(scope.onPaginate)) {
                scope.onPaginate(scope.config.page, scope.config.limit);
            }
        }

        scope.config = { page: scope.page, limit: scope.limit };

        scope.disableNext = function () {
            return isZero(scope.limit) || !scope.hasNext();
        };

        scope.first = function () {
            scope.config.page = 1;
            onPaginationChange();
        };

        scope.hasNext = function () {
            return scope.config.page * scope.config.limit < scope.total;
        };

        scope.hasPrevious = function () {
            return scope.config.page > 1;
        };

        scope.last = function () {
            scope.config.page = scope.pages();
            onPaginationChange();
        };

        scope.max = function () {
            return scope.hasNext() ? scope.config.page * scope.config.limit : scope.total;
        };

        scope.min = function () {
            return scope.config.page * scope.config.limit - scope.config.limit;
        };

        scope.next = function () {
            scope.config.page++;
            onPaginationChange();
        };

        scope.onPageChange = onPaginationChange;

        scope.pages = function () {
            return Math.ceil(scope.total / (isZero(scope.config.limit) ? 1 : scope.config.limit));
        };

        scope.previous = function () {
            scope.config.page--;
            onPaginationChange();
        };

        scope.range = function (total) {
            let array = [];

            total = isFinite(total) && isPositive(total) ? total : 1

            for (let i = 1; i <= total; i++) {
                array.push(i);
            }

            return array;
        };

        scope.showBoundaryLinks = function () {
            if (attrs.hasOwnProperty('mdBoundaryLinks') && attrs.mdBoundaryLinks === '') {
                return true;
            }

            return scope.boundaryLinks;
        };

        scope.showPageSelect = function () {
            if (attrs.hasOwnProperty('mdPageSelect') && attrs.mdPageSelect === '') {
                return true;
            }

            return scope.pageSelect;
        };

        scope.rowSelect = [10, 25, 50, 100];

        scope.$watch('config.page', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            scope.page = newValue;
        });

        scope.$watch('config.limit', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            scope.limit = newValue;

            // find closest page from previous min
            scope.config.page = Math.floor(((scope.config.page * oldValue - oldValue) + newValue) / (isZero(newValue) ? 1 : newValue));

            onPaginationChange();
        });
    }
}