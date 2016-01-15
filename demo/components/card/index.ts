import {Component, Inject} from 'angular-components';
import './card.scss';

@Component({
    selector: 'card',
    template: require('./card.jade')
})
class Card {

    isExpanded: boolean = false;

    constructor(
        @Inject('$element') private $element,
        @Inject('reveal') private reveal) {
            reveal.sync();
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

}
