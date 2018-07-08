import React from 'react';
import { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { configure } from 'mobx';
// Uncomment in a real world application
//configure({ enforceActions: true });

import TodoList from './app/TodoList';
import TestOne from './app/TestOne';
import TestTwo from './app/TestTwo';
import TestThree from './app/TestThree';

export default class MobxTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TestOne />
        <TestTwo />
        <TestThree />
        <Text>************</Text>
        <TodoList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MobxTest', () => MobxTest);
