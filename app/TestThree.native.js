import React from 'react';
import {
    Text,
    View,
    TextInput
  } from 'react-native';

import { observer } from 'mobx-react';

import store from './TodoStore';

/**
 * Este componente no se deberia actualizar si el "filter" cambia porque es
 * un valor computado que no usa la variable "filter"
 */

@observer
export default class TestThree extends React.Component {
    render() {
        console.warn('Test Three');
        return <View>
            <Text>Second Filtered Todos: {store.secondFilteredTodos.toString()}</Text>
        </View>
    }
}