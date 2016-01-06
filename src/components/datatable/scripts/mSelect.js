angular.module('m.data.table').directive('mSelect', mSelect);

function mSelect($compile) {

    return {
        bindToController: true,
        controller: angular.noop,
        controllerAs: '$mSelect',
        link: postLink,
        require: ['mSelect', '^^mTable'],
        restrict: 'A',
        scope: {
            id: '@mSelectId',
            model: '=mSelect',
            disabled: '=ngDisabled',
            onSelect: '=?mOnSelect',
            onDeselect: '=?mOnDeselect',
            autoSelect: '=mAutoSelect'
        }
    };

    function postLink(scope, element, attrs, ctrls) {
        var selfCtrl = ctrls.shift();
        var tableCtrl = ctrls.shift();

        if (tableCtrl.$$rowSelect && selfCtrl.id && tableCtrl.$$hash.has(selfCtrl.id)) {
            var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(selfCtrl.id));

            // if the item is no longer selected remove it
            if (index === -1) {
                tableCtrl.$$hash.purge(selfCtrl.id);
            }

            // if the item is not a reference to the current model update the reference
            else if (!tableCtrl.$$hash.equals(selfCtrl.id, selfCtrl.model)) {
                tableCtrl.$$hash.update(selfCtrl.id, selfCtrl.model);
                tableCtrl.selected.splice(index, 1, selfCtrl.model);
            }
        }

        selfCtrl.isSelected = function () {
            if (!tableCtrl.$$rowSelect || selfCtrl.disabled) {
                return false;
            }

            if (selfCtrl.id) {
                return tableCtrl.$$hash.has(selfCtrl.id);
            }

            return tableCtrl.selected.indexOf(selfCtrl.model) !== -1;
        };

        selfCtrl.select = function () {
            if (selfCtrl.disabled) {
                return;
            }

            tableCtrl.selected.push(selfCtrl.model);

            if (angular.isFunction(selfCtrl.onSelect)) {
                selfCtrl.onSelect(selfCtrl.model);
            }
        };

        selfCtrl.deselect = function () {
            tableCtrl.selected.splice(tableCtrl.selected.indexOf(selfCtrl.model), 1);

            if (angular.isFunction(selfCtrl.onDeselect)) {
                selfCtrl.onDeselect(selfCtrl.model);
            }
        };

        selfCtrl.toggle = function (event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }

            return selfCtrl.isSelected() ? selfCtrl.deselect() : selfCtrl.select();
        };

        function autoSelect() {
            if (attrs.hasOwnProperty('mAutoSelect') && attrs.mAutoSelect === '') {
                return true;
            }

            return selfCtrl.autoSelect;
        }

        function createCheckbox() {
            var checkbox = angular.element('<m-checkbox>');

            checkbox.attr('aria-label', 'Select Row');
            checkbox.attr('ng-click', '$mSelect.toggle($event)');
            checkbox.attr('ng-checked', '$mSelect.isSelected()');
            checkbox.attr('ng-disabled', '$mSelect.disabled');

            return angular.element('<td class="m-cell m-checkbox-cell">').append($compile(checkbox)(scope));
        }

        function disableSelection() {
            Array.prototype.some.call(element.children(), function (child) {
                return child.classList.contains('m-checkbox-cell') && element[0].removeChild(child);
            });

            if (autoSelect()) {
                element.off('click', toggle);
            }
        }

        function enableSelection() {
            element.prepend(createCheckbox());

            if (autoSelect()) {
                element.on('click', toggle);
            }
        }

        function enableRowSelection() {
            return tableCtrl.$$rowSelect;
        }

        function onSelectChange(selected) {
            if (!selfCtrl.id) {
                return;
            }

            if (tableCtrl.$$hash.has(selfCtrl.id)) {
                // check if the item has been deselected
                if (selected.indexOf(tableCtrl.$$hash.get(selfCtrl.id)) === -1) {
                    tableCtrl.$$hash.purge(selfCtrl.id);
                }

                return;
            }

            // check if the item has been selected
            if (selected.indexOf(selfCtrl.model) !== -1) {
                tableCtrl.$$hash.update(selfCtrl.id, selfCtrl.model);
            }
        }

        function toggle(event) {
            scope.$applyAsync(function () {
                selfCtrl.toggle(event);
            });
        }

        scope.$watch(enableRowSelection, function (enable) {
            if (enable) {
                enableSelection();
            } else {
                disableSelection();
            }
        });

        scope.$watch(autoSelect, function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            if (tableCtrl.$$rowSelect && newValue) {
                element.on('click', toggle);
            } else {
                element.off('click', toggle);
            }
        });

        scope.$watch(selfCtrl.isSelected, function (isSelected) {
            return isSelected ? element.addClass('m-selected') : element.removeClass('m-selected');
        });

        tableCtrl.registerModelChangeListener(onSelectChange);

        element.on('$destroy', function () {
            tableCtrl.removeModelChangeListener(onSelectChange);
        });
    }
}

mSelect.$inject = ['$compile'];