import 'animate.css/animate.css';
import 'bootstrap-sweetalert/lib/sweet-alert.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';

import 'jquery';
import 'chosen-npm/public/chosen.jquery';
import 'bootstrap-sweetalert/lib/sweet-alert.js';
import 'bootstrap-notify';

import malihu from 'malihu-custom-scrollbar-plugin';
import Waves from 'node-waves';
import autosize from 'autosize';

malihu($)
window.Waves = Waves;
window.autosize = autosize;

import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-loading-bar';
import 'angular-chosen/chosen';
import './module';
import './templates';
import './form';
import './components';
import './charts/flot';
import './charts/other-charts';