import React from 'react';
import { render } from 'react-dom';
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

console.clear();
var todoClass;
const Title = () => {
  return (
    <div>
       <div>
          <h1>to-do</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input tracker
  let input;

  return (
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1" placeholder="add todo..." ref={node => {input = node;}}></input>
        <div class="input-group-append">
          <Button variant="primary btn-lg" onClick={() => {
            addTodo(input.value);
            input.value = '';
            }}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

const Todo = ({todo, remove, complete}) => {
  // Each Todo
  var variant = todo.completed ? 'light' : 'primary';
  return (<ListGroup.Item action variant={variant}><span class="glyphicon glyphicon-ok" onClick={()=>complete(todo.id)}></span>{todo.text}<span class="glyphicon glyphicon-remove" onClick={()=>remove(todo.id)}></span></ListGroup.Item>);
}

const TodoList = ({todos, remove, complete, hide}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} complete={complete}/>)
  });
  return (<div><Form.Check type="checkbox" onChange={() => hide()} label="Hide done" /><ListGroup>{todoNode}</ListGroup></div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [{text: 'first', id: 1, completed: false},
      {text: 'second', id: 2, completed: false},
      {text: 'third', id: 3, completed: false}]
    }
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val, id: window.id++, completed: false}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }
  handleComplete(id){
    const todo = this.state.data.find(todo => todo.id==id)
    todo.completed = !todo.completed;
    this.setState({data: this.state.data});
  }

  render(){
    // Render JSX
    todoClass = this.state.data.completed ? "done" : "undone";
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          complete={this.handleComplete.bind(this)}
        />
      </div>
    );
  }
}
render(<TodoApp />, document.getElementById('container'));