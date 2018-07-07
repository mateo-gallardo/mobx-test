import { observable, computed } from 'mobx';

class TodoStore {
    @observable todos = ['buy milk', 'buy eggs'];
    @observable filter = '';
    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo));
    }
    @observable secondFilter = '';

    @computed get secondFilteredTodos() {
        const matchesFilter = new RegExp(this.secondFilter, 'i');
        return this.todos.filter(todo => !this.secondFilter || matchesFilter.test(todo));
    }
}

const store = new TodoStore();

export default store;