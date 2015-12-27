angular.module('angular-ui')


// =========================================================================
// SWEATALERT
// =========================================================================

//Basic
    .directive('swalBasic', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal("Here's a message!");
                });
            }
        }
    })

//A title with a text under
    .directive('swalText', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")

                });
            }
        }
    })

//Success Message
    .directive('swalSuccess', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")

                });
            }
        }
    })

//Warning Message
    .directive('swalWarning', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this imaginary file!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    }, function () {
                        swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    });
                });
            }
        }
    })

//Parameter
    .directive('swalParams', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this imaginary file!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {
                        if (isConfirm) {
                            swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        } else {
                            swal("Cancelled", "Your imaginary file is safe :)", "error");
                        }
                    });
                });
            }
        }
    })

//Custom Image
    .directive('swalImg', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal({
                        title: "Sweet!",
                        text: "Here's a custom image.",
                        imageUrl: "img/thumbs-up.png"
                    });
                });
            }
        }
    })

//Auto Close Timer
    .directive('swalTimer', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    swal({
                        title: "Auto close alert!",
                        text: "I will close in 2 seconds.",
                        timer: 2000,
                        showConfirmButton: false
                    });
                });
            }
        }
    })



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


// =========================================================================
// Malihu Scroll - Custom Scroll bars
// =========================================================================
    .factory('scrollService', function () {
        var ss = {};
        ss.malihuScroll = function scrollBar(selector, theme, mousewheelaxis) {
            $(selector).mCustomScrollbar({
                theme: theme,
                scrollInertia: 100,
                axis: 'yx',
                mouseWheel: {
                    enable: true,
                    axis: mousewheelaxis,
                    preventDefault: true
                }
            });
        }

        return ss;
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

// =========================================================================
// MALIHU SCROLL
// =========================================================================

//On Custom Class
    .directive('cOverflow', ['scrollService', function (scrollService) {
        return {
            restrict: 'C',
            link: function (scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    scrollService.malihuScroll(element, 'minimal-dark', 'y');
                }
            }
        }
    }])

// =========================================================================
// WAVES
// =========================================================================

// For .btn classes
    .directive('btn', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                if (element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                    Waves.attach(element, ['waves-circle']);
                }

                else if (element.hasClass('btn-light')) {
                    Waves.attach(element, ['waves-light']);
                }

                else {
                    Waves.attach(element);
                }

                Waves.init();
            }
        }
    })

// =========================================================================
// LAYOUT
// =========================================================================

    .directive('changeLayout', function () {

        return {
            restrict: 'A',
            scope: {
                changeLayout: '='
            },

            link: function (scope, element, attr) {

                //Default State
                if (scope.changeLayout === '1') {
                    element.prop('checked', true);
                }

                //Change State
                element.on('change', function () {
                    if (element.is(':checked')) {
                        localStorage.setItem('ma-layout-status', 1);
                        scope.$apply(function () {
                            scope.changeLayout = '1';
                        })
                    }
                    else {
                        localStorage.setItem('ma-layout-status', 0);
                        scope.$apply(function () {
                            scope.changeLayout = '0';
                        })
                    }
                })
            }
        }
    })



// =========================================================================
// MAINMENU COLLAPSE
// =========================================================================

    .directive('toggleSidebar', function () {

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },

            link: function (scope, element, attr) {
                element.on('click', function () {

                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function () {
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function () {
                                scope.modelLeft = false;
                            })
                        }
                    }

                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function () {
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function () {
                                scope.modelRight = false;
                            })
                        }

                    }
                })
            }
        }

    })



// =========================================================================
// SUBMENU TOGGLE
// =========================================================================

    .directive('toggleSubmenu', function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function () {
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        }
    })


// =========================================================================
// STOP PROPAGATION
// =========================================================================

    .directive('stopPropagate', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.preventDefault();
                });
            }
        }
    })


// =========================================================================
// PRINT
// =========================================================================

    .directive('print', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.click(function () {
                    window.print();
                })
            }
        }
    })
