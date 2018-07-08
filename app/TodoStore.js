import { observable, computed } from 'mobx';
import Todo from './Todo';

const arrayEquals = (newArray, oldArray) => {
    if (newArray.length == oldArray.length) {
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] != oldArray[i]) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

class TodoStore {
    @observable todos = [new Todo('buy milk'), new Todo('buy eggs')];
    @observable filter = '';

    /**
     * Si el nuevo valor es igual al anterior retornamos el anterior y de esta manera
     * no se ejecuta el render() del componente que lo observa.
     * Esto es performante solo en algunos casos, a veces ejecutar el render() es menos costoso.
     * En este caso conviene porque es un array con 2 strings.
     * Vease: https://facebook.github.io/react-native/docs/performance.html#js-fps-plunges-when-re-rendering-a-view-that-hardly-changes
     * "if you have to do a deep comparison of a large list of objects, it may be that re-rendering your entire component would be quicker, and it would certainly require less code."
     * 
     * Tambien se puede usar: comparer.identity, comparer.default o comparer.structural de Mobx
     */
    @computed({ equals: arrayEquals }) get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value));
    }

    @observable secondFilter = '';

    @computed get secondFilteredTodos() {
        const matchesFilter = new RegExp(this.secondFilter, 'i');
        return this.todos.filter(todo => !this.secondFilter || matchesFilter.test(todo.value));
    }
}

const store = new TodoStore();

export default store;