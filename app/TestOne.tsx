import React from 'react';
import {
    Text,
    View,
  } from 'react-native';

import { observer } from 'mobx-react';

import store from './TodoStore';

/**
 * Este componente solo se debe actualizar si cambia el "todos" del Store,
 * pero por ejemplo si cambia el filtro, no debe ejecutar el render()
 * por mas que use el mismo Store
 */

@observer
export default class TestOne extends React.Component {
    render() {
        console.warn('Two One');
        return <View>
            <Text>Todos: {store.todos.toString()}</Text>
        </View>
    }
}