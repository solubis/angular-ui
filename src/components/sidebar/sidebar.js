function sidebarToggle($timeout) {

    return {
        restrict: 'A',
        scope: {
            sidebarModelLeft: '=',
            sidebarModelRight: '=',
            sidebarToggle: '@'
        },

        link: function (scope, element, attr) {
            scope.$watch('sidebarModelLeft', function (value) {
                if (value) {
                    $(document).on('click', function (e) {
                        let sidebar = document.getElementById(scope.sidebarToggle);
                        if (($(e.target).closest(sidebar).length === 0) && ($(e.target).closest(element).length === 0)) {
                            $timeout(function () {
                                scope.sidebarModelLeft = false;
                            });
                        }
                    });
                }
            })

            element.on('click', function () {

                if (typeof scope.sidebarModelLeft !== 'undefined') {
                    if (scope.sidebarModelLeft === false) {
                        scope.$apply(function () {
                            scope.sidebarModelLeft = true;
                        })
                    }
                    else {
                        scope.$apply(function () {
                            scope.sidebarModelLeft = false;
                        })
                    }
                }

                if (typeof scope.sidebarModelRight !== 'undefined') {
                    if (scope.sidebarModelRight === false) {
                        scope.$apply(function () {
                            scope.sidebarModelRight = true;
                        })
                    }
                    else {
                        scope.$apply(function () {
                            scope.sidebarModelRight = false;
                        })
                    }
                }
            })
        }
    }

}

function submenuToggle() {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                element.next().slideToggle(200);
                element.parent().toggleClass('toggled');
            });
        }
    }
}

export {submenuToggle, sidebarToggle};