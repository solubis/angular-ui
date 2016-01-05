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
            ngModel: '='
        },
        replace: true,
        link: function (scope, element, attrs) { },
        template: `
            <label class="checkbox md-ripple md-ripple-center">
                <input type="checkbox" ng-model="ngModel">
                <i class="input-helper"></i>
            </label>`
    }
}

export {checkbox, floatingLine, autosize};