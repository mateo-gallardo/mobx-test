import React from 'react';
import {
    Text,
    View,
    TextInput,
    Button
  } from 'react-native';

import { action } from 'mobx';
import { observer } from 'mobx-react';

import store from './TodoStore';

const delay = (ms : number) => new Promise<void>((resolve : Function) => setTimeout(resolve, ms || 1000));

@observer
export default class TodoList extends React.Component {
    filter = (text : string) => {
        store.filter = text;
    }

    completeBuyMilk = () => {
        store.todos[0].completed = true;
    }

    changeMilkToChicken = () => {
        store.todos[0].value = 'buy chicken';
    }

    /**
     * Si usamos action en el then o despues de un await, no se notifica a los componentes que observan las propiedades
     * hasta que todas sean actualizadas.
     */
    @action
    changeDateAndCompletedWithAction = () => {
        store.todos[0].completed = !store.todos[0].completed;
        store.todos[0].modifiedDate = new Date();
    }

    delayChangeDateAndCompletedWithAction = async () => {
        await delay(500);
        this.changeDateAndCompletedWithAction();
    }

    /**
     * Al no usar action, se llama al render() 2 veces
     */
    delayChangeDateAndCompletedWithoutAction = async () => {
        await delay(500);
        store.todos[0].completed = !store.todos[0].completed;
        store.todos[0].modifiedDate = new Date();
    }

    render() {
        console.warn('Todo List');
        const { filteredTodos } = store;
        return <View>
            <Text>Todo List</Text>
            <TextInput onChangeText={this.filter} />
            {filteredTodos.map(todo => {
                return <View key={todo.id} style={{ flexDirection: 'row' }}>
                    <Text>{todo.value}</Text>
                    <Text> - {todo.completed ? 'completed' : 'not completed'}</Text>
                    <Text> - {todo.modifiedDate.toLocaleTimeString()}</Text>
                </View>
            })}
            <View style={{height: 5}} />
            <Button
                onPress={this.completeBuyMilk}
                title="Complete Buy Milk"
            />
            <View style={{height: 5}} />
            <Button
                onPress={this.changeMilkToChicken}
                title="Change Milk to Chicken (doesn't work immediately)"
            />
            <View style={{height: 5}} />
            <Button
                onPress={this.delayChangeDateAndCompletedWithAction}
                title="Change Date and Completed (optimized)"
            />
            <View style={{height: 5}} />
            <Button
                onPress={this.delayChangeDateAndCompletedWithoutAction}
                title="Change Date and Completed (unoptimized)"
            />
        </View>
    }
}