import React, { useState } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { TodoReducer } from "./components/TodoReducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const addHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos(TodoReducer(todos, { type: "add", payload: todo }));
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result)
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;
      if(source.droppableId === 'TodosList'){
        add=active[source.index]
        active.splice(source.index,1)
      }
      else{
        add=complete[source.index]
        complete.splice(source.index,1)
      }
      if(destination.droppableId === 'TodosList'){
        active.splice(destination.index,0,add)
      }else {
        complete.splice(destination.index,0,add)
      }
      setCompletedTodos(complete)
      setTodos(active)
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskmaker</span>
        <InputFeild todo={todo} setTodo={setTodo} addHandler={addHandler} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
