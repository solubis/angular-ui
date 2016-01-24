import {Component, Inject} from 'angular-components';

import './card.scss';

@Component({
    selector: 'card'
})
class Card {

    constructor(
        @Inject('$element') private $element,
        @Inject('reveal') private reveal) {

        reveal.sync();
    }
}

@Component({
    selector: 'card-toggle',
    require: '^card'
})
class CardToggle {

    link(scope, element, attrs, cardController) {
        let cardElement = cardController.$element[0];

        element.on('click', () => {
            cardElement.classList.toggle('expanded');
        });
    }
}
