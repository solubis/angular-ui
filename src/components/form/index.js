import './form.scss';
import {floatingLine, autosize, checkbox} from './form';

angular.module('angular-ui')
    .directive('fgLine', floatingLine)
    .directive('autoSize', autosize)
    .directive('mdCheckbox', checkbox)
