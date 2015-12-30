angular.module('angular-ui')

// =========================================================================
// GROWL
// =========================================================================

    .directive('growlDemo', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function notify(from, align, icon, type, animIn, animOut) {
                    $.notify({
                        icon: icon,
                        title: ' Bootstrap Growl ',
                        message: 'Turning standard Bootstrap alerts into awesome notifications',
                        url: ''
                    }, {
                            element: 'body',
                            type: type,
                            allow_dismiss: true,
                            placement: {
                                from: from,
                                align: align
                            },
                            offset: {
                                x: 20,
                                y: 85
                            },
                            className: 'btn-xs btn-inverse',
                            spacing: 10,
                            z_index: 1031,
                            delay: 500,
                            timer: 2000,
                            url_target: '_blank',
                            mouse_over: false,
                            animate: {
                                enter: animIn,
                                exit: animOut
                            },
                        });
                }

                element.on('click', function (e) {
                    e.preventDefault();

                    var nFrom = attrs.from;
                    var nAlign = attrs.align;
                    var nIcons = attrs.icon;
                    var nType = attrs.type;
                    var nAnimIn = attrs.animationIn;
                    var nAnimOut = attrs.animationOut;

                    notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);

                })


            }
        }
    })


//==============================================
// BOOTSTRAP GROWL
//==============================================

    .factory('growlService', function () {
        var gs = {};
        gs.growl = function (message, type) {
            $.notify({
                message: message
            }, {
                    type: type,
                    allow_dismiss: false,
                    label: 'Cancel',
                    className: 'btn-xs btn-inverse',
                    placement: {
                        from: 'top',
                        align: 'right'
                    },
                    delay: 2500,
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    offset: {
                        x: 20,
                        y: 85
                    }
                });
        }

        return gs;
    })