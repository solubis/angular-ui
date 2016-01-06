function floatingLine() {
    return {
        restrict: 'C',
        link: function (scope, element) {
            let input = element.find('input');
            let parent = element.parent();

            input.on('focus', function () {
                element.addClass('fg-toggled');
            })

            input.on('blur', function () {
                let value = input.val();

                if (parent.hasClass('fg-float')) {
                    if (value.length === 0) {
                        element.removeClass('fg-toggled');
                    }
                } else {
                    element.removeClass('fg-toggled');
                }
            })
        }
    }
}

function autosize() {
    return {
        restrict: 'A',
        link: function (scope, element) {
            if (element[0]) {
                autosize(element);
            }
        }
    }
}


function checkbox() {
    return {
        restrict: 'EA',
        scope: {},
        bindToController: {
            model: '=ngModel',
            name: '@',
            disabled: '@ngDisabled'
        },
        replace: true,
        transclude: true,
        controllerAs: 'ctrl',
        controller: function ($scope, $element, $transclude) {
            let icon = $element.find('i');
            icon.after($transclude());
        },
        template: `
            <label class="checkbox" m-ripple="0">
                <input type="checkbox" name="{{name}}" ng-model="ctrl.model" ng-disabled="{{disabled}}">
                <i class="input-helper"></i>
            </label>`
    }
}

function radiobutton() {
    return {
        restrict: 'EA',
        scope: {
            model: '=ngModel',
            name: '@',
            value: '@'
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
            element.find('i').after(transclude());
        },
        template: `
            <label class="radio" m-ripple="0">
                <input type="radio" name="{{name}}" value="{{value}}" ng-model="model">
                <i class="input-helper"></i>
            </label>`
    }
}

export {checkbox, floatingLine, autosize, radiobutton};