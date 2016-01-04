import {Component, Inject} from 'angular-components';

@Component({
    selector: 'datatable',
    templateUrl: 'html/datatable.html'
})
class Datatable {

    data: any = [];
    count: number;
    columns: any[] = [{ name: 'Name', orderBy: 'name' }, { name: 'Description' }];
    filter: any = { options: { debounce: 500 } };
    selected: any[] = [];
    query: any = { filter: '', order: 'name', limit: 5, page: 1 };

    constructor(
        @Inject('$element') element) {

        for (let i = 0; i < 100; i++) {
            this.data.push({ id: i, name: `Name ${i}`, description: `Description of element ${i}` })
        }

        this.count = this.data.length;
    }

    edit(item) {
    }

    delete() {
    }

}
