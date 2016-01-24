import {Component, Inject} from 'angular-components';

@Component({
    selector: 'tmn-counts',
    restrict: 'C'
})
class Count {

    constructor(
        @Inject('$element') private $element) {
            let text = $element[0].textContent;

            $element[0].style.fontSize = parseInt(text, 10) <= 100 ? '11px' : '8px';
    }
}