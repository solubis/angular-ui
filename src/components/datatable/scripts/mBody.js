'use strict';

angular.module('m.data.table').directive('mBody', mBody);

function mBody() {

  function compile(tElement) {
    tElement.addClass('m-body');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}