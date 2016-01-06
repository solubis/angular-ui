angular.module('m.data.table').directive('mFoot', mFoot);

function mFoot() {

  function compile(tElement) {
    tElement.addClass('m-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}