import React, { useRef } from "react";
import "./styles.css";
interface Props {
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    addHandler:(e:React.FormEvent)=> void
}
const InputFeild:React.FC<Props> = ({todo,setTodo,addHandler}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    
    return (
    <form className="input" onSubmit={(e)=> {
        addHandler(e)
        inputRef.current?.blur();
        }}>
      <input
        ref={inputRef}
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        className="input__box"
        type="text"
        placeholder="Enter the text"
      />
      <button className="input_submit" type="submit">Submit</button>
    </form>
  );
}

export default InputFeild;
