import React from 'react';
import {
    Text,
    View,
    TextInput
  } from 'react-native';

import { observer } from 'mobx-react';

import store from './TodoStore';

@observer
export default class TodoList extends React.Component {
    filter = (text) => {
        store.filter = text;
    }

    render() {
        console.warn('Todo List');
        const { filteredTodos } = store;
        return <View>
            <Text>Todo List</Text>
            <TextInput onChangeText={this.filter} />
            {filteredTodos.map(todo => {
                return <View key={todo}>
                    <Text>{todo}</Text>
                </View>
            })}
        </View>
    }
}