import templateUrl from '../templates/m-table-progress.html'

angular.module('m.data.table').directive('mTableProgress', mTableProgress);

function mTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mTable',
    restrict: 'C',
    scope: {},
    templateUrl: templateUrl
  };
}