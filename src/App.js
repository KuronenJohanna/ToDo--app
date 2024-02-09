import './App.css';
import React from "react"
import {nanoid} from "nanoid"

export default function App() {
  const [inputValue, setInputValue] = React.useState("")
  const [tasks, settasks] = React.useState([])
  

  function createnewtask() {
    const newTask = {
      id:nanoid(),
      body: inputValue,
      isDone: false
    }
  
    settasks(prevTasks => [...prevTasks, newTask])
    setInputValue("")
  
  }
  function handleChange(event) {
      const {name, value, type, checked} = event.target

      
      settasks(prevTasks => {
        return prevTasks.map(task => {
          if(task.id === name) {
            return {
          ...task,
          [type === "checkbox" ? "isDone" : name]: type === "checkbox" ? checked : value,
          time: type ==="checkbox" && checked ? new Date().toLocaleString() : task.time
            };
          }
          return task;
        });
      });

        if (name === "body") {
        setInputValue(value);
      }
    
  }

  function deleteItem(taskId) {
    settasks(oldTasks => oldTasks.filter(task => task.id !== taskId));
  }

  const taskElements = tasks.map(task => (

    <div key={task.id} className='newTask'>
    <div className='One'>
      <input type="checkbox" id={task.id} checked={task.isDone} onChange={handleChange} name={task.id} className="check" />
        <label htmlFor={task.id} className="label">
        <svg width="32" height="32" viewBox="0 0 30 30">
          <rect x="5" y="5" width="20" height="20" stroke="black" fill="none" />
          <g transform="translate(-20,-5)">
          <path d="m 0,0 c 33,6 40,26 55,48 " stroke="#0D9276" strokeWidth="3" className="path1" fill="none" />
          <path d="M 55,0 C 31,21 14,54 5,71 " stroke="#0D9276" strokeWidth="3" className="path1" fill="none" />
          </g>
        </svg>
        </label>
        </div>
        <div className='two'>
        <span>{task.body}</span> 
        </div>
        <div className='Three'>
        <button className="delete-btn" onClick={() => deleteItem(task.id)}>
            <img src="./trash-icon.png" alt="trash-icon" className="trash-icon"/>
      </button>
        </div>
        <div className='emptyspace'></div>

      {task.isDone && (
      <div className='whenIsdone'>Tehty: {task.time}</div>
      )}
      
    </div>

    
  ))
  
 
  return (
    <main className="flex-container">
      <div className="upperCase">
      <h1>Tehtävälista</h1>
      <img src="./memo.png" alt="memo" className='memo-icon'/>
      </div>
      <div className="middleCase">
      <input 
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder="Kirjoita tehtävä"
      className="task-input"
      name="body"
      onKeyDown={(e) => {
        if (e.key === "Enter")
            createnewtask();
        }}
      />
      <button 
      className="add-button"
      onClick={createnewtask}
      
      > Lisää 
      </button>
      </div>
      <div className="task-div">
        {taskElements}
      </div>

    </main>
  );
}


