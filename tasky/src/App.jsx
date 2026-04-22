import './App.css';
import Task from './components/Task';
import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import {getTasks, addTask, deleteTask, updateTask} from "./api/tasky-api";




function App() {

   const [ taskState, setTaskState ] = useState({tasks: []});

useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({tasks: tasks});
    });
  }, []);

  const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

     const doneHandler = (taskIndex) => {
      const tasks = [...taskState.tasks];
      tasks[taskIndex].done = !tasks[taskIndex].done;
      updateTask(tasks[taskIndex]);
      setTaskState({tasks});
    }


   const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];    // making copy of the array
    const id=tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);           //choose the element of the array - taskIndex and remove it from the array splice()
    deleteTask(id);
    setTaskState({tasks});              // sets task state with updated array
  }

  
    
    
  

    const formChangeHandler = (event) => {   //Takes in an event as a parameter
    //  (this contains the name and contents of the form field that has been changed)
    let form = {...formState};     // saves the current formState to form variable

    switch(event.target.name) {    // switch statement - updates parts of the form 
      // if change event has occurred on the title field, then the value from that field should be added to form.title
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
       case "priority":
          form.priority = event.target.value;
          break;   
      default:
          form = formState;
    }
    setFormState(form);    // sets the form state with the updated form objects
  }

  


   


  console.log(formState);

     const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks?[...taskState.tasks]:[];
    const form = {...formState};
    const newTask = await addTask(form);
    tasks.push(newTask);
    setTaskState({tasks});
  }



  return (
    <div className="container">
      <h1>Tasky</h1>
        {taskState.tasks.map((task,index) => (              
    <Task 
      title={task.title}
      description={task.description}
      deadline={task.deadline}
     key={task._id}        
      priority={task.priority}
      done={task.done}   // checks if it is true or faulse 
      markDone={() => doneHandler(index)}  // changes the done button to true or faulse
      deleteTask = {() => deleteHandler(index)}

    />
  ))} 
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />

   

     



    </div>
  );

}

export default App;
