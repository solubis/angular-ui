import './ripple.scss';

angular.module('angular-ui').directive('mdRipple', mdRipple);

function mdRipple() {
    return {
        restrict: 'C',
        link: postLink
    };
}

function postLink(scope, element, attrs) {
    let x, y, size, center;

    element.on('touchend mouseup', handler);

    scope.$on('$destroy', function () {
        element.off('touchend mouseup', handler);
    });

    function handler(event) {
        let rippleContainer = this.querySelector('.md-ripple-container');

        if (rippleContainer === null) {
            // Create ripple
            rippleContainer = document.createElement('span');
            rippleContainer.className += ' md-ripple-container';

            // Prepend ripple to element
            this.insertBefore(rippleContainer, this.firstChild);

            // Set ripple size
            if (!rippleContainer.offsetHeight && !rippleContainer.offsetWidth) {
                size = Math.max(this.offsetWidth, this.offsetHeight);
                rippleContainer.style.width = size + 'px';
                rippleContainer.style.height = size + 'px';
            }
        }

        // Remove animation effect
        rippleContainer.className = rippleContainer.className.replace(/ ?(animate)/g, '');

        // get click coordinates by event type
        if (event.type === 'mouseup') {
            if (this.className.includes('md-ripple-center')) {
                let box = this.getBoundingClientRect();
                x = box.left + size / 2;
                y = box.top + size / 2;
            } else {
                x = event.pageX;
                y = event.pageY;
            }
        } else if (event.type === 'touchend') {
            try {
                let origEvent;

                if (typeof event.changedTouches !== 'undefined') {
                    origEvent = event.changedTouches[0];
                } else {
                    origEvent = event.originalEvent;
                }

                x = origEvent.pageX;
                y = origEvent.pageY;
            } catch (e) {
                // fall back to center of el
                x = rippleContainer.offsetWidth / 2;
                y = rippleContainer.offsetHeight / 2;
            }
        }

        // set new ripple position by click or touch position
        function getRippleCenter(element, x, y, size) {
            let documentElement = document.documentElement;
            let box = element.getBoundingClientRect();
            let top = box.top + window.pageYOffset - documentElement.clientTop;
            let left = box.left + window.pageXOffset - documentElement.clientLeft;

            left = (x - left - size / 2);
            top = (y - top - size / 2);

            console.log('Event (x,y), size', x, y, size);

            console.log('BoundingClientRect (top, right, bottom, left)', box.top, box.right, box.bottom, box.left);

            console.log('Center (top, left)', top, left);


            return { top: top, left: left };
        }

        center = getRippleCenter(element[0], x, y, size);

        rippleContainer.style.left = center.left + 'px';
        rippleContainer.style.top = center.top + 'px';

        // Add animation effect
        rippleContainer.className += ' animate';
    }
}