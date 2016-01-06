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
        scope: {
            model: '=ngModel',
            name: '@',
            disabled: '=ngDisabled',
            click: '&ngClick',
            checked: '=ngChecked'
        },
        bindToController: true,
        replace: true,
        transclude: true,
        controllerAs: 'ctrl',
        controller: function ($scope, $element, $transclude) {
            $element.find('i').after($transclude());
        },
        template: `
            <label class="checkbox" m-ripple="static" ng-class="{disabled: ctrl.disabled}">
                <input  type="checkbox" name="{{ctrl.name}}"
                        ng-model="ctrl.model"
                        ng-click="ctrl.click"
                        ng-checked="ctrl.checked"
                        ng-disabled="ctrl.disabled">
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
            value: '@',
            disabled: '=ngDisabled'
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
            element.find('i').after(transclude());
        },
        template: `
            <label class="radio" m-ripple="static" ng-class="{disabled: disabled}">
                <input type="radio" name="{{name}}" value="{{value}}" ng-model="model" ng-disabled="disabled">
                <i class="input-helper"></i>
            </label>`
    }
}

export {checkbox, floatingLine, autosize, radiobutton};