angular.module('m.data.table').directive('mCell', mCell);

function mCell() {

    return {
        controller: Controller,
        compile: compile,
        require: ['mCell', '^^mTable'],
        restrict: 'EA'
    };

    function compile(tElement) {
        var select = tElement.find('m-select');

        if (select.length) {
            select.addClass('m-table-select').attr('m-container-class', 'm-table-select');
        }

        tElement.addClass('m-cell');

        return postLink;
    }

    // empty controller to be bind properties to in postLink function
    function Controller() {

    }

    function postLink(scope, element, attrs, ctrls) {
        var select = element.find('m-select');
        var cellCtrl = ctrls.shift();
        var tableCtrl = ctrls.shift();

        if (attrs.ngClick) {
            element.addClass('m-clickable');
        }

        if (select.length) {
            select.on('click', function (event) {
                event.stopPropagation();
            });

            element.addClass('m-clickable').on('click', function (event) {
                event.stopPropagation();
                select[0].click();
            });
        }

        cellCtrl.getTable = tableCtrl.getElement;

        function getColumn() {
            return tableCtrl.$$columns[getIndex()];
        }

        function getIndex() {
            return Array.prototype.indexOf.call(element.parent().children(), element[0]);
        }

        scope.$watch(getColumn, function (column) {
            if (!column) {
                return;
            }

            if (column.numeric) {
                element.addClass('m-numeric');
            } else {
                element.removeClass('m-numeric');
            }
        });
    }
}