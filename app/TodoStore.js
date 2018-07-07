import { observable, computed } from 'mobx';

class TodoStore {
    @observable todos = ['buy milk', 'buy eggs'];
    @observable filter = '';
    
    previousFilteredTodos = [];
    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, 'i');
        let filtered = this.todos.filter(todo => !this.filter || matchesFilter.test(todo));

        // Start Check
        // Si el nuevo valor es igual al anterior retornamos el anterior y de esta manera
        // no se ejecuta el render() del componente que lo observa.
        // Esto es performante solo en algunos casos, a veces ejecutar el render() es menos costoso.
        // En este caso conviene porque es un array con 2 strings.
        // Vease: https://facebook.github.io/react-native/docs/performance.html#js-fps-plunges-when-re-rendering-a-view-that-hardly-changes
        // "if you have to do a deep comparison of a large list of objects, it may be that re-rendering your entire component would be quicker, and it would certainly require less code."
        if (filtered.length == this.previousFilteredTodos.length) {
            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i] != this.previousFilteredTodos[i]) {
                    break;
                }

                if (i == filtered.length - 1) {
                    filtered = this.previousFilteredTodos;
                }
            }
        }

        this.previousFilteredTodos = filtered;
        // End Check

        return filtered;
    }

    @observable secondFilter = '';

    @computed get secondFilteredTodos() {
        const matchesFilter = new RegExp(this.secondFilter, 'i');
        return this.todos.filter(todo => !this.secondFilter || matchesFilter.test(todo));
    }
}

const store = new TodoStore();

export default store;