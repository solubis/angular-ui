angular.module('m.data.table').directive('mTable', mTable);

function Hash() {
    var keys = {};

    this.equals = function (key, item) {
        return keys[key] === item;
    };

    this.get = function (key) {
        return keys[key];
    };

    this.has = function (key) {
        return keys.hasOwnProperty(key);
    };

    this.purge = function (key) {
        delete keys[key];
    };

    this.update = function (key, item) {
        keys[key] = item;
    };
}

function mTable() {

    return {
        bindToController: true,
        compile: compile,
        controller: Controller,
        controllerAs: '$mTable',
        restrict: 'EA',
        scope: {
            progress: '=?mProgress',
            selected: '=ngModel',
            rowSelect: '=mRowSelect'
        }
    };

    function compile(tElement, tAttrs) {
        tElement.addClass('m-table');

        if (tAttrs.hasOwnProperty('mProgress')) {
            var body = tElement.find('tbody').eq(0)[0];
            var progress = angular.element('<thead class="m-table-progress">');

            if (body) {
                tElement[0].insertBefore(progress[0], body);
            }
        }
    }

    Controller.$inject = ['$attrs', '$element', '$q', '$scope'];

    function Controller($attrs, $element, $q, $scope) {
        var ctrl = this;
        var queue = [];
        var watchListener;
        var modelChangeListeners = [];

        ctrl.$$hash = new Hash();
        ctrl.$$columns = {};

        function enableRowSelection() {
            ctrl.$$rowSelect = true;

            watchListener = $scope.$watchCollection('$mTable.selected', function (selected) {
                modelChangeListeners.forEach(function (listener) {
                    listener(selected);
                });
            });

            $element.addClass('m-row-select');
        }

        function disableRowSelection() {
            ctrl.$$rowSelect = false;

            if (angular.isFunction(watchListener)) {
                watchListener();
            }

            $element.removeClass('m-row-select');
        }

        function resolvePromises() {
            if (!queue.length) {
                return $scope.$applyAsync();
            }

            queue[0].then(function () {
                queue.shift();
                resolvePromises();
            });
        }

        function rowSelect() {
            if ($attrs.hasOwnProperty('mRowSelect') && $attrs.mRowSelect === '') {
                return true;
            }

            return ctrl.rowSelect;
        }

        function validateModel() {
            if (!ctrl.selected) {
                console.error('Row selection: ngModel is not defined.');

                return;
            }

            if (!angular.isArray(ctrl.selected)) {
                console.error('Row selection: Expected an array. Recived ' + typeof ctrl.selected + '.');

                return;
            }

            return true;
        }

        ctrl.columnCount =  () =>
             ctrl.getRows($element[0]).reduce( (count, row) =>
                 row.cells.length > count ? row.cells.length : count
            , 0);
        ;

        ctrl.getRows = (element) => {
            return Array.from(element.rows).filter((row) => !row.classList.contains('ng-leave'));
        };

        ctrl.getBodyRows =  () => {
            return Array.from($element.prop('tBodies')).reduce((result, tbody) => result.concat(ctrl.getRows(tbody)), []);
        };

        ctrl.getElement = () => $element;

        ctrl.getHeaderRows = () => ctrl.getRows($element.prop('tHead'));

        ctrl.waitingOnPromise = function () {
            return !!queue.length;
        };

        ctrl.queuePromise = function (promise) {
            if (!promise) {
                return;
            }

            if (queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
                resolvePromises();
            }
        };

        ctrl.registerModelChangeListener = function (listener) {
            modelChangeListeners.push(listener);
        };

        ctrl.removeModelChangeListener = function (listener) {
            var index = modelChangeListeners.indexOf(listener);

            if (index !== -1) {
                modelChangeListeners.splice(index, 1);
            }
        };

        if ($attrs.hasOwnProperty('mProgress')) {
            $scope.$watch('$mTable.progress', ctrl.queuePromise);
        }

        $scope.$watch(rowSelect, function (enable) {
            if (enable && !!validateModel()) {
                enableRowSelection();
            } else {
                disableRowSelection();
            }
        });
    }
}