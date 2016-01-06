import './form.scss';
import {floatingLine, autosize, checkbox, radiobutton} from './form';

angular.module('angular-ui')
    .directive('fgLine', floatingLine)
    .directive('autoSize', autosize)
    .directive('mCheckbox', checkbox)
    .directive('mRadio', radiobutton)
