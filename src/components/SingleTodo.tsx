import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import { GrStatusGood } from "react-icons/gr";
import { TodoReducer } from "./TodoReducer";
import { Draggable } from "react-beautiful-dnd";
type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const deleteHandler = (id: number) => {
    setTodos(TodoReducer(todos, { type: "remove", payload: id }));
  };
  const doneHandler = (id: number) => {
    setTodos(TodoReducer(todos, { type: "done", payload: id }));
  };
  const editHandler = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo.length == 0) return;
    setTodos(TodoReducer(todos, { type: "edit", payload: [id, editTodo] }));
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag':'' }`}
          onSubmit={(e) => {
            editHandler(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(true);
                }
              }}
            >
              <CiEdit />
            </span>
            <span className="icon" onClick={() => deleteHandler(todo.id)}>
              <CiCircleRemove />
            </span>
            <span className="icon" onClick={() => doneHandler(todo.id)}>
              <GrStatusGood />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
