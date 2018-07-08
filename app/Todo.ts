import { observable } from 'mobx';

/**
 * Tener un observableArray en TodoStore no hace que los elementos de adentro sean observables,
 * estos tambien tienen que definir cuales son sus propiedades observables.
 * Si cambiamos el 'value', la vista no se actualiza, pero si cambiamos el 'completed' si
 */
export default class Todo {
    id : number
    value : string
    @observable completed : boolean
    @observable modifiedDate : Date

    constructor(value : string) {
        this.value = value;
        this.id = Math.random();
        this.completed = false;
        this.modifiedDate = new Date();
    }

    toString() {
        return this.value;
    }
}