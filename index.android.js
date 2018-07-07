import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TodoList from './app/TodoList.native';
import TestOne from './app/TestOne.native';
import TestTwo from './app/TestTwo.native';

export default class MobxTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TestOne />
        <TestTwo />
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
