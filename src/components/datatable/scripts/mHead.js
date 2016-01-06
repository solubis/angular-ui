angular.module('m.data.table').directive('mHead', mHead);

function mHead($compile) {

  function compile(tElement) {
    tElement.addClass('m-head');
    return postLink;
  }

  // empty controller to be bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, tableCtrl) {

    function attachCheckbox() {
      var children = element.children();

      // append an empty cell to preceding rows
      for(var i = 0; i < children.length - 1; i++) {
        children.eq(i).prepend('<th class="m-column">');
      }

      children.eq(children.length - 1).prepend(createCheckBox());
    }

    function createCheckBox() {
      var checkbox = angular.element('<m-checkbox>');

      checkbox.attr('aria-label', 'Select All');
      checkbox.attr('ng-click', 'toggleAll()');
      checkbox.attr('ng-checked', 'allSelected()');

      return angular.element('<th class="m-column m-checkbox-column">').append($compile(checkbox)(scope));
    }

    function getController(row) {
      return angular.element(row).controller('mSelect');
    }

    function removeCheckbox() {
      var children = element.children();
      var child = children.eq(children.length - 1);

      Array.prototype.some.call(child.prop('cells'), function (cell) {
        return cell.classList.contains('m-checkbox-column') && child[0].removeChild(cell);
      });
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    scope.allSelected = function () {
      var rows = tableCtrl.getBodyRows();

      return rows.length && rows.map(getController).every(function (ctrl) {
        return ctrl && (ctrl.disabled || ctrl.isSelected());
      });
    };

    scope.selectAll = function () {
      tableCtrl.getBodyRows().map(getController).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };

    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };

    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(getController).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        attachCheckbox();
      } else {
        removeCheckbox();
      }
    });
  }

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mHead',
    require: '^^mTable',
    restrict: 'A',
    scope: {
      order: '=?mOrder',
      onReorder: '=?mOnReorder'
    }
  };
}

mHead.$inject = ['$compile'];