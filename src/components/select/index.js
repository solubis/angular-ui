import 'chosen/chosen.jquery.js';
import 'chosen/chosen.css';

import './chosen-spinner.css';
import './chosen.scss';

import chosen from './chosen';

angular.module('angular-ui').directive('chosen', ['$timeout', chosen]);