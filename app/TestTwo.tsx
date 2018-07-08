import React from 'react';
import {
    Text,
    View,
  } from 'react-native';

import { observer } from 'mobx-react';

import store from './TodoStore';

/**
 * Este componente deberia actualizar el filter cuando el componente TodoList lo actualiza.
 * Es decir que Store y los cambios sobre el mismo son compartidos
 */

@observer
export default class TestTwo extends React.Component {
    render() {
        console.warn('Test Two');
        return <View>
            <Text>Filter: {store.filter}</Text>
        </View>
    }
}