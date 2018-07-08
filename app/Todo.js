import { observable } from 'mobx';

/**
 * Tener un observableArray en TodoStore no hace que los elementos de adentro sean observables,
 * estos tambien tienen que definir cuales son sus propiedades observables.
 * Si cambiamos el 'value', la vista no se actualiza, pero si cambiamos el 'completed' si
 */
export default class Todo {
    id
    value
    @observable completed

    constructor(value) {
        this.value = value;
        this.id = Math.random();
        this.completed = false;
    }

    toString() {
        return this.value;
    }
}