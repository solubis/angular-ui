'use strict';

angular.module('m.data.table').directive('mSelect', mSelect);

function mSelect($compile) {

  // empty controller to be bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();

    if(tableCtrl.$$rowSelect && self.id && tableCtrl.$$hash.has(self.id)) {
      var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));

      // if the item is no longer selected remove it
      if(index === -1) {
        tableCtrl.$$hash.purge(self.id);
      }

      // if the item is not a reference to the current model update the reference
      else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
        tableCtrl.$$hash.update(self.id, self.model);
        tableCtrl.selected.splice(index, 1, self.model);
      }
    }

    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect || self.disabled) {
        return false;
      }

      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }

      return tableCtrl.selected.indexOf(self.model) !== -1;
    };

    self.select = function () {
      if(self.disabled) {
        return;
      }

      tableCtrl.selected.push(self.model);

      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };

    self.deselect = function () {
      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);

      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };

    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }

      return self.isSelected() ? self.deselect() : self.select();
    };

    function autoSelect() {
      if(attrs.hasOwnProperty('mAutoSelect') && attrs.mAutoSelect === '') {
        return true;
      }

      return self.autoSelect;
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

      if(autoSelect()) {
        element.off('click', toggle);
      }
    }

    function enableSelection() {
      element.prepend(createCheckbox());

      if(autoSelect()) {
        element.on('click', toggle);
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }

      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        return;
      }

      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }

    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });

    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }

      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });

    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('m-selected') : element.removeClass('m-selected');
    });

    tableCtrl.registerModelChangeListener(onSelectChange);

    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }

  return {
    bindToController: true,
    controller: Controller,
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
}

mSelect.$inject = ['$compile'];