import React from 'react';
import {connect} from 'react-redux'

import {addTodo,deleteTodos} from '../actions'

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

var TodoItem = connect()(React.createClass({
  //Since the delete action needs to dispatch an action we need a store, so wrapp all the store in the connect
  deleteToDo(){
    this.props.dispatch(deleteTodos(this.props.id))
  },
  render() {
    return(
      <TouchableOpacity onPress={this.deleteToDo}>
        <View style={styles.todoContainer}>
          <Text styele={styles.todoText}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>

    )
  }
}))

var Main = React.createClass({
  getInitialState(){
    return {
      newTodoText: ""
    }
  },
  addNewTodo(){
    var {newTodoText} = this.state;
    console.log({newTodoText});
    if(newTodoText && newTodoText != ""){
      this.setState({
        newTodoText:""
      })
      this.props.dispatch(addTodo(newTodoText))
      console.log(newTodoText);
    }
  },
  render(){
    var renderToDos = () => {
      return this.props.todos.map((todo)=>{
        return (
          <TodoItem text={todo.text} key={todo.id} id={todo.id}></TodoItem>
        )
      })
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.topBar}>
          <Text style={styles.title}>
            To-do list
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChange={(event) => {
              this.setState({
                newTodoText :event.nativeEvent.text
              })
            }}
            value={this.state.newTodoText}
            returnKeyType="done"
            onSubmitEditing={this.addNewTodo}
            style={styles.input}
            placeholder="Type here to translate!">
          </TextInput>
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          {renderToDos()}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar : {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    padding: 8,
    paddingTop: 0,
    backgroundColor: '#2ecc71'
  },
  input:{
    height: 26,
    padding: 4,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor:'white'
  },
  todoContainer:{
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: -1,
    borderColor: "#ccc",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  todoText:{

  },
});

var mapStateToProps = (state) => {
  return{
    todos: state.todos
  }
}

export default connect(mapStateToProps)(Main);
