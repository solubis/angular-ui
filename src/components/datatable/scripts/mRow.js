angular.module('m.data.table').directive('mRow', mRow);

function mRow() {

    return {
        compile: compile,
        require: '^^mTable',
        restrict: 'EA'
    };

    function compile(tElement) {
        tElement.addClass('m-row');
        return postLink;
    }

    function postLink(scope, element, attrs, tableCtrl) {
        function enableRowSelection() {
            return tableCtrl.$$rowSelect;
        }

        function isBodyRow() {
            return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
        }

        if (isBodyRow()) {
            scope.$watch(enableRowSelection, function (enable) {
                if (enable && !attrs.mSelect) {
                    console.error('Missing m-select attribute on table row');
                }
            });
        }
    }
}