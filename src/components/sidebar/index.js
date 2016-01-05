import './sidebar.scss';
import {sidebarToggle, submenuToggle} from './sidebar';

angular.module('angular-ui')
    .directive('sidebarToggle', sidebarToggle)
    .directive('toggleSubmenu', submenuToggle)