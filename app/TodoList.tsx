import React from 'react';
import {
    Text,
    View,
    TextInput,
    Button
  } from 'react-native';

import { observer } from 'mobx-react';

import store from './TodoStore';

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
        </View>
    }
}