
function mRipple() {
    return {
        restrict: 'A',
        link: postLink
    };
}

function postLink(scope, element, attrs) {
    let x, y, size, center, config;

    if (attrs.mRipple) {
        let coordinates = attrs.mRipple.split(',');

        if (coordinates[0] === 'static'){
            coordinates[0] = 0;
        }

        config = {};
        config.left = Number(coordinates[0]);
        config.top = Number(coordinates[1]) || config.left;
        config.size = 30;
    }

    element.on('touchend mouseup', handler);

    element[0].style.position = 'relative';

    scope.$on('$destroy', function () {
        element.off('touchend mouseup', handler);
    });

    function handler(event) {
        let rippleContainer = this.querySelector('.m-ripple-container');

        if (this.getAttribute('disabled')) {
            return;
        }

        if (rippleContainer === null) {
            // Create ripple
            rippleContainer = document.createElement('span');
            rippleContainer.className += ' m-ripple-container';

            // Prepend ripple to element
            this.insertBefore(rippleContainer, this.firstChild);

            // Set ripple size
            if (!rippleContainer.offsetHeight && !rippleContainer.offsetWidth) {
                size = config.size || Math.max(this.offsetWidth, this.offsetHeight);
                rippleContainer.style.width = size + 'px';
                rippleContainer.style.height = size + 'px';
            }
        }

        // Remove animation effect
        rippleContainer.className = rippleContainer.className.replace(/ ?(animate)/g, '');

        // get click coordinates by event type
        if (event.type === 'mouseup') {
            if (config) {
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

        if (config) {
            center = { left: config.left, top: config.top };
        } else {
            center = getRippleCenter(element[0], x, y, size);
        }

        rippleContainer.style.left = center.left + 'px';
        rippleContainer.style.top = center.top + 'px';

        // Add animation effect
        rippleContainer.className += ' animate';
    }
}

export default mRipple;